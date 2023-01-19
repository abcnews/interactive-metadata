<script lang="ts">
  export let isInline = false;
  export let isInternetExcluded = false;

  $: items = ['Phone', 'SMS', 'Internet'].slice(0, isInternetExcluded ? 2 : 3);
</script>

<div>
  {#each items as item}
    <div class="item" data-type={item.toLowerCase()} data-is-inline={isInline ? '' : undefined}>{item}</div>
  {/each}
</div>

<style>
  .item {
    position: relative;
    margin: 5px;
    padding-left: 18px;
    font-size: 12px;
    line-height: 1.25;
  }

  .item[data-is-inline] {
    display: inline-block;
  }

  @keyframes fadeRange {
    from {
      opacity: 1;
    }
    to {
      opacity: 0.4;
    }
  }

  .item:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 50%;
    width: 12px;
    height: 12px;
    animation: fadeRange 1s infinite alternate linear;
  }

  .item[data-type='phone']::before {
    background-color: var(--metadata-color-phone);
  }

  .item[data-type='sms']::before {
    background-color: var(--metadata-color-sms);
  }

  .item[data-type='internet']::before {
    background-color: var(--metadata-color-internet);
  }
</style>
