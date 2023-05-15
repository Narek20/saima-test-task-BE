import dotenv from 'dotenv'

dotenv.config({})

export interface EnvVariables {
  tokenKey: string
  courseraBaseUrl: string
  firebaseApiKey: string
  firebaseAuthDomain: string
  firebaseProjectId: string
  firebaseStorageBucket: string
}

const env: EnvVariables = {
  tokenKey: process.env.TOKEN_KEY as string,
  courseraBaseUrl: process.env.COURSERA_BASE_URL as string,
  firebaseApiKey: process.env.FIREBASE_API_KEY as string,
  firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN as string,
  firebaseProjectId: process.env.FIREBASE_PROJECT_ID as string,
  firebaseStorageBucket: process.env.FIREBASE_BACKET_DOMAIN as string,
}

export default env
