import type { LngLatLike } from 'maplibre-gl';
import { Map, Marker } from 'maplibre-gl';
import type { Action } from 'svelte/action';
import CommMarker from './CommMarker';
import { DEFAULT_MAP_CONFIG, ROUTE_LAYER_ID, ROUTE_LAYER_PROPS, ROUTE_SOURCE_ID } from './constants';
import { createRouteSource, getBounds } from './utils';
import 'maplibre-gl/dist/maplibre-gl.css';

export interface MLGLActionPoint {
  type?: string;
  coordinate: LngLatLike;
}

interface MLGLActionParam {
  points: MLGLActionPoint[];
  hasRoute: boolean;
  clientHeight: number;
}

export const mlgl: Action<HTMLElement, MLGLActionParam> = (el, param) => {
  if (!param) {
    return;
  }

  let markers: Marker[] = [];

  const map = new Map({
    ...DEFAULT_MAP_CONFIG,
    container: el,
    center: getBounds(param.points.map(({ coordinate }) => coordinate)).getCenter()
  });

  const set = (param: MLGLActionParam) => {
    const { points, hasRoute } = param;
    const coordinates = points.map(({ coordinate }) => coordinate);

    if (map.getLayer(ROUTE_LAYER_ID)) {
      map.removeLayer(ROUTE_LAYER_ID);
      map.removeSource(ROUTE_SOURCE_ID);
    }

    if (hasRoute) {
      map.addSource(ROUTE_SOURCE_ID, createRouteSource(coordinates));
      map.addLayer(ROUTE_LAYER_PROPS);
    }

    markers.forEach(marker => marker.remove());
    markers = points.map(point =>
      new Marker({
        element: CommMarker(point.type)
      })
        .setLngLat(point.coordinate)
        .addTo(map)
    );

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
