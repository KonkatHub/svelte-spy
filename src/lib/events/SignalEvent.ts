/**
 * The type of the detail property in the `SignalEvent`.
 */
type SignalEventDetail = {
  /**
   * The element spying on a target.
   */
  spy: HTMLElement;

  /**
   * The HTML attribute that triggered the SignalEvent.
   */
  intel: string;

  /**
   * The HTML attribute's updated value.
   */
  value: string | null;

  /**
   * The selector used to find the target element.
   */
  target: string;

  /**
   * The element being spied on.
   */
  targetElement: HTMLElement;
};

/**
 * A `CustomEvent` with the type of `signal` that is triggered on
 * `intel` update.
 */
export class SignalEvent extends CustomEvent<SignalEventDetail> {
  constructor(eventInitDict?: CustomEventInit<SignalEventDetail>) {
    super('signal', eventInitDict);
  }
}
