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

  let currentContactId: string;

  $: contactIds = rankMostActiveContacts(data.contacts).slice(0, 10);
  $: currentContactId = contactIds[0];
  $: contactComms = data.comms.filter(comm => comm.contact === currentContactId);
</script>

<Card>
  <Rows>
    <Heading>Will's top 10 contacts</Heading>
    <Columns>
      <div class="contacts">
        <ol>
          {#each contactIds as contactId}
            {@const contact = data.contacts[contactId]}
            <li>
              <button
                data-is-current={contactId === currentContactId ? '' : undefined}
                on:click={() => (currentContactId = contactId)}
              >
                <span class="id">{contactId.slice(0, 8)}</span>
                <span class="count" data-type="sms">
                  {contact.Phone}
                  <svg viewBox="0 0 24 24">
                    <title>calls</title>
                    <path
                      d="M6.609 10.781q2.25 4.359 6.609 6.609l2.203-2.203q0.469-0.469 1.031-0.234 1.688 0.563 3.563 0.563 0.422 0 0.703 0.281t0.281 0.703v3.516q0 0.422-0.281 0.703t-0.703 0.281q-7.031 0-12.023-4.992t-4.992-12.023q0-0.422 0.281-0.703t0.703-0.281h3.516q0.422 0 0.703 0.281t0.281 0.703q0 1.875 0.563 3.563 0.188 0.609-0.234 1.031z"
                    />
                  </svg>
                </span>
                <span class="count" data-type="phone">
                  {contact.SMS}
                  <svg viewBox="0 0 24 24">
                    <title>texts</title>
                    <path
                      d="M18 8.016v-2.016h-12v2.016h12zM14.016 14.016v-2.016h-8.016v2.016h8.016zM6 9v2.016h12v-2.016h-12zM20.016 2.016q0.797 0 1.383 0.586t0.586 1.383v12q0 0.797-0.586 1.406t-1.383 0.609h-14.016l-3.984 3.984v-18q0-0.797 0.586-1.383t1.383-0.586h16.031z"
                    />
                  </svg>
                </span>
              </button>
            </li>
          {/each}
        </ol>
      </div>
      <div class="other">
        {#if contactComms}
          <Rows>
            <DailyActivity comms={contactComms} />
            <YearlyActivity comms={contactComms} />
            <Figure fixedHeight={300}>
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

  ol {
    margin: 0;
  }

  li::marker {
    font-size: 1.25rem;
    line-height: 30px;
  }

  li + li {
    margin-top: 6px;
  }

  button {
    border: 1px solid var(--metadata-color-lightgrey);
    border-radius: 8px;
    padding: 8px 16px 7px;
    width: 100%;
    background-color: var(--metadata-color-lightergrey);
    display: flex;
    font-size: 15px;
    cursor: pointer;
  }

  button[data-is-current] {
    border-color: transparent;
    background-color: var(--metadata-color-newsblue);
  }

  .id {
    margin-right: auto;
    font-weight: bold;
    filter: blur(3px);
  }

  .count {
    margin-left: 4px;
    width: 50px;
    text-align: right;
  }

  svg {
    width: 18px;
    height: auto;
    vertical-align: top;
  }
</style>
