<script>
  import GridImage from "../components/GridImage.svelte";

  const images = ["one.JPEG", "two.JPEG", "three.JPEG", "four.JPEG", "five.JPEG"];
</script>

<style>
  .images {
    display: flex;
    flex-wrap: wrap;
  }

  .image {
    height: 40vh;
    flex-grow: 1;
  }

  .image:last-child {
    flex-grow: 10;
  }

  @media (max-aspect-ratio: 1/1) {
    .image {
      height: 30vh;
    }
  }

  @media (max-height: 400px) {
    .image {
      height: 80vh;
    }
  }

  @media (max-aspect-ratio: 1/1) and (max-height: 400px) {
    .images {
      flex-direction: row;
    }

    .image {
      height: auto;
      width: 100%;
    }
  }
</style>

<div class="images">
  {#each images as image}
    <div class="image">
      <GridImage filename="/images/{image}" alt={image.replace('.jpg', '')} />
    </div>
  {/each}
</div>
