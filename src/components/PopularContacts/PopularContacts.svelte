<script lang="ts">
  import type { Data } from '../../data';
  import Card from '../Card/Card.svelte';
  import Columns from '../Columns/Columns.svelte';
  import CommsMap from '../CommsMap/CommsMap.svelte';
  import DailyActivity from '../DailyActivity/DailyActivity.svelte';
  import Figure from '../Figure/Figure.svelte';
  import Heading from '../Heading/Heading.svelte';
  import Legend from '../Legend/Legend.svelte';
  import Rows from '../Rows/Rows.svelte';
  import YearlyActivity from '../YearlyActivity/YearlyActivity.svelte';
  import { rankMostActiveContacts } from './utils';

  export let data: Data;

  $: contactIds = rankMostActiveContacts(data.contacts).slice(0, 10);
  $: currentContactId = contactIds[0];
  // $: currentContact = data.contacts[currentContactId];
  $: contactComms = data.comms.filter(comm => comm.contact === currentContactId);
</script>

<Card>
  <Rows>
    <Heading>Will's top 10 contacts</Heading>
    <Columns>
      <div class="contacts">
        <code>[placeholder]</code>
      </div>
      <div class="other">
        {#if contactComms}
          <Rows>
            <DailyActivity comms={contactComms} />
            <YearlyActivity comms={contactComms} />
            <Figure>
              <CommsMap comms={contactComms} />
            </Figure>
          </Rows>
        {/if}
      </div>
    </Columns>
  </Rows>
  <div class="overlay">
    <Legend isInline isInternetExcluded />
  </div>
</Card>

<style>
  .overlay {
    position: absolute;
    top: 16px;
    right: 10px;
  }

  @media (min-width: 980px) {
    .contacts {
      width: 33%;
    }
    .other {
      width: 67%;
    }
  }
</style>
