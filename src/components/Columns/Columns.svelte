<div>
  <slot />
</div>

<style>
  div {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  @media (min-width: 980px) {
    div {
      flex-direction: row;
      width: 100%;
    }
  }
</style>
