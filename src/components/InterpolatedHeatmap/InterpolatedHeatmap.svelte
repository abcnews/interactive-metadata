<script lang="ts">
  import type { LngLatLike } from 'maplibre-gl';
  import type { Data, InferredHeatData } from '../../data';
  import Card from '../Card/Card.svelte';
  import Columns from '../Columns/Columns.svelte';
  import Heading from '../Heading/Heading.svelte';
  import HeatMap from '../HeatMap/HeatMap.svelte';
  import Figure from '../Figure/Figure.svelte';
  import Rows from '../Rows/Rows.svelte';

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
  <Columns>
    <div class="map">
      <Figure>
        <HeatMap {coordinates} />
      </Figure>
    </div>
    <div class="other">
      <Rows>
        <Heading>Heatmap of Will's estimated location</Heading>
        <h4>Jump to location</h4>
        <div><code>[placeholder]</code></div>
        <h4>Filter by date</h4>
        <div><code>[placeholder]</code></div>
        <h4>Filter by time of day</h4>
        <div><code>[placeholder]</code></div>
        <h4>Filter by day of week</h4>
        <div><code>[placeholder]</code></div>
        <p>
          <small>
            <strong>Note:</strong>
            To create this heatmap we've inferred Will's approximate location at 10 minute intervals. Each inferred location
            is a weighted average of phone tower locations for all towers contacted in a four hour window.
          </small>
        </p>
      </Rows>
    </div>
  </Columns>
</Card>

<style>
  @media (min-width: 980px) {
    .map {
      width: 40%;
    }
    .other {
      width: 60%;
    }
  }

  h4 {
    margin: 0;
    font-size: 0.875rem;
  }

  p {
    margin: 0;
    line-height: 1.1;
  }

  small {
    font-size: 0.75rem;
  }
</style>
