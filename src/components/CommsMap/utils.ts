import type { LngLatLike, SourceSpecification } from 'maplibre-gl';

export const createRouteSource = (coordinates: LngLatLike[]): SourceSpecification => ({
  type: 'geojson',
  data: {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: {
          type: 'LineString',
          coordinates
        }
      }
    ]
  }
});
