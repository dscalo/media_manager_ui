<script>
  import FileButton from "../components/FileButton.svelte";
  import UploadItem from "../components/UploadItem.svelte";
  import { files } from "../lib/store";

  const handleMessage = (e) => {
    const msg = e.data;
    switch (msg.type) {
      case "UPLOADING":
        files.setStatus(msg.name, "UPLOADING");
      case "SUCCESS":
        files.setStatus(msg.name, "UPLOADED");
       
        break;
      case "PROGRESS":
        files.setProgress(msg.name, msg.data);
        break;
      case "ERROR":
        console.error(msg.data);
        break;
      case "ERROR_XHR":
        console.error(`status: ${msg.data.status}: ${msg.data.statusText}`);
        break;
      default:
        console.error("bad message received!", msg);
    }
  };

  const handleUpload = async () => {
    // todo: limit total workers ?
    // todo: delete files when all have finisished
    // todo: prevent uploaded files from being re-uploaded

    for (const file of $files) {
      const worker = new Worker("uploadWorker.js");

      worker.onmessage = handleMessage;

      const msg = {
        type: "UPLOAD",
        data: file,
      };
      worker.postMessage(msg);
    }
  };
</script>

<div class="upload--container">
  <h1>Uploads page!</h1>
  <h2>hey there!</h2>

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
