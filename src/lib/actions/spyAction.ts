import { SignalEvent } from '$lib/events/SignalEvent.js';
import { onAttributeMutation } from '$lib/observers/mutationListeners.js';
import type { Action } from 'svelte/action';

/**
 * Represents the options needed by the spy action.
 */
export type SpyOptions = {
  /**
   * Target element selector. Will be used in `document.querySelector()`.
   */
  target: string;

  /**
   * HTML attribute names to spy on.
   */
  intel: string[];
};

/**
 * The events potentially triggered by the Action. The type is needed for
 * Svelte auto-complete.
 */
type SpyEvents = {
  'on:signal': (e: SignalEvent) => void;
};

/**
 * Spy action used to spy on HTML attributes. It will dispatch a `signal` event
 * when the attribute changes.
 *
 * @param node - The HTML element to notify when intel is updated
 * @param options - The options needed by the spy action
 */
export const spy: Action<HTMLElement, SpyOptions, SpyEvents> = (
  node: HTMLElement,
  options: SpyOptions
) => {
  const targetElement = document.querySelector(options.target);

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
