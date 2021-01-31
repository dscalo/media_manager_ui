<script>

  import FileButton from "../components/FileButton.svelte";
  import UploadItem from "../components/UploadItem.svelte";
  import { files } from "../lib/store";


  let progress = 0


  const handleUpload = async () => {
    const worker = new Worker('uploadWorker.js')

    worker.onmessage = e => {
      const msg = e.data 
      switch (msg.type) {
        case 'UPLOADING':
          files.setStatus(msg.name, 'UPLOADING')
        case 'SUCCESS':
          files.setStatus(msg.name, 'IDLE')
          //files.delete(msg.name)
          break
        case 'PROGRESS':
          files.setProgress(msg.name, msg.data)
          break
        case 'ERROR':
          console.error(msg.data)
          break
        case 'ERROR_XHR':
          console.error(`status: ${msg.data.status}: ${msg.data.statusText}`)
          break
        default:
          console.log('bad message received!', msg)
      }
    }

    const msg = {
      type: 'UPLOAD',
      data: $files[0]
    }
    worker.postMessage(msg)
  }



</script>

<style>
  .upload--container {
    display: flex;
    flex-direction: column;
    align-items: center;
   
    gap: 0.5em;
    margin: 0 auto;
    border: 1px red solid;
    height: 100vh;

  }
  .files {
    
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.5em;
  }
</style>

<div class="upload--container">
  <h1>Uploads page!</h1>

  <FileButton />
  
  {#if $files.length > 0}
  <button on:click={handleUpload}>UPLOAD</button>
  {/if}
  <div class="files">
    {#each $files as f}
      <UploadItem file={f} deleteHandler={files.delete} />
    {/each}
  </div>
 
</div>
