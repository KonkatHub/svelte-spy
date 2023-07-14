import type { Action } from 'svelte/action';

type SignalEventDetail = {
  spy: HTMLElement;
  intel: string;
  value: string | null;
  target: string;
  targetElement: HTMLElement;
};

export type SignalEvent = CustomEvent<SignalEventDetail>;

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
        if (mutation.attributeName !== intel || !(node instanceof HTMLElement)) {
          return;
        }
        const targetElement = mutation.target as HTMLElement;
        const value = targetElement.getAttribute(intel);

        const detail: SignalEventDetail = {
          spy: node,
          intel,
          target: options.target,
          targetElement,
          value,
        };
        node.dispatchEvent(new CustomEvent<SignalEventDetail>('signal', { detail }));
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
