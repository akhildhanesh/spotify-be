import { addAlbum, listAlbum, removeAlbum } from '../controller/albumController.js'
import express from 'express'
import upload from '../middleware/multer.js'

const albumRouter = express.Router()

albumRouter.post('/add', upload.single('image'), addAlbum)

albumRouter.get('/list', listAlbum)

albumRouter.delete('/remove/:id', removeAlbum)

export default albumRouter