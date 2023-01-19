<script lang="ts">
  import Figure from '../Figure/Figure.svelte';

  export let day: String | null = null;
</script>

<div>
  <code>[daily-route]{day ? ` (${day})` : ''}</code>
  <Figure>
    <code>[map]</code>
  </Figure>
</div>
