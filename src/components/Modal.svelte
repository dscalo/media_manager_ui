<script>
  // https://css-tricks.com/considerations-styling-modal/
</script>

<style>
  .modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>

<div class="modal">
  <slot />
</div>
