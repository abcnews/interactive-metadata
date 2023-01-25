<script lang="ts">
  export let kind = 'default';
</script>

<button data-kind={kind} on:click {...$$restProps}>
  <slot />
</button>

<style>
  button {
    border: 1px solid var(--metadata-color-lightgrey);
    border-radius: 8px;
    padding: 8px 16px 7px;
    width: 100%;
    background-color: var(--metadata-color-lightergrey);
    display: flex;
    justify-content: center;
    font-size: 15px;
    cursor: pointer;
  }

  button[data-kind='dark'] {
    border-color: transparent;
    background-color: var(--metadata-color-grey);
    color: var(--metadata-color-white);
  }

  button[data-kind='newsblue'] {
    border-color: transparent;
    background-color: var(--metadata-color-newsblue);
  }
</style>
