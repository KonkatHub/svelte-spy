<script lang="ts">
  import { spy } from '$lib/spy.js';

  let isClicked = false;
  let test = 0;
</script>

<button
  id="button"
  data-test={test}
  data-clicked={isClicked}
  on:click={() => {
    isClicked = !isClicked;
    test++;
  }}
>
  Click me
</button>

<div
  on:signal={(e) => console.log(e.detail)}
  use:spy={{
    target: 'button',
    intel: ['data-clicked', 'data-test'],
  }}
/>
