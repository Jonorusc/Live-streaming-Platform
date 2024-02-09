import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  listAll
} from 'firebase/storage'
import { initializeApp } from 'firebase/app'
import { app_config } from '@/lib/firebase'

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

export const getFilesFromStorage = async ({
  collectionName = 'main',
  document
}: {
  collectionName: string
  document: string
}): Promise<string[]> => {
  const storageRef = ref(storage, `${collectionName}/${document}`)
  const files = await listAll(storageRef)
  const downloadURLPromises = files.items.map(async (file) => {
    const downloadURL = await getDownloadURL(file)
    return downloadURL
  })
  return Promise.all(downloadURLPromises)
}

export const updatePathInStorage = ({
  collection = 'main',
  document,
  newCollection,
  newDocument,
  newFileName
}: {
  collection: string
  document: string
  newCollection: string
  newDocument?: string
  newFileName?: string
}): Promise<string[]> => {
  return new Promise(async (resolve, reject) => {
    try {
      const storageRef = ref(storage, `${collection}/${document}`)
      const newStorageRef = ref(
        storage,
        `${newCollection}/${newDocument ? newDocument : document}${
          newFileName ? `/${newFileName}` : ''
        }`
      )
      const files = await listAll(storageRef)

      // check if there are files in the old location
      if (files.items.length === 0) {
        resolve([])
        return
      }

      const newUrls: string[] = []

      for (const item of files.items) {
        const fileRef = item
        const url = await getDownloadURL(fileRef)

        // Fetch the file from the URL
        const response = await fetch(url)
        const blob = await response.blob()

        // Upload the file to the new location
        await uploadBytes(newStorageRef, blob)

        // Get the download URL of the new file
        const newUrl = await getDownloadURL(newStorageRef)
        newUrls.push(newUrl)

        // Delete the file from the old location
        await deleteObject(fileRef)
      }

      resolve(newUrls)
    } catch (error) {
      reject()
    }
  })
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
