type SignalEventDetail = {
  spy: HTMLElement;
  intel: string;
  value: string | null;
  target: string;
  targetElement: HTMLElement;
};

export class SignalEvent extends CustomEvent<SignalEventDetail> {
  constructor(eventInitDict?: CustomEventInit<SignalEventDetail>) {
    super('signal', eventInitDict);
  }
}
