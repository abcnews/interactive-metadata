export const DAY_OF_WEEK_PICKER_OPTIONS_LABELS = {
  '-1': 'All days of the week',
  '0': 'Sundays',
  '1': 'Mondays',
  '2': 'Tuesdays',
  '3': 'Wenesdays',
  '4': 'Thursdays',
  '5': 'Fridays',
  '6': 'Saturdays',
  '7': 'All weekdays',
  '8': 'All weekend days'
};

export const DAY_OF_WEEK_PICKER_INDICES = Object.keys(DAY_OF_WEEK_PICKER_OPTIONS_LABELS)
  .map(key => +key)
  .sort();

export const HOURS = [...Array(25).keys()];
