import express from 'express'
import http from 'http'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compression from 'compression'
import mongoose from 'mongoose'
import cors from 'cors'
import 'dotenv/config'
import router from './router'

const app = express()
const MONGODBURL = 'mongodb://127.0.0.1:27017/test'
const PORT = process.env.PORT

app.use(cors({
  credentials: true
}))

app.use(compression())
app.use(bodyParser.json())
app.use(cookieParser())

mongoose.Promise = Promise
mongoose.connect(MONGODBURL)
mongoose.connection.on('error', (error: Error) => console.error(error))


// routes
app.use('/', router())

const server = http.createServer(app)

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/`)
})
