import { SignalEvent } from '$lib/events/SignalEvent.js';
import { onAttributeMutation } from '$lib/observers/mutationListeners.js';
import type { Action } from 'svelte/action';

export type SpyOptions = {
  target: string;
  intel: string[];
};

type SpyEvents = {
  'on:signal': (e: SignalEvent) => void;
};

export const spy: Action<HTMLElement, SpyOptions, SpyEvents> = (
  node: HTMLElement,
  options: SpyOptions
) => {
  const targetElement = document.getElementById(options.target);

  if (!targetElement) {
    return;
  }

  const observer = new MutationObserver((mutationsList: MutationRecord[]) => {
    onAttributeMutation(mutationsList, (mutation) => {
      options.intel.forEach((intel) => {
        if (mutation.attributeName !== intel) {
          return;
        }

        const targetElement = mutation.target as HTMLElement;
        const value = targetElement.getAttribute(intel);

        node.dispatchEvent(
          new SignalEvent({
            detail: {
              spy: node,
              intel,
              target: options.target,
              targetElement,
              value,
            },
          })
        );
      });
    });
  });

  const config: MutationObserverInit = {
    attributes: true,
    attributeFilter: options.intel,
  };

  observer.observe(targetElement, config);

  return {
    destroy() {
      observer.disconnect();
    },
  };
};
