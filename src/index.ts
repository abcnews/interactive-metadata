import { whenOdysseyLoaded } from '@abcnews/env-utils';
import { getMountValue, selectMounts } from '@abcnews/mount-utils';
import type { ComponentType } from 'svelte/internal';
import App from './components/App/App.svelte';
import Download from './components/Download/Download.svelte';

whenOdysseyLoaded.then(() => {
  selectMounts('metadata').forEach(mountEl => {
    const [, componentName] = getMountValue(mountEl).split(':');
    let Component: ComponentType | null = null;

    switch (componentName) {
      case 'all-days':
        Component = App;
        break;
      case 'contacts-quiz':
        Component = App;
        break;
      case 'daily-route':
        Component = App;
        break;
      case 'download':
        Component = Download;
        break;
      case 'heat-interpolated':
        Component = App;
        break;
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
