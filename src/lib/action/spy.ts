import { signal, type SignalEvent, type SignalEventDetail } from '$lib/events/signal.js';
import type { Action } from 'svelte/action';

type SpyOptions = {
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
    mutationsList.forEach((mutation) => {
      if (mutation.type !== 'attributes') {
        return;
      }

      options.intel.forEach((intel) => {
        if (mutation.attributeName !== intel) {
          return;
        }

        const targetElement = mutation.target as HTMLElement;
        const value = targetElement.getAttribute(intel);

        signal(node, {
          spy: node,
          intel,
          target: options.target,
          targetElement,
          value,
        });
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
