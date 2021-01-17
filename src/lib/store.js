
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
          const file = { file: cur }
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
      update(files => files.filter(f => f.file.name !== fileName))
    }
  }
}


export const files = createFileStore()
