import type { LngLatLike } from 'maplibre-gl';
import type { InferredHeatDatum } from '../../data';
import { DAY_OF_WEEK_PICKER_INDICES } from './constants';

const checkIsDayOfWeekIncluded = (dayOfWeek: number, dayOfWeekPickerIndex: keyof typeof DAY_OF_WEEK_PICKER_INDICES) =>
  dayOfWeekPickerIndex === -1 ||
  dayOfWeek === dayOfWeekPickerIndex ||
  (dayOfWeekPickerIndex === 7 && dayOfWeek > 0 && dayOfWeek < 6) ||
  (dayOfWeekPickerIndex === 8 && (dayOfWeek === 0 || dayOfWeek === 6));

export const checkIsInferredHeatDatumIncluded = (
  datum: InferredHeatDatum,
  boundingDates: [Date, Date],
  boundingHours: [number, number],
  dayOfWeekPickerIndex: number
) => {
  const [d] = datum;

  // Date
  const date = d.getTime();

  // Time of day
  const hour = d.getHours();

  // Day of week
  const isIncludedDayOfWeek = checkIsDayOfWeekIncluded(d.getDay(), dayOfWeekPickerIndex);

  return (
    date >= +boundingDates[0] &&
    date <= +boundingDates[1] &&
    hour >= boundingHours[0] &&
    hour <= boundingHours[1] &&
    isIncludedDayOfWeek
  );
};

export const getInferredHeatDatumCoordinate = (datum: InferredHeatDatum) => {
  const [, [lat, lng]] = datum;

  return [lng, lat] as LngLatLike;
};

export const hourOfDayFormatter = (value: unknown) => {
  const hour = Number(value);

  if (hour === 0 || hour === 24) {
    return 'Midnight';
  }

  if (hour === 12) {
    return 'Midday';
  }

  return hour > 12 ? hour - 12 + 'pm' : hour + 'am';
};
