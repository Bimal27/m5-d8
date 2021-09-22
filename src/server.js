import express from 'express';
import listEndpoints from "express-list-endpoints"
import cors from "cors"
import { join } from "path"

import postsRouter from "./blogpost/index.js"
import filesRouter from "./blogpost/files/index.js"

const publicFolderPath = join(process.cwd(), "public")

const server = express()

const port = 3001

server.use(express.static(publicFolderPath))
server.use(cors()) 
server.use(express.json()) 

// ***************** ENDPOINTS *********************
server.use("/posts", postsRouter)
server.use("/files", filesRouter)


console.table(listEndpoints(server))

server.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
