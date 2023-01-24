<script lang="ts">
  import type { Data } from '../../data';
  import Card from '../Card/Card.svelte';
  import CommsMap from '../CommsMap/CommsMap.svelte';
  import DailyActivity from '../DailyActivity/DailyActivity.svelte';
  import Figure from '../Figure/Figure.svelte';
  import Legend from '../Legend/Legend.svelte';
  import Slider from '../Slider/Slider.svelte';

  export let data: Data;
  export let day: string | null = null;

  $: days = Object.keys(data.commsByDay);
  $: currentDay = day || days[0];
  $: dayComms = data.commsByDay[currentDay];
</script>

<Card>
  <code>[daily-route]{day ? ` (${day})` : ''}</code>
  <DailyActivity comms={dayComms} />
  <Figure>
    <CommsMap comms={dayComms} hasRoute />
    <div class="overlay">
      <Legend />
    </div>
  </Figure>
  {#if day}
    <p>{day}</p>
  {:else}
    <Slider range={days} initial={currentDay} on:change={({ detail }) => (currentDay = detail)} />
  {/if}
</Card>

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
