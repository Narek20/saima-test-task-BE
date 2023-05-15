import cron from 'node-cron'
import { deleteObject, getMetadata, listAll, ref } from 'firebase/storage'
import { storage } from '../services/firebase/firestorage'

/*
    Integrated cron job for checking videos
    Running every 5 minutes
*/
cron.schedule('*/5 * * * *', async () => {
  try {
    const storageRef = ref(storage)
    const filesList = await listAll(storageRef)
    
    filesList.items.forEach(async (file) => {
      const fileData = await getMetadata(file)
      const currentDate = new Date().getTime()
      const fileDataCreationTime = new Date(fileData.timeCreated).getTime()
      const oneDayInMilliseconds = 1000 * 60 * 60 * 24

      if(fileDataCreationTime < currentDate - oneDayInMilliseconds) {
        deleteObject(file)
      }
    })
  } catch (err) {
    console.error(err)
  }
})
