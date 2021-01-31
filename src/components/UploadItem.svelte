<script>
  export let file;
  export let deleteHandler;

  let fileType = "File";
  if (/image/.test(file.mimeType)) {
    fileType = "Image";
  }
  const fileIcon = "/images/file.png";

  const truncate = (s) => (s.length > 15 ? `${s.substr(0, 15)}...` : s);
</script>

<style>
  img {
    object-fit: contain;
    width: 100%;
    height: 100%;
  }
  .card {
    border: 1px solid #000;
    box-shadow: 3px 3px 1px 2px rgba(0, 0, 0, 0.2);
    border-radius: 10px;

    display: flex;
    flex-direction: column;
  }
  .card--header {
    display: flex;
    color: #fff;
    width: 100%;

   
    border-radius: 10px 10px 0 0;
  }

  .card--header > h4 {
    margin: 0 auto;
    color: #000;
    text-align: center;
  }

  .card--header > button {
    border: none;
    background-color: inherit;
    color: red;
    align-self: flex-end;
    margin: 0;
    font-weight: 900;
  }

  .card--body {
    width: 12em;
    height: 20vh;
    margin: 5px;
  }
  .card--text {
    margin: 2px auto;
  }

  .card--footer {
    margin: 5px auto;
  }
</style>

<div class="card">
  <div class="card--header">
    <h4>{fileType} {file.status}  </h4>
    <button
      on:click={() => {
        deleteHandler(file?.file?.name);
      }}>X</button>
  </div>

  <div class="card--body">
    {#if file.src}
      <img src={file.src} alt={file?.file?.name} />
    {:else}<img src={fileIcon} alt="file icon" />{/if}
  </div>
  <p class="card--text">{truncate(file?.file?.name)}</p>
  <div class="card--footer">
    {#if file.progress > 0}
    <progress max="100" value={file.progress}>{file.progress}%</progress>
    {/if}
  </div>
</div>
