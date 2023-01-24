<div>
  <slot />
</div>

<style>
  div {
    position: relative;
    padding: 12px;
    background-color: #fff;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
    color: var(--metadata-color-black);
  }

  @media (min-width: 980px) {
    div {
      border-radius: 3px;
    }
  }
</style>
