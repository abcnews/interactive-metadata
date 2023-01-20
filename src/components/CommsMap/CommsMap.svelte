<script lang="ts">
  import type { Comm } from '../../data';
  import type { MLGLActionPoint } from './actions';
  import { mlgl } from './actions';

  export let comms: Comm[] = [];
  export let hasRoute = false;

  let clientHeight: number;

  $: points = comms.map<MLGLActionPoint>(({ cell, type }) => {
    const { lat, lng } = cell;

    return {
      type,
      coordinate: [lng, lat]
    };
  });
</script>

<div class="root" bind:clientHeight>
  <div class="map" use:mlgl={{ points, hasRoute, clientHeight }} />
</div>

<style>
  .root {
    position: relative;
    overflow: hidden;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    background-color: hsl(0 0% 25%);
    pointer-events: none;
  }

  .map {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
</style>
