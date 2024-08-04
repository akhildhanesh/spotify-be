import { v2 as cloudinary } from "cloudinary"
import albumModel from "../models/albumModel.js"

export const addAlbum = async (req, res) => {
    try {
        const { name, desc, bgColor } = req.body
        const imageFile = req.file

        const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
            resource_type: 'image'
        })

        const albumData = {
            name,
            desc,
            bgColor,
            image: imageUpload.secure_url
        }

        await albumModel(albumData).save()

        return res.status(201).json({
            success: true,
            message: 'Album added'
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'error'
        })
    }
}

export const listAlbum = async (req, res) => {
    albumModel.find()
        .then(data => {
            return res.json({
                success: true,
                albums: data
            })
        })
        .catch(err => {
            console.error(err.message)
            return res.status(500).json({
                success: true,
                message: 'ERROR'
            })
        })
}

export const removeAlbum = async (req, res) => {
    const { id } = req.body
    albumModel.findByIdAndDelete(id)
        .then(data => {
            if (!data) throw new Error('Invalid ID')
            return res.json({
                success: true,
                message: 'Album removed'
        })
        })
        .catch(err => {
            console.error(err.message)
            return res.status(400).json({
                success: false,
                message: err.message
            })
    })
}