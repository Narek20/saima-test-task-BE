import fs from 'fs'
import { initializeApp } from 'firebase/app'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import env from '../../utils/constants/env'

const firebaseConfig = {
  apiKey: env.firebaseApiKey,
  authDomain: env.firebaseAuthDomain,
  projectId: env.firebaseProjectId,
  storageBucket: env.firebaseStorageBucket,
}

const app = initializeApp(firebaseConfig)
export const storage = getStorage(app)

async function getVideoBlob(filename: string) {
  return await fs.promises.readFile(filename)
}

export const uploadFileToStorage = async (
  filePath: string,
  firebasePath: string
) => {
  try {
    const mountainImagesRef = ref(storage, firebasePath)
    const metadata = {
      contentType: 'video/mp4',
    }

    const bytes = await getVideoBlob(filePath)
    const videoRef = await uploadBytes(mountainImagesRef, bytes, metadata)
    const videoUrl = await getDownloadURL(videoRef.ref)

    return videoUrl
  } catch (e) {
    console.error(e)
  }
}

export const getSingleVideo = async (videoPath: string) => {
  const storageRef = ref(storage, videoPath)

  return await getDownloadURL(storageRef)
}