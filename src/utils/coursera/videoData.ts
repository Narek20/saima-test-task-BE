import axios from 'axios'

/*
  In my solution I have used auth token from cookies for coursera as 
  its required for fetching video data

  I would use oauth authentication but coursera doesn't provide such an API
*/
const CAuth = process.env.CAUTH

async function getCourseId(courseTitle: string) {
  const courseData = await axios.get(
    `
    https://www.coursera.org/api/onDemandCourseMaterials.v2/?q=slug&slug=${courseTitle}&includes=modules`,
    { headers: { Cookie: CAuth } }
  )

  return courseData.data.elements[0].id
}

export async function getCourseUrl(videoId: string, courseTitle: string) {
  const courseId = await getCourseId(courseTitle)
  const courseVideo = await axios.get(
    `
      https://www.coursera.org/api/onDemandLectureVideos.v1/${courseId}~${videoId}?includes=video`,
    { headers: { Cookie: CAuth } }
  )

  return courseVideo.data.linked['onDemandVideos.v1'][0].sources.byResolution[
    '720p'
  ].mp4VideoUrl
}
