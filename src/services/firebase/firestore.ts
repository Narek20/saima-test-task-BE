import admin, { ServiceAccount } from 'firebase-admin'
import serviceAccount from './firebase-creds.json'

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as ServiceAccount),
  storageBucket: 'gs://tech-task-53995.appspot.com',
})

const db = admin.firestore()

export default db

