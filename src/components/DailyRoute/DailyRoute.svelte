<script lang="ts">
  export let day: String | null = null;
</script>

<div><code>[daily-route]{day ? ` (${day})` : ''}</code></div>
