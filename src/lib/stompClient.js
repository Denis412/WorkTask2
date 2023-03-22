import Stomp from "stompjs";

const socket = new WebSocket("ws://192.168.77.1:15674/ws");

const stompClient = Stomp.over(socket);

export default stompClient;
