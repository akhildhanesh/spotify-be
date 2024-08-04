import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import songRouter from './src/routes/songRoute.js'
import albumRouter from './src/routes/albumRoute.js'
import './src/config/mongoDB.js'
import connectCloudinary from './src/config/cloudinary.js'

const app = express()

const PORT = process.env.PORT || 4000
connectCloudinary()

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/song', songRouter)
app.use('/api/album', albumRouter)

app.listen(PORT, () => {
    console.log(`Application running on PORT: ${PORT}`)
})