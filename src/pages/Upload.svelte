<script>

  import FileButton from "../components/FileButton.svelte";
  import UploadItem from "../components/UploadItem.svelte";
  import { files } from "../lib/store";
  import {upload} from '../lib/apis'

  let progress = 0

  const updateProgress = (cur, tot) => {
    progress =( tot / cur) * 100
  }

  const handleUpload = async () => {
    const res = await upload($files[0], updateProgress)
    console.log('upload response: ', res)
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

  <h3>Progeess = {progress}</h3>
  
  {#if $files.length > 0}
  <button on:click={handleUpload}>UPLOAD</button>
  {/if}
  <div class="files">
    {#each $files as f}
      <UploadItem file={f} deleteHandler={files.delete} />
    {/each}
  </div>
 
</div>
