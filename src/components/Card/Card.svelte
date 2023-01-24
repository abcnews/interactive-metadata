<div>
  <slot />
</div>

<style>
  div {
    padding: 16px;
    background-color: #fff;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
  }

  @media (min-width: 980px) {
    div {
      border-radius: 3px;
    }
  }
</style>
