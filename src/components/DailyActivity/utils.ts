import type { Comm } from '../../data';

const getTimeId = (comm: Comm) => comm.date.getHours() * 60 + comm.date.getMinutes();

export const sortCommsByTime = (comms: Comm[]) => comms.sort((a, b) => getTimeId(a) - getTimeId(b));
