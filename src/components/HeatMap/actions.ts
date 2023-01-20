import type { LngLatLike } from 'maplibre-gl';
import { Map } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import type { Action } from 'svelte/action';
import { DEFAULT_MAP_CONFIG } from '../../constants';
import { getBounds } from '../../utils';
import { HEAT_LAYER_ID, HEAT_LAYER_PROPS, HEAT_SOURCE_ID } from './constants';
import { createHeatSource } from './utils';

interface MLGLActionParam {
  coordinates: LngLatLike[];
  clientHeight: number;
}

export const mlgl: Action<HTMLElement, MLGLActionParam> = (el, param) => {
  if (!param) {
    return;
  }

  const map = new Map({
    ...DEFAULT_MAP_CONFIG,
    container: el,
    center: getBounds(param.coordinates).getCenter()
  });

  const set = (param: MLGLActionParam) => {
    const { coordinates } = param;

    if (map.getLayer(HEAT_LAYER_ID)) {
      map.removeLayer(HEAT_LAYER_ID);
      map.removeSource(HEAT_SOURCE_ID);
    }

    map.addSource(HEAT_SOURCE_ID, createHeatSource(coordinates));
    map.addLayer(HEAT_LAYER_PROPS);

    map.fitBounds(getBounds(coordinates), {
      padding: 48,
      duration: 500
    });
  };

  map.on('load', () => {
    set(param);
  });

  let styleTimeout: NodeJS.Timeout;

  return {
    update(param) {
      clearTimeout(styleTimeout);

      if (map.isStyleLoaded()) {
        set(param);
      } else {
        styleTimeout = setTimeout(() => set(param), 500);
      }
    },

    destroy() {}
  };
};
