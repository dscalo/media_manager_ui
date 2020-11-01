<script>
  let page = 'upload'
  import Images from './pages/Images.svelte'
  import Upload from './pages/Upload.svelte'
</script>

<style>
  main {
    width: 100vw;
    height: 100vh;
  }

  nav {
    background-color: red;
    color: #fff;
    display: flex;
  }

  nav > button {
    padding: 10px 5px;
    color: inherit;
    background-color: inherit;
    flex: 1;
    border: none;
  }

  .active {
    background-color: #fff;
    color: red;
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

  {#if page === 'upload'}
    <Upload />
  {:else}
    <Images />
  {/if}
</main>
