import type { LngLatLike } from 'maplibre-gl';
import { LngLatBounds } from 'maplibre-gl';
import { MONTHS_SHORT } from './constants';

export const getBounds = (coordinates: LngLatLike[]) =>
  coordinates.reduce<LngLatBounds>(
    (bounds, coord) => bounds.extend(coord),
    new LngLatBounds(coordinates[0], coordinates[0])
  );

export const getDayKey = (date: Date) =>
  `${date.getDate()} ${MONTHS_SHORT[date.getMonth()]} ${String(date.getFullYear()).replace('20', `'`)}`;

export const uuid = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
    .replace(/x/g, () => Math.floor(Math.random() * 0xf).toString(16))
    .replace('y', Math.floor(Math.random() * 4 + 8).toString(16));
};
