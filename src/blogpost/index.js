import express from "express" 
import fs from "fs-extra"
import { fileURLToPath } from "url" 
import { dirname, join } from "path" 
import uniqid from "uniqid" 
import { pipeline } from "stream"
import { getPDFReadableStream } from "../../lib/pdf.js"

const postsRouter = express.Router()

const currentFilePath = fileURLToPath(import.meta.url)

const currentDirPath = dirname(currentFilePath)

const postsJSONFilePath = join(currentDirPath, "../../data/posts.json")

// 1. get all the post
postsRouter.get('/' ,(req ,resp) =>{
    try {
        const file =fs.readFileSync(postsJSONFilePath)
        const posts = JSON.parse(file)
        resp.send(posts)
        
    } catch (error) {
        resp.send(500).send({message: error.message}); 
    }
})

// 2. create  the post
postsRouter.post('/' ,(req ,resp) =>{
    try {
        // const {category, title} = req.body
        const newPost = { ...req.body, 
            _id: uniqid(), 
            cover:"https://www.google.com/imgres?imgurl=https%3A%2F%2Fmiro.medium.com%2Fmax%2F1200%2F1*mk1-6aYaf_Bes1E3Imhc0A.jpeg&imgrefurl=https%3A%2F%2Ftowardsdatascience.com%2F3-numpy-image-transformations-on-baby-yoda-c27c1409b411&tbnid=gOUAFhrbQ2nYQM&vet=12ahUKEwi2sZX3ioHzAhUJFBoKHYKbBdEQMygAegUIARDLAQ..i&docid=OXvyXJop1qSGqM&w=1200&h=900&q=image&ved=2ahUKEwi2sZX3ioHzAhUJFBoKHYKbBdEQMygAegUIARDLAQ", 
            content:"HTML" ,
            createdAt: new Date() 
            }
              console.log(newPost)
        const posts = JSON.parse(fs.readFileSync(postsJSONFilePath))
        posts.push(newPost)
        fs.writeFileSync(postsJSONFilePath, JSON.stringify(posts))
        resp.status(201).send({ _id: newPost._id})
        
    } catch (error) {
        resp.send({message: error.message});
        
    }
})

// 3. get single the post
postsRouter.get('/:_id' ,(req ,resp) =>{
    try {
        const posts = JSON.parse(fs.readFileSync(postsJSONFilePath))
        const singlePost = posts.find(p=>p._id === req.params._id)
        if(singlePost){
            resp.send(singlePost)
        }else{
            resp.send("Not Found")
        }
        
    } catch (error) {
        resp.status(500).send({message: error.message});
        
    }
})


// 1. delete the post
postsRouter.delete('/:_id' ,(req ,resp) =>{
    try {
        const posts = JSON.parse(fs.readFileSync(postsJSONFilePath))
        const filteredPosts = posts.filter(post => post._id !== req.params._id)
        fs.writeFileSync(postsJSONFilePath, JSON.stringify(filteredPosts))
        resp.status(204).send()
        
    } catch (error) {
        resp.send(500).send({message: error.message});
        
    }
})

// 1. update the post
postsRouter.put('/:_id' ,(req ,resp) =>{
    try {
        const posts = JSON.parse(fs.readFileSync(postsJSONFilePath))
        const index = posts.findIndex(post => post._id === req.params._id)
        const updatedPost = { ...posts[index], ...req.body }
        posts[index] = updatedPost
        fs.writeFileSync(postsJSONFilePath, JSON.stringify(posts))
        resp.send(updatedPost)
        
    } catch (error) {
        resp.send(500).send({message: error.message});
        
    }
})


filesRouter.get("/PDFDownload", async (req, res, next) => {
    try {
      res.setHeader("Content-Disposition", `attachment; filename=example.pdf`) // this header tells the browser to open the "save file as" dialog
  
      const source = getPDFReadableStream()
      const destination = res
  
      pipeline(source, destination, err => {
        if (err) next(err)
      })
    } catch (error) {
      next(error)
    }
  })


export default postsRouter