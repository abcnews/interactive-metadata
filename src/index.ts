import { whenOdysseyLoaded } from '@abcnews/env-utils';
import { getMountValue, selectMounts } from '@abcnews/mount-utils';
import type { ComponentType } from 'svelte/internal';
import ContactsQuiz from './components/ContactsQuiz/ContactsQuiz.svelte';
import DailyRoute from './components/DailyRoute/DailyRoute.svelte';
import Download from './components/Download/Download.svelte';
import InterpolatedHeatmap from './components/InterpolatedHeatmap/InterpolatedHeatmap.svelte';
import PopularContacts from './components/PopularContacts/PopularContacts.svelte';
import './components/global.css';
import { DAY_MOUNT_FORMAT, DAY_MOUNT_FORMAT_REPLACEMENT } from './constants';
import { getInferredHeatData, whenDataLoaded } from './data';

Promise.all([whenDataLoaded, whenOdysseyLoaded]).then(([data]) => {
  console.debug('[interactive-metadata] data', data);

  selectMounts('metadata').forEach(mountEl => {
    const [, componentName, optionalPropValue] = getMountValue(mountEl).split(':');
    let Component: ComponentType | null = null;
    let props: Record<string, unknown> = {
      data
    };

    switch (componentName) {
      case 'contacts-quiz':
        Component = ContactsQuiz;
        break;
      case 'daily-route':
        Component = DailyRoute;
        if (optionalPropValue && DAY_MOUNT_FORMAT.test(optionalPropValue)) {
          props = {
            ...props,
            day: optionalPropValue.replace(DAY_MOUNT_FORMAT, DAY_MOUNT_FORMAT_REPLACEMENT)
          };
        }
        break;
      case 'download':
        Component = Download;
        break;
      case 'interpolated-heatmap':
        Component = InterpolatedHeatmap;
        props = {
          ...props,
          inferredHeatData: getInferredHeatData(data)
        };
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
        props
      });
    }
  });
});
