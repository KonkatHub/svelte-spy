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
  - [Examples](#examples)
    - [Spying on multiple intel](#spying-on-multiple-intel)
    - [Selecting a specific target](#selecting-a-specific-target)

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
