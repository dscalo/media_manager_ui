<script>
  let files = []

  let fileInput
  import { getMimeType, getDataUrl } from '../lib/file-helpers'

  const handleFiles = async () => {
    const newFiles = await Array.prototype.reduce.call(
      fileInput.files,
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
    files = [...files, ...newFiles]
  }
</script>

<style>
  input {
    cursor: inherit;
    display: block;
    filter: alpha(opacity=0);

    opacity: 0;
    position: absolute;
    right: 0;
    text-align: right;
    top: 0;
  }

  label {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    padding: 5px;
    border-right: 1px solid grey;
  }

  label:active {
    background-color: black;
    color: #fff;
  }

  img {
    width: 125px;
    height: 100px;
  }
</style>

{#each files as f}
  <p>
    {f?.file?.name}
    :
    {f?.mimeType}
    {#if f.src}<img src={f.src} alt={f.name} />{/if}
  </p>
{/each}

<label for="file-input">
  Select Files
  <input
    id="file-input"
    type="file"
    multiple
    bind:this={fileInput}
    on:change={handleFiles} />
</label>
