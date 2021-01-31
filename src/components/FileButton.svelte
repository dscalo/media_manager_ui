<script>
  import { files } from "../lib/store";

  let fileInput;

  const handleFiles = async () => {
    await files.add(fileInput.files);
  };
</script>

<style>
  .file--button-container {
    width: 10em;
    border: 1px solid black;
    border-radius: 6px;
    box-sizing: 3px 3px 1px 1px rgba(0, 0, 0, 0.3);
  }
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
    padding: 5px;
    text-align: center;
  }

  label:active {
    background-color: black;
    color: #fff;
  }
</style>

<div class="file--button-container">
  <label for="file-input">
    Select Files
    <input
      id="file-input"
      type="file"
      multiple
      bind:this={fileInput}
      on:change={handleFiles} />
  </label>
</div>
