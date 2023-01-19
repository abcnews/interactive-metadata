import { Contact } from '../../data';

export const rankMostActiveContacts = (contacts: Record<string, Contact>) =>
  Object.keys(contacts).sort((a, b) => contacts[b].Phone + contacts[b].SMS - (contacts[a].Phone + contacts[a].SMS));
