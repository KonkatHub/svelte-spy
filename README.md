# Svelte Spy

Spy (listen) on intel (HTML attributes) with this simple to use Svelte Action.

## Goal

The goal of this project is to provide a simple way to spy on HTML attributes updates
with a Svelte Action. It should be easy to use and easy to understand via its "spy-themed" API.

## Table of content

- [Svelte Spy](#svelte-spy)
  - [Goal](#goal)
  - [Table of content](#table-of-content)
  - [Installation](#installation)
  - [Getting started](#getting-started)
    - [Lexicon](#lexicon)
  - [Examples](#examples)
    - [Spying on multiple intel](#spying-on-multiple-intel)
    - [Selecting a specific target](#selecting-a-specific-target)
  - [API Reference](#api-reference)
    - [Spy action](#spy-action)
    - [SignalEvent](#signalevent)

## Installation

To install this package:

```bash
npm i @konkat/svelte-spy
yarn add @konkat/svelte-spy
pnpm add @konkat/svelte-spy
```

## Getting started

First of all, you will need an HTML element with an attribute you want to spy on.

For example:

```html
<script lang="ts">
  let isClicked = false
</script>

<button data-clicked={isClicked} on:click={() => (isClicked = !isClicked)}>
  Click me
</button>
```

> Note: You can use any attribute you want, but it must be a valid HTML attribute.

Then, you will need an HTML element that will "spy" (listen) to the attribute updates. Also add
a `on:signal` event handler to the element to receive the updates.

For example:

```html
<script lang="ts">
  import { spy, type SignalEvent } from '@konkat/svelte-spy'

  function onSignal(e: SignalEvent) {
    const { intel, targetElement, value } = e.detail;
    console.log(`{intel} on {targetElement} was updated to {value}`)
  }
</script>

<div
  use:spy={{
    target: 'button',
    intel: ['data-clicked'],
  }}
  on:signal={onSignal}
>
  Spying...
</div>
```

### Lexicon

- **Spy**: The HTML element that will listen to the attribute updates.
- **Target**: The HTML element you want to spy on.
- **Intel**: The HTML attribute you want to spy on.
- **Signal**: The event that is fired when the attribute is updated.

## Examples

We'll go over some examples to see how to use this package at its full potential.

> For simplicity purposes, we'll colocate the spy and the target in the same file. But you can
> separate them in different files if you want. Matter of fact, they can be as far from each other as you want and they don't need to be children/parent of each other.

### Spying on multiple intel

In the following examples, we will spy on multiple attributes at the same time, one of the
attributes being a stardard HTML button attribute (`disabled`):

```html
<script lang="ts">
  import { spy, type SignalEvent } from '@konkat/svelte-spy'

  let isClicked = false
  let clickCount = 0;
  let disabled = false;

  function onClick() {
    isClicked = !isClicked
    clickCount++
    if (clickCount >= 5) {
      isDisabled = true
    }
  }

  function onSignal(e: SignalEvent) {
    console.log(e.detail)
  }
</script>

<button data-clicked={isClicked} {disabled} on:click={onClick}>
  Click me
</button>

<div
  use:spy={{
    target: 'button',
    intel: ['data-clicked', 'disabled'],
  }}
  on:signal={onSignal}
>
  Spying...
</div>
```

### Selecting a specific target

To spy on a target, you can use any valid CSS selector. For example, you can spy on a specific
element with an `id` attribute:

> Under the hood, we simply use `document.querySelector(target)` to find the target element.

```html
<script lang="ts">
  import { spy, type SignalEvent } from '@konkat/svelte-spy'

  let isClicked = false

  function onClick() {
    isClicked = !isClicked
  }

  function onSignal(e: SignalEvent) {
    console.log(e.detail)
  }
</script>

<button id="MyButton" data-clicked={isClicked} on:click={onClick}>
  Click me
</button>

<div
  use:spy={{
    target: '#MyButton',
    intel: ['data-clicked'],
  }}
  on:signal={onSignal}
>
  Spying...
</div>
```

## API Reference

While using this package, you can hover any functions/types/properties to see their
documentation.

### Spy action

The `spy` action is the main way to spy on a target. It is used to spy on
HTML attributes updates.

Here's the signature of the `spy` action:

```ts
const spy: Action<HTMLElement, SpyOptions, SpyEvents>;
```

When using the `spy` action, you must provide a SpyOptions object as a parameter:

```ts
type SpyOptions = {
  target: string;
  intel: string[];
};
```

### SignalEvent

The `SignalEvent` is fired when an **intel** being spied on is updated. It's
a `CustomEvent` with the type of `signal`. It contains a `detail` property
that is of type `SignalEventDetail`:

```ts
type SignalEventDetail = {
  spy: HTMLElement;
  intel: string;
  value: string | null;
  target: string;
  targetElement: HTMLElement;
};
```
