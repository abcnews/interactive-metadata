<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import RangeSlider from 'svelte-range-slider-pips/src';

  export let range: unknown[] = [];
  export let initial: unknown | [unknown, unknown];
  export let formatter: (value: unknown) => string = value => String(value);

  const valueAtIndex = (index: number) => range[index];
  const labelFormatter = (index: number) => formatter(valueAtIndex(index));
  const dispatch = createEventDispatcher();
  const onChange = ({ detail }) => {
    const { values: indices } = detail;
    const values = indices.map(valueAtIndex);

    dispatch('change', values.length > 1 ? values : values[0]);
  };

  $: isRange = Array.isArray(initial);
  $: indices = (isRange ? (initial as string[]).slice(0, 2) : [initial as string]).map(value => range.indexOf(value));
  $: if (indices.some(index => index === -1)) throw new Error('initial value not in range of values');
</script>

<div data-is-range={isRange ? '' : undefined}>
  <RangeSlider
    min={0}
    max={range.length - 1}
    values={indices}
    range={Array.isArray(initial) && 'min max'}
    springValues={{ stiffness: 1, damping: 1 }}
    formatter={labelFormatter}
    float
    pushy
    on:stop={onChange}
  />
</div>

<style>
  div {
    --range-slider: var(--metadata-color-lightgrey);
    --range-handle: var(--metadata-color-black);
    --range-handle-focus: var(--metadata-color-black);
    --range-handle-inactive: var(--metadata-color-grey);
    --range-float: transparent;
    --range-float-inactive: transparent;
    --range-float-text: var(--metadata-color-black);

    padding: 0.75rem 0.5rem 0;
  }

  div[data-is-range] {
    padding: 0.75rem 0.5rem;
  }

  div :global(.rangeSlider) {
    border-radius: 0;
  }

  div :global(.rangeHandle) {
    cursor: pointer;
  }

  div :global(.rangeHandle)::before {
    content: none;
  }

  div :global(.rangeFloat) {
    opacity: 1;
    top: -0.2em;
    font-size: 0.75rem;
    font-weight: bold;
  }

  div[data-is-range] :global(.rangeHandle) + :global(.rangeHandle) :global(.rangeFloat) {
    transform: translate(-50%, 100%);
    top: auto;
    bottom: -0.2em;
  }
</style>
