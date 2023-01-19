<script lang="ts">
  import type { Data } from '../../data';
  import DailyActivity from '../DailyActivity/DailyActivity.svelte';
  import Figure from '../Figure/Figure.svelte';

  export let data: Data;
  export let day: string | null = null;

  $: dayComms = day ? data.commsByDay[day] : undefined;
</script>

<div>
  <code>[daily-route]{day ? ` (${day})` : ''}</code>
  {#if dayComms}
    <DailyActivity comms={dayComms} />
  {/if}
  <Figure>
    <code>[map]</code>
  </Figure>
</div>
