<script lang="ts">
  import type { Data, InferredHeatData } from '../../data';
  import Card from '../Card/Card.svelte';
  import Columns from '../Columns/Columns.svelte';
  import Heading from '../Heading/Heading.svelte';
  import HeatMap from '../HeatMap/HeatMap.svelte';
  import Figure from '../Figure/Figure.svelte';
  import Rows from '../Rows/Rows.svelte';
  import Slider from '../Slider/Slider.svelte';
  import { DAY_OF_WEEK_PICKER_INDICES, DAY_OF_WEEK_PICKER_OPTIONS_LABELS, HOURS } from './constants';
  import { checkIsInferredHeatDatumIncluded, getInferredHeatDatumCoordinate, hourOfDayFormatter } from './utils';

  export let data: Data;
  export let inferredHeatData: InferredHeatData;

  // Date filter
  $: days = Object.keys(data.commsByDay);
  $: boundingDays = [days[0], days[days.length - 1]];
  $: boundingDates = (([minDay, maxDay]) => {
    const minDate = data.commsByDay[minDay][0].date;
    const maxDate = data.commsByDay[maxDay][0].date;

    minDate.setHours(0, 0, 0, 0);
    maxDate.setHours(0, 0, 0, 0);

    return [minDate, maxDate] as [Date, Date];
  })(boundingDays);

  // Time of day filter
  $: boundingHours = [HOURS[0], HOURS[HOURS.length - 1]] as [number, number];

  // Day of week filter
  $: dayOfWeekPickerIndex = DAY_OF_WEEK_PICKER_INDICES[0];

  // Filtered coordinates
  $: coordinates = inferredHeatData
    .filter(datum => checkIsInferredHeatDatumIncluded(datum, boundingDates, boundingHours, dayOfWeekPickerIndex))
    .map(datum => getInferredHeatDatumCoordinate(datum));
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
        <!-- <h4>Jump to location</h4>
        <div><code>[placeholder]</code></div> -->
        <h4>Filter by date</h4>
        <div>
          <Slider range={days} initial={boundingDays} on:change={({ detail }) => (boundingDays = detail)} />
        </div>
        <h4>Filter by time of day</h4>
        <div>
          <Slider
            range={HOURS}
            formatter={hourOfDayFormatter}
            initial={boundingHours}
            on:change={({ detail }) => (boundingHours = detail)}
          />
        </div>
        <h4>Filter by day of week</h4>
        <div>
          <select bind:value={dayOfWeekPickerIndex}>
            {#each DAY_OF_WEEK_PICKER_INDICES as value}
              <option {value}>{DAY_OF_WEEK_PICKER_OPTIONS_LABELS[value]}</option>
            {/each}
          </select>
        </div>
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

  select {
    border: 1px solid var(--metadata-color-lightgrey);
    border-radius: 8px;
    padding: 8px 8px 7px;
    background-color: var(--metadata-color-lightergrey);
    cursor: pointer;
  }
</style>
