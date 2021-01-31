
import { writable } from 'svelte/store'
import { getMimeType, getDataUrl } from './file-helpers'

function createFileStore() {
  const { subscribe, set, update } = writable([])

  return {
    subscribe,
    add: async filesObject => {
      const newFiles = await Array.prototype.reduce.call(
        filesObject,
        async (accP, cur) => {
          const acc = await accP
          const file = { file: cur, status: 'IDLE', progress: 0 }
          file.mimeType = await getMimeType(file.file)
          if (/image/.test(file.mimeType)) {
            file.src = await getDataUrl(file.file)
          }
          return [...acc, file]
        },
        []
      )
      update(files => files = [...files, ...newFiles])
    },
    delete: fileName => {
      
      update(files =>{
        const file = files.find(f => f.file.name === fileName) 
        if (file.status !== 'IDLE') {
          return files
        }
        return files.filter(f => f.file.name !== fileName)
      })
    },
    setStatus: (fileName, status) => {
      update(files => {
        const file = files.find(f => f.file.name === fileName)
        file.status = status
        return files
      })
    },
    setProgress: (fileName, progress) => {
      update(files => {
        const file = files.find(f => f.file.name === fileName)
        file.progress = progress
        return files
      })
    }
  }
}


export const files = createFileStore()
