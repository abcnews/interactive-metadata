import type { LngLatLike, SourceSpecification } from 'maplibre-gl';

export const createHeatSource = (coordinates: LngLatLike[]): SourceSpecification => ({
  type: 'geojson',
  data: {
    type: 'FeatureCollection',
    features: coordinates.map(coordinate => ({
      type: 'Feature',
      properties: {
        weight: 1
      },
      geometry: {
        type: 'Point',
        coordinates: coordinate
      }
    }))
  }
});
