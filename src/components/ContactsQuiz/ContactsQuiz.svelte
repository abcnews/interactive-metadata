<script lang="ts">
  import type { Data } from '../../data';
  import DailyActivity from '../DailyActivity/DailyActivity.svelte';
  import Figure from '../Figure/Figure.svelte';
  import Legend from '../Legend/Legend.svelte';
  import YearlyActivity from '../YearlyActivity/YearlyActivity.svelte';
  import { QUESTIONS } from './constants';

  export let data: Data;

  let currentQuestionIndex = 0;

  $: question = QUESTIONS[currentQuestionIndex];
  $: contactComms = data.comms.filter(comm => comm.contact === question.contactId);
</script>

<div>
  <code>[contacts-quiz]</code>
  {#if contactComms}
    <Legend isInline isInternetExcluded />
    <DailyActivity comms={contactComms} />
    <YearlyActivity comms={contactComms} />
  {/if}
  <Figure>
    <code>[map]</code>
  </Figure>
</div>
