 const upload = (file, cb) => {
    return new Promise((resolve, reject) => {
        const formData = new FormData()
        formData.append('upload', file.file)
    
        const xhr = new XMLHttpRequest()

        xhr.onload =  () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                resolve(xhr.response)
            } else {
                reject({
                    status: xhr.status,
                    statusText: xhr.statusText
                })
            }
        }

        xhr.onerror = () => {
            reject({
                status: xhr.status,
                statusText: xhr.statusText
            })
        }

        xhr.onprogress = e => {
            cb(e.loaded, e.total)
        }
    
        xhr.open('POST', "http://localhost:3333/upload")
        xhr.send(formData)
    })
   
}