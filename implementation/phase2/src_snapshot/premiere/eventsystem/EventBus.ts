type Listener = (payload?: unknown) => void;

export default class EventBus {

  private events = new Map<string, Listener[]>();

  on(event: string, listener: Listener) {
    this.events.set(event, [...(this.events.get(event) ?? []), listener]);
  }

  emit(event: string, payload?: unknown) {
    for (const listener of this.events.get(event) ?? []) {
      listener(payload);
    }
  }

}
