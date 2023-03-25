export function CHANGE_CHAT(state, chat) {
  state.selectedChat = chat;
}

export function CHANGE_CALL(state, callId) {
  state.currentCallId = callId;
}
