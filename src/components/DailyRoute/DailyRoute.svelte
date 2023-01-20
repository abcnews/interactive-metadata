<script lang="ts">
  import type { Data } from '../../data';
  import CommsMap from '../CommsMap/CommsMap.svelte';
  import DailyActivity from '../DailyActivity/DailyActivity.svelte';
  import Figure from '../Figure/Figure.svelte';
  import Legend from '../Legend/Legend.svelte';

  export let data: Data;
  export let day: string | null = null;

  $: currentDay = day || Object.keys(data.commsByDay)[0];
  $: dayComms = data.commsByDay[currentDay];
</script>

<div>
  <code>[daily-route]{day ? ` (${day})` : ''}</code>
  <DailyActivity comms={dayComms} />
  <Figure>
    <CommsMap comms={dayComms} hasRoute />
    <div class="overlay">
      <Legend />
    </div>
  </Figure>
</div>

<style>
  .overlay {
    position: absolute;
    top: 16px;
    left: 16px;
    border-radius: 3px;
    padding: 2px 5px 0 3px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);
    background-color: var(--metadata-color-white);
  }
</style>
