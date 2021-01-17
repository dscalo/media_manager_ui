<script>
  import FileButton from "../components/FileButton.svelte";
  import UploadItem from "../components/UploadItem.svelte";
  import { files } from "../lib/store";
</script>

<style>
  .upload--container {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5em;
    margin: 0 10px;
  }
</style>

<h1>Uploads page!</h1>

<FileButton />
<div class="upload--container">
  {#each $files as f}
    <UploadItem file={f} deleteHandler={files.delete} />
  {/each}
</div>
