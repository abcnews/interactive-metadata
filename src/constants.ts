export const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'Sepember',
  'October',
  'November',
  'December'
];

export const MONTHS_SHORT = MONTHS.map(x => x.substring(0, 3));

export const MONTHS_TINY = MONTHS.map(x => x.substring(0, 1));

export const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const DAYS_SHORT = DAYS.map(x => x.substring(0, 3));

export const DAYS_TINY = DAYS.map(x => x.substring(0, 1));

export const DAY_FORMAT = /^(\d{1,2})\s([A-Za-z]{3})\s'(\d{2})$/;

export const DAY_MOUNT_FORMAT = /^(\d{1,2})([A-Za-z]{3})(\d{2})$/;

export const DAY_MOUNT_FORMAT_REPLACEMENT = `$1 $2 '$3`;

export const DEFAULT_MAP_CONFIG = {
  zoom: 12,
  maxZoom: 14,
  // interactive: false,
  attributionControl: false,
  dragRotate: false,
  doubleClickZoom: false,
  style: 'https://www.abc.net.au/res/sites/news-projects/map-vector-style-light/style.json'
};
