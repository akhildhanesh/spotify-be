import mongoose from "mongoose"

mongoose.connect(`${process.env.MONGODB_URI}/spotify`)
    .then(() => console.log(`DB connected`))
    .catch(err => console.error(err.message))