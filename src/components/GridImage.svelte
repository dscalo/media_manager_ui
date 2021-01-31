<script>
  export let filename
  export let alt
</script>

<style>
  img {
    max-height: 100%;
    min-width: 100%;
    object-fit: cover;
    vertical-align: bottom;
  }
</style>

<img src={filename} {alt} />
