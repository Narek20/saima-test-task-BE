import { Request, Response } from 'express'
import fs from 'fs'
import md5 from 'md5'
import got from 'got'
import ytdl from 'ytdl-core'
import {
  getSingleVideo,
  uploadFileToStorage,
} from '../../services/firebase/firestorage'
import { getCourseUrl } from '../../utils/coursera/videoData'

export const youtubeVideoDownload = async (req: Request, res: Response) => {
  try {
    const videoUrl = req.body.video_url
    const ytdlRef = ytdl(videoUrl)

    // will be always unique as the time changes
    const hashedVideoName = md5(`${new Date().getTime()}`)
    const filePath = `./src/videos/video-${hashedVideoName}.mp4`
    const writeStream = fs.createWriteStream(filePath)

    ytdlRef.pipe(writeStream)
    ytdlRef.on('finish', async () => {
      const data = await uploadFileToStorage(filePath, hashedVideoName)

      fs.unlink(filePath, (err) => {
        if (err) console.log('File is not removed')

        console.log('File is removed')
      })
      return res.send({ success: true, data: data })
    })
  } catch (err) {
    if (err instanceof Error) res.send({ success: false, message: err.message })
  }
}

export const courseraVideoDownload = async (req: Request, res: Response) => {
  try {
    const videoUrl = req.body.video_url
    const queryParams = videoUrl.split('/')
    const videoId = queryParams[queryParams.length - 2]
    const courseTitle = queryParams[queryParams.length - 4]
    const gotRef = got.stream(await getCourseUrl(videoId, courseTitle))

    // will be always unique as the time changes
    const hashedVideoName = md5(`${new Date().getTime()}`)
    const filePath = `./src/videos/video-${hashedVideoName}.mp4`

    const writeStream = fs.createWriteStream(filePath)

    gotRef.pipe(writeStream)
    writeStream.on('finish', async () => {
      const data = await uploadFileToStorage(filePath, hashedVideoName)

      fs.unlink(filePath, (err) => {
        if (err) console.error('File is not removed')

        console.log('File is removed')
      })

      return res.send({ success: true, data: data })
    })
  } catch (err: any) {
    res.send({ success: false, message: err.message })
  }
}

export const getVideoById = async (req: Request, res: Response) => {
  try {
    const videoId = req.params.id as string

    const data = await getSingleVideo(videoId)

    return res.send({ success: true, data: data })
  } catch (err: any) {
    res.send({ success: false, message: err.message })
  }
}
