import { MONTHS_SHORT } from './constants';

export const getDayKey = (date: Date) =>
  `${date.getDate()} ${MONTHS_SHORT[date.getMonth()]} ${String(date.getFullYear()).replace('20', `'`)}`;

export const uuid = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
    .replace(/x/g, () => Math.floor(Math.random() * 0xf).toString(16))
    .replace('y', Math.floor(Math.random() * 4 + 8).toString(16));
};
