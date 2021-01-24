<script>
  let page = "upload";
  import Images from "./pages/Images.svelte";
  import Upload from "./pages/Upload.svelte";
</script>

<style>
  main {
    height: 100vh;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
  }

  .content {
    flex: 1 1 auto;
    overflow: auto;
    align-self: stretch;
  }

  nav {
    background-color: #000;
    color: #fff;
    display: flex;
    padding: 5px 0;
    width: 100%;
  }

  nav > button {
    color: inherit;
    padding: 10px 0;
    background-color: inherit;
    flex: 1;
    border: none;
  }

  .active {
    border-bottom: 1px solid #fff;
  }
</style>

<main>
  <nav>
    <button class:active={page === 'upload'} on:click={() => (page = 'upload')}>
      Upload
    </button>
    <button class:active={page === 'view'} on:click={() => (page = 'view')}>
      View
    </button>
  </nav>
  <div class="content">
    {#if page === 'upload'}
      <Upload />
    {:else}
      <Images />
    {/if}
  </div>

 
</main>
