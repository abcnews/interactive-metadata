<script lang="ts">
  import type { Data } from '../../data';
  import Button from '../Button/Button.svelte';
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
  let hasChosen = false;
  let isCorrect: boolean | null = null;
  let score = 0;

  const choose = (choice: string) => {
    hasChosen = true;
    isCorrect = choice === question.contactId;

    if (isCorrect) {
      score++;
    }
  };

  const advance = () => {
    currentQuestionIndex++;
    hasChosen = false;
    isCorrect = null;
  };

  $: canAdvance = currentQuestionIndex + 1 < QUESTIONS.length;
  $: question = QUESTIONS[currentQuestionIndex];
  $: contactComms = data.comms.filter(comm => comm.contact === question.contactId);
  $: [optionA, optionB] =
    Math.random() > 0.5 ? [question.contactId, question.redHerringId] : [question.redHerringId, question.contactId];
</script>

<Card>
  <Rows>
    <Heading>Question <span>{currentQuestionIndex + 1}</span> <small>/ {QUESTIONS.length}</small></Heading>
    <Columns>
      <div class="question">
        <Rows>
          <div class="status">
            {#if hasChosen}
              <p data-sentiment={isCorrect ? 'positive' : 'negative'}>
                <strong>{isCorrect ? 'Correct!' : 'Incorrect'}</strong>
              </p>
              <p>
                It was Will's <strong>{data.contacts[question.contactId].handle}</strong>, not his
                <strong>{data.contacts[question.redHerringId].handle}</strong>
              </p>
              <p>{question.explanation}</p>
            {:else}
              <p>{question.description}</p>
            {/if}
          </div>
          <div class="actions">
            {#if hasChosen}
              {#if canAdvance}
                <Button kind="newsblue" on:click={() => advance()}>Next Question</Button>
              {:else}
                <p>{`You scored ${score} / ${QUESTIONS.length}`}</p>
              {/if}
            {:else}
              <p>Is this Will's</p>
              <Button kind="dark" on:click={() => choose(optionA)}>{data.contacts[optionA].handle}</Button>
              <p>or his</p>
              <Button kind="dark" on:click={() => choose(optionB)}>{data.contacts[optionB].handle}</Button>
            {/if}
          </div>
        </Rows>
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

  .status p {
    margin: 0 0 8px;
  }

  .actions {
    margin-top: auto;
  }

  .actions p {
    margin: 8px;
    text-align: center;
  }

  p[data-sentiment='positive'] {
    color: var(--metadata-color-green);
  }

  p[data-sentiment='negative'] {
    color: var(--metadata-color-red);
  }
</style>
