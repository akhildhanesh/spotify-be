import { v2 as cloudinary } from "cloudinary"
import songModel from "../models/songModel.js"

export const addSong = async (req, res) => {
    try {
        const { name, desc, album } = req.body
        const { audio, image } = req.files
        const audioFile = audio[0]
        const imageFile = image[0]

        const audioUpload = await cloudinary.uploader.upload(audioFile.path, {
            resource_type: 'video'
        })
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
            resource_type: 'image'
        })

        const duration = `${Math.floor(audioUpload.duration / 60)}:${Math.floor(audioUpload.duration % 60)}`

        const songData = {
            name,
            desc,
            album,
            image: imageUpload.secure_url,
            file: audioUpload.secure_url,
            duration
        }

        await songModel(songData).save()

        return res.status(201).json({
            success: true,
            message: 'song added'
        })


    } catch (err) {
        console.error(err.message)
        return res.status(500).json({
            success: false,
            message: 'failed'
        })
    }
}

export const listSong = async (_req, res) => {
    songModel.find()
        .then(data => {
            return res.json({
                success: true,
                songs: data
            })
        })
        .catch(err => {
            console.error(err.message)
            return res.status(500).json({
                success: false,
                message: 'error'
            })
        })
}

export const removeSong = async (req, res) => {
    const { id } = req.body
    songModel.findByIdAndDelete(id)
        .then(data => {
            if (!data) throw new Error('Invalid ID')
            return res.json({
                success: true,
                message: 'song removed'
        })
        })
        .catch(err => {
            console.error(err)
            res.status(400).json({
                success: false,
                message: 'error'
            })
    })      
}