<script lang="ts">
  import { spy } from '$lib/actions/spyAction.js';
  import type { SignalEvent } from '$lib/events/SignalEvent.js';

  let isClicked = false;
  let test = 0;

  function onClick() {
    isClicked = !isClicked;
    test++;
  }

  function onSignal(e: SignalEvent) {
    console.log(e.detail);
  }
</script>

<button data-test={test} data-clicked={isClicked} on:click={onClick}>Click me</button>

<div
  on:signal={onSignal}
  use:spy={{
    target: 'button',
    intel: ['data-clicked', 'data-test'],
  }}
/>
