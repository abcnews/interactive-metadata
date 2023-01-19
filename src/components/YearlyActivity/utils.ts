import type { Comm } from '../../data';

export const sortCommsByDate = (comms: Comm[]) => [...comms].sort((a, b) => +a.date - +b.date);
