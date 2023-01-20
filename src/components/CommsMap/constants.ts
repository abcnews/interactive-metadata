import type { LayerSpecification } from 'maplibre-gl';

export const DEFAULT_MAP_CONFIG = {
  zoom: 12,
  maxZoom: 14,
  interactive: false,
  attributionControl: false,
  dragRotate: false,
  doubleClickZoom: false,
  style: 'https://www.abc.net.au/res/sites/news-projects/map-vector-style-light/style.json'
};

export const ROUTE_SOURCE_ID = 'route-source';

export const ROUTE_LAYER_ID = 'route-layer';

export const ROUTE_LAYER_PROPS: LayerSpecification = {
  id: ROUTE_LAYER_ID,
  type: 'line',
  source: ROUTE_SOURCE_ID,
  layout: {
    'line-join': 'round',
    'line-cap': 'round'
  },
  paint: {
    'line-color': 'red',
    'line-opacity': 0.5,
    'line-width': 2,
    'line-dasharray': [4, 3]
  }
};
