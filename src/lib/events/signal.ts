export type SignalEventDetail = {
  spy: HTMLElement;
  intel: string;
  value: string | null;
  target: string;
  targetElement: HTMLElement;
};

export type SignalEvent = CustomEvent<SignalEventDetail>;

export const signal = (node: HTMLElement, detail: SignalEventDetail) => {
  node.dispatchEvent(new CustomEvent<SignalEventDetail>('signal', { detail }));
};
