import type { LayerSpecification } from 'maplibre-gl';

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
