<script lang="ts">
  import { LngLatLike } from 'maplibre-gl';
  import { mlgl } from './actions';

  export let coordinates: LngLatLike[] = [];

  let clientHeight: number;
</script>

<div class="root" bind:clientHeight>
  <div class="map" use:mlgl={{ coordinates, clientHeight }} />
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
    /* pointer-events: none; */
  }

  .map {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
</style>
