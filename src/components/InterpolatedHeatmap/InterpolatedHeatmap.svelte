<script lang="ts">
  import type { Data, InferredHeatData } from '../../data';
  import Card from '../Card/Card.svelte';
  import HeatMap from '../HeatMap/HeatMap.svelte';
  import Figure from '../Figure/Figure.svelte';
  import { LngLatLike } from 'maplibre-gl';

  export let data: Data;
  export let inferredHeatData: InferredHeatData;

  $: minDay = Object.keys(data.commsByDay)[203];
  $: maxDay = Object.keys(data.commsByDay)[210];
  $: minDate = data.commsByDay[minDay][0].date;
  $: maxDate = data.commsByDay[maxDay][0].date;
  $: coordinates = inferredHeatData
    .filter(([date]) => {
      return date >= minDate && date < maxDate;
    })
    .map(([_date, [lat, lng]]) => [lng, lat] as LngLatLike);
</script>

<Card>
  <code>[interpolated-heatmap]</code>
  <Figure>
    <HeatMap {coordinates} />
  </Figure>
</Card>
