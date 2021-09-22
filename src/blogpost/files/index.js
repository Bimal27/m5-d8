import express from 'express'
import multer from "multer"


import { saveAuthorPicture } from "../../lib/fs-tools.js"




const filesRouter = express.Router()

const isProduction = process.env.NODE_ENV==="production"

filesRouter.post('/uploadSingle/:id', multer().single('avatarPic'), (req, res) =>{
   try {
      const {originalname}=req.file;

      const [name,extension] = originalname.split(".")
      const filename = `${req.params.id}.${extension}`
      const port = isProduction?"":":3001"

      const baseURL = `${req.protocol}://${req.hostname}${port}`
      const url = `${baseURL}/img/authors/${filename}` 
    saveAuthorPicture(filename, req.file.buffer)

    // find author and update avatar field 
    res.send({url})
   } catch (error) {
    res.status(500).send({message: error.message})
   }
})


export default filesRouter