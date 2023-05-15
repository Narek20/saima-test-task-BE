import express from 'express'
import cors from 'cors'
import * as bodyparser from 'body-parser'
import UserRouter from './src/api/User'
import VideoRouter from './src/api/Video'

const app = express()

app.use(cors())
app.use(bodyparser.urlencoded({ extended: true, limit: '30mb' }))
app.use(bodyparser.json({ limit: '30mb' }))
app.use('/users', UserRouter)
app.use('/videos', VideoRouter)

app.listen(8000, () => {
  console.log('The app is listening on 8000 port')
})
