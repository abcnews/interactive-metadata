import './CommMarker.css';

const CommMarker = (type?: string) => {
  const el = document.createElement('div');

  el.className = 'CommsMap_CommMarker';

  if (type) {
    el.setAttribute('data-type', type.toLowerCase());
  }

  return el;
};

export default CommMarker;
