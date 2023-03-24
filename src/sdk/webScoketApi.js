export default class WebSocketApi {
  constructor(url) {
    this.ws = new WebSocket(url);
    this.events = {};
  }

  send(data) {
    const { event, payload } = data;

    this.events[event].forEach((cb) => cb(payload));
  }

  on(event, cb) {
    if (!this.events[event]) this.events[event] = [];

    this.events[event].push(cb);
  }
}
