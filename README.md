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

## Installation

To install this package, run:

```bash
npm i @konkat/svelte-konkat-api
yarn add @konkat/svelte-konkat-api
pnpm add @konkat/svelte-spy
```

## Getting started

First of all, you will need an HTML element with an attribute you want to spy on.

For example:

```html
<button data-clicked={isClicked} on:click={() => (isClicked = !isClicked)}>
    Click me
</button>
```

> Note: You can use any attribute you want, but it must be a valid HTML attribute.

Then, you will need an HTML element that will "spy" (listen) to the attribute updates. Also add
a `on:signal` event handler to the element to receive the updates.

For example:

```html
<div
  use:spy={{
    target: 'button',
    intel: ['data-clicked'],
  }}
  on:signal={(e) => console.log(e.detail)}
>
  Spying...
</div>
```
