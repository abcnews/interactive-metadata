import { whenOdysseyLoaded } from '@abcnews/env-utils';
import { getMountValue, selectMounts } from '@abcnews/mount-utils';
import type { ComponentType } from 'svelte/internal';
import App from './components/App/App.svelte';

whenOdysseyLoaded.then(() => {
  selectMounts('metadata').forEach(mountEl => {
    const [, componentName] = getMountValue(mountEl).split(':');
    let Component: ComponentType | null = null;

    switch (componentName) {
      case 'all-days':
      case 'contacts-quiz':
      case 'daily-route':
      case 'download':
      case 'heat-interpolated':
      case 'popular-contacts':
        Component = App;
        break;
      default:
        console.debug(`[metadata] Unrecognised component name: ${componentName}`);
    }

    if (Component) {
      new Component({
        target: mountEl,
        props: {}
      });
    }
  });
});
