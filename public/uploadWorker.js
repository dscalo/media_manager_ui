let  uploading = false

onmessage = e => {
    const msg = e.data
    switch(msg.type) {
        case 'UPLOAD':
            if (uploading) {
                postMessage({type: 'ERROR', data: 'currently uploading' })
                return
            }
            upload(msg.data)
            break
        default:
            // ???
    }
}

const upload = (file) => {    
    uploading = true
    postMessage({type: 'UPLOADING', name: file.file.name})
    const formData = new FormData()
    formData.append('upload', file.file)

    const xhr = new XMLHttpRequest()

    xhr.onload =  () => {
        const msg = {type:'', name: file.file.name, data: ''}
        if (xhr.status >= 200 && xhr.status < 300) {
            msg.type = 'SUCCESS'
        } else {
            msg.type = 'ERROR_XHR'
            msg.data = {
                status: xhr.status,
                statusText: xhr.statusText
            }
        }
        uploading = false
        postMessage(msg)
    }

    xhr.onerror = () => {
        const msg = {
            type: 'ERROR_XHR',
            name: file.file.name,
            data: {
                status: xhr.status,
                statusText: xhr.statusText
            }
        }
        uploading = false
        postMessage(msg)
        
    }

    xhr.onprogress = e => {
        const msg = {
            type: 'PROGRESS', 
            name: file.file.name, 
            data: (e.total / e.loaded) * 100
        }
        postMessage(msg)
    }

    xhr.open('POST', "http://localhost:3333/upload")
    xhr.send(formData)
   
}