import type { LngLatLike, SourceSpecification } from 'maplibre-gl';
import { LngLatBounds } from 'maplibre-gl';

export const createRouteSource = (coordinates: LngLatLike[]): SourceSpecification => ({
  type: 'geojson',
  data: {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: {
          type: 'LineString',
          properties: {},
          coordinates
        }
      }
    ]
  }
});

export const getBounds = (coordinates: LngLatLike[]) =>
  coordinates.reduce<LngLatBounds>(
    (bounds, coord) => bounds.extend(coord),
    new LngLatBounds(coordinates[0], coordinates[0])
  );
