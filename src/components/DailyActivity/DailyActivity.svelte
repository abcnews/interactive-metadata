<script lang="ts">
  import type { Comm } from '../../data';
  import { HOUR_TICKS } from './constants';
  import { sortCommsByTime } from './utils';

  export let comms: Comm[] = [];

  $: notches = sortCommsByTime(comms).map(({ date, type }) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();

    return {
      type: type ? type.toLowerCase() : undefined,
      title: `${hours}:${String(minutes).padStart(2, '0')}`,
      offsetPct: (100 / 24) * hours + ((100 / 288) * (minutes - (minutes % 5))) / 5
    };
  });
</script>

<div class="root">
  <div class="labels">
    {#each HOUR_TICKS as labelText}
      <div class="label">
        <div class="labelText">{labelText}</div>
      </div>
    {/each}
  </div>
  <div class="notches">
    {#if notches.length > 0}
      {#each notches as notch}
        <div class="notch" title={notch.title} data-type={notch.type} style={`left: ${notch.offsetPct}%`} />
      {/each}
    {:else}
      <p>No data available</p>
    {/if}
  </div>
</div>

<style>
  .root {
    position: relative;
    margin: 0 0 10px;
    width: 100%;
    height: 40px;
  }

  .labels {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 20px;
    font-size: 12px;
  }

  .label {
    position: relative;
    display: inline-block;
    width: 12.5%;
    line-height: 20px;
  }

  .label::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 1px;
    background-color: #ddd;
  }

  .label:last-child::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 1px;
    background-color: #ddd;
  }

  .labelText {
    display: inline-block;
    margin-left: 3px;
  }

  .notches {
    position: absolute;
    top: 20px;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.025);
    box-shadow: inset 0 0 1px rgba(0, 0, 0, 0.5);
  }

  .notches p {
    text-align: center;
    font-size: 90%;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 0.2;
    }
  }

  .notch {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 0.347222222%;
    opacity: 0.2;
    background-color: #666;
    transition: left 0.25s;
    animation: fadeIn 0.25s;
  }

  .notch[data-type='phone'] {
    background-color: var(--metadata-color-phone);
  }

  .notch[data-type='sms'] {
    background-color: var(--metadata-color-sms);
  }

  .notch[data-type='internet'] {
    background-color: var(--metadata-color-internet);
  }
</style>
