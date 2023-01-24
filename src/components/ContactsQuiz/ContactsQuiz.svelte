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
  import { QUESTIONS } from './constants';

  export let data: Data;

  let currentQuestionIndex = 0;

  $: question = QUESTIONS[currentQuestionIndex];
  $: contactComms = data.comms.filter(comm => comm.contact === question.contactId);
</script>

<Card>
  <Rows>
    <Heading>Question <span>{currentQuestionIndex + 1}</span> <small>/ {QUESTIONS.length}</small></Heading>
    <Columns>
      <div class="question">
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
    .question {
      width: 25%;
    }
    .other {
      width: 75%;
    }
  }

  small {
    color: var(--metadata-color-grey);
  }
</style>
