<script lang="ts">
  import type { Data } from '../../data';
  import CommsMap from '../CommsMap/CommsMap.svelte';
  import DailyActivity from '../DailyActivity/DailyActivity.svelte';
  import Figure from '../Figure/Figure.svelte';
  import Legend from '../Legend/Legend.svelte';
  import YearlyActivity from '../YearlyActivity/YearlyActivity.svelte';
  import { rankMostActiveContacts } from './utils';

  export let data: Data;

  $: contactIds = rankMostActiveContacts(data.contacts).slice(0, 10);
  $: currentContactId = contactIds[0];
  $: currentContact = data.contacts[currentContactId];
  $: contactComms = data.comms.filter(comm => comm.contact === currentContactId);
</script>

<div>
  <code>[popular-contacts]</code>
  {#if currentContact}
    <code>{JSON.stringify(currentContact)}</code>
  {/if}
  {#if contactComms}
    <Legend isInline isInternetExcluded />
    <DailyActivity comms={contactComms} />
    <YearlyActivity comms={contactComms} />
    <Figure>
      <CommsMap comms={contactComms} />
    </Figure>
  {/if}
</div>
