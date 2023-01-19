<script lang="ts">
  export let fixedHeight: number | undefined = undefined;
</script>

<figure style={fixedHeight ? `--figure-fixedHeight: ${fixedHeight}px` : undefined}>
  <slot />
</figure>

<style>
  figure {
    position: relative;
    margin: 0;
    min-height: var(--figure-fixedHeight, 256px);
  }

  @media (min-width: 1024px) {
    figure {
      min-height: var(--figure-fixedHeight, 512px);
    }
  }
</style>
