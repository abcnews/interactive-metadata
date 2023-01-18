import { whenOdysseyLoaded } from '@abcnews/env-utils';
import { getMountValue, selectMounts } from '@abcnews/mount-utils';
import type { ComponentType } from 'svelte/internal';
import ContactsQuiz from './components/ContactsQuiz/ContactsQuiz.svelte';
import DailyRoute from './components/DailyRoute/DailyRoute.svelte';
import Download from './components/Download/Download.svelte';
import InterpolatedHeatmap from './components/InterpolatedHeatmap/InterpolatedHeatmap.svelte';
import PopularContacts from './components/PopularContacts/PopularContacts.svelte';

whenOdysseyLoaded.then(() => {
  selectMounts('metadata').forEach(mountEl => {
    const [, componentName] = getMountValue(mountEl).split(':');
    let Component: ComponentType | null = null;

    switch (componentName) {
      case 'contacts-quiz':
        Component = ContactsQuiz;
        break;
      case 'daily-route':
        Component = DailyRoute;
        break;
      case 'download':
        Component = Download;
        break;
      case 'interpolated-heatmap':
        Component = InterpolatedHeatmap;
        break;
      case 'popular-contacts':
        Component = PopularContacts;
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
