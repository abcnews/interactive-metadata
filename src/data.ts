import { getDayKey, uuid } from './utils';

const KNOWN_CONTACT_HANDLES: Record<string, string> = {
  '02927b3dd5e1b61dcdd4ef92a73af6e3894988435384abfc718d77bd0589ad4a': 'work source', // Work source
  '0f674115abae19827979246209d0eaf4eb23086397bdfd2e311020deda28cf09': 'parent', // Parent B
  ae542a227ec4a56403090f19e7b2feec9623b19abbf500ba68f7ad1a4d39fdbf: 'friend', // Friend C
  c3749071ad84bac7cd5f4ad290c385ce38880adfa54216374cd78c4970a5dfcc: 'friend', // Friend D
  '1b23b9aae59fbe03b9af08755e8a6d5980c5e9efce92f38065a3ffdf695a65b4': 'friend', // Friend A
  '0b296c5ea64da22b95c7f71bae8fdf3c447738d646304faa242b7fcaf8e3d2e3': 'work colleague', // Work colleague
  '7301d82bd5d095d7bfd4d6d1ab6530fca51c2b088d86d4718e7de7b4140e8c7f': 'sibling', // Sibling
  c94c7e666354943881f83e030ab5d031a51cf6d99154b4506de061809d938ba2: 'parent', // Parent A
  ed72947ccd0b9d1e1c0f71a6c343089de8edc33d74b69ad3c3fb5a84c3f273cf: 'friend', // Friend E
  '77e2053059fa7cb7a2c4fd82b752b8905c511c85405edc8aa4a51ecd5c8b51cf': 'friend' // Friend B
};

function csvParse(csvString: string, delimiter = ',') {
  const [keysRow, ...rows] = csvString.split('\n');

  if (!keysRow) {
    return [];
  }

  const keys = keysRow.split(delimiter);

  return rows.map(row => {
    const values = row.split(delimiter);

    return keys.reduce(
      (record, key, index) => ({
        ...record,
        [key]: values[index]
      }),
      {}
    );
  });
}

type Metadata = {
  cell_towers: {
    cell_cgi: string;
    cell_tower_lat: string;
    cell_tower_long: string;
    cell_tower_location: string;
  }[];
  comms: {
    comm_type: string;
    comm_identifier: string;
    comm_time: string;
    cell_cgi: string;
  }[];
  comm_indexes: {
    comm_type: Record<string, string>;
    comm_identifier: Record<string, string>;
    cell_cgi: Record<string, string>;
  };
};

export type Cell = {
  cgi: string;
  lat: number;
  lon: number;
  name: string;
};

export type Comm = {
  id: string;
  type?: string;
  contact?: string;
  date: Date;
  cell: Cell;
};

export type Contact = {
  Phone: number;
  SMS: number;
  handle?: string;
};

export type Data = {
  cells: Record<string, Cell>;
  comms: Comm[];
  commsByDay: Record<string, Comm[]>;
  contacts: Record<string, Contact>;
};

export const whenDataLoaded = fetch(`${__webpack_public_path__}data/metadata.json`)
  .then(response => response.json())
  .then(json => {
    const metadata = Object.keys(json).reduce(
      (metadata, key) => ({
        ...metadata,
        [key]: key === 'comm_indexes' ? json[key] : csvParse(json[key])
      }),
      {} as Metadata
    );

    const cells = metadata.cell_towers.reduce<Record<string, Cell>>((cells, cell_tower) => {
      if (cell_tower.cell_cgi) {
        cells[cell_tower.cell_cgi] = {
          cgi: cell_tower.cell_cgi,
          lat: +cell_tower.cell_tower_lat,
          lon: +cell_tower.cell_tower_long,
          name: cell_tower.cell_tower_location
        };
      }

      return cells;
    }, {});

    const comms = metadata.comms
      .map<Comm>(comm => ({
        id: uuid(),
        type: metadata.comm_indexes.comm_type[comm.comm_type],
        contact: metadata.comm_indexes.comm_identifier[comm.comm_identifier],
        date: new Date(+comm.comm_time),
        cell: cells[metadata.comm_indexes.cell_cgi[comm.cell_cgi]]
      }))
      .filter(comm => comm.cell != null);

    const commsByDay = comms.reduce<Record<string, Comm[]>>((commsByDay, comm) => {
      var key = getDayKey(comm.date);

      if (!commsByDay[key]) {
        commsByDay[key] = [];
      }

      commsByDay[key].push(comm);

      return commsByDay;
    }, {});

    const contacts = [
      ...new Set(comms.map(({ contact }) => contact).filter((contact): contact is string => !!contact))
    ].reduce<Record<string, Contact>>((contacts, contactId) => {
      contacts[contactId] = { Phone: 0, SMS: 0 };

      if (KNOWN_CONTACT_HANDLES[contactId] != null) {
        contacts[contactId].handle = KNOWN_CONTACT_HANDLES[contactId];
      }

      return contacts;
    }, {});

    comms.forEach(comm => {
      if (!comm.contact || !comm.type) {
        return;
      }

      contacts[comm.contact][comm.type]++;
    });

    return {
      cells,
      comms,
      commsByDay,
      contacts
    } as Data;
  });
