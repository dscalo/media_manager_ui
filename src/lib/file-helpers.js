export const createSrc = file => {
  const reader = new FileReader()
}

const mimeTypePromise = file => {
  return new Promise((resolve, reject) => {
    const bReader = new FileReader()
    bReader.onerror = () => {
      bReader.abort()
      reject(new Error(`Unable to determine mime type for ${file.name}`))
    }
    
    bReader.onloadend = () => {
      const uint = new Uint8Array(bReader.result)
      let bytes = []
      for (let i = 0; i < uint.length; i++) {
        bytes.push(uint[i].toString(16))
      }
      const hex = bytes.join('').toUpperCase()      
      resolve(mimeType(hex))
    }   

    bReader.readAsArrayBuffer(file.slice(0, 4))
  })
}

const dataUrlPromise = file => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onerror = () => {
      reader.abort()
      reject(new Error(`Unable to convert ${file.name} to a data url`))
    }

    reader.onloadend = () => {
      resolve(reader.result)
    }

    reader.readAsDataURL(file)
  })
}

export const getMimeType = async (file) => {
  try {
    return await mimeTypePromise(file)
  } catch (error) {
    console.error(error.message)
  }
}

export const getDataUrl = async file => {
  try {
    return await dataUrlPromise(file)
  } catch (error) {
    console.error(error.message)
  }
}

const mimeType = sig => {
  switch (sig) {
    case '89504E47':
      return 'image/png'
    case '47494638':
      return 'image/gif'
    case '49492A00':
    case '4D4D002A':
    case '4D4D002B':
      return 'image/tiff'
    case 'FFD8FFE0':
    case 'FFD8FFE1':
    case 'FFD8FFE2':
    case 'FFD8FFE3':
    case 'FFD8FFE8':
    case 'FFD8FFDB':
      return 'image/jpg'
    default:
      return 'application/octet-stream'
  }
}


