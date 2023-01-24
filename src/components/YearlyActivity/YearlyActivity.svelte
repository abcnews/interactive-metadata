<script lang="ts">
  import { MONTHS_TINY } from '../../constants';
  import type { Comm } from '../../data';
  import { ONE_DAY } from './constants';
  import { sortCommsByDate } from './utils';

  export let comms: Comm[] = [];

  $: commsByDate = sortCommsByDate(comms);
  $: startOfYear = new Date(commsByDate[0].date.getFullYear(), 0, 0);
  $: daysInYear = new Date(commsByDate[0].date.getFullYear(), 1, 29).getMonth() === 1 ? 366 : 365;
  $: notches = commsByDate.map(({ date, type }) => {
    const diff = +date - +startOfYear;
    const dayOfYear = Math.floor(diff / ONE_DAY);

    return {
      type: type ? type.toLowerCase() : undefined,
      title: date.toDateString(),
      offsetPct: ((100 / daysInYear) * dayOfYear) % 100
    };
  });
</script>

<div class="root">
  <div class="labels">
    {#each MONTHS_TINY as label}
      <div class="label">{label}</div>
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
    width: 8.333333333%;
    line-height: 20px;
    text-align: center;
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
    width: 0.273972603%;
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
