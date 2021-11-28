/**
 * use fileManager to manage dog breed reports
 */
import * as FileSystem from 'expo-file-system'
import { uuid } from './uuid'

const reportsDir = FileSystem.cacheDirectory + 'reports/'

/**
 * Helper function
 * Checks if reports directory exists. If not, creates it
 */
async function ensureDirExists() {
  const dirInfo = await FileSystem.getInfoAsync(reportsDir)
  if (!dirInfo.exists) {
    console.log("reportsDir doesn't exist, creating...")
    await FileSystem.makeDirectoryAsync(reportsDir, { intermediates: true })
  }
}
/**
 * Save img to cache
 */
export async function saveImgToCache(uri) {
  try {
    await ensureDirExists()
    console.log('Saving image')
    const id = uuid()
    await FileSystem.copyAsync({ from: uri, to: reportsDir + `report_img_${id}.png` })
    return id
  } catch (e) {
    console.error("Couldn't save image files:", e)
  }
}

/**
 * Return URI to our local reports file
 */
export async function getImg(id) {
  await ensureDirExists()

  // hardcoded file uri
  const fileInfo = await FileSystem.getInfoAsync(reportsDir + `report_img_${id}.png`)

  if (!fileInfo.exists) {
    console.log("Test image isn't cached locally.")
    return
  }

  return fileInfo.uri
}
