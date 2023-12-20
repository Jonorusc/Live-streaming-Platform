import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject
} from 'firebase/storage'
import { initializeApp } from 'firebase/app'
import { app_config } from '@/utils/firebase'

const app = initializeApp(app_config)

const storage = getStorage(app)

export const uploadFilesToStorage = async ({
  collectionName = 'main',
  document,
  fileList
}: {
  fileList: FileList
  document: string
  collectionName: string
}): Promise<string[]> => {
  const uploadPromises = Object.values(fileList).map(async (file) => {
    const storageRef = ref(
      storage,
      `${collectionName}/${document}/${file.name}`
    )
    await uploadBytes(storageRef, file)
    const downloadURL = await getDownloadURL(storageRef)
    return downloadURL
  })

  return Promise.all(uploadPromises)
}

export const deleteFromStorage = async (
  urlPaths: string[],
  path?: string
): Promise<void[]> => {
  const deletePromises = urlPaths.map(async (url) => {
    const targetPath = path || extractStoragePathFromUrl(url)
    if (targetPath) {
      const storageRef = ref(storage, targetPath)
      await deleteObject(storageRef)
    }
  })

  return Promise.all(deletePromises)
}

const extractStoragePathFromUrl = (url_path: string): string | null => {
  const match = url_path.match(/\/o\/(.+)\?/)
  if (match && match[1]) {
    return decodeURIComponent(match[1])
  }
  return null
}
