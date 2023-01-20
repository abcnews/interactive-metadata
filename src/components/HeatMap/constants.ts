import type { LayerSpecification } from 'maplibre-gl';

export const HEAT_SOURCE_ID = 'heat-source';

export const HEAT_LAYER_ID = 'heat-layer';

export const HEAT_LAYER_PROPS: LayerSpecification = {
  id: HEAT_LAYER_ID,
  type: 'heatmap',
  source: HEAT_SOURCE_ID,
  paint: {
    'heatmap-weight': 0.025,
    'heatmap-opacity': 0.75
  }
};
