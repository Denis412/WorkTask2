export function CHANGE_CHAT(state, chat) {
  state.selectedChat = chat;
}

export function SET_CURRENT_USER(state, user) {
  state.currentUser = user;
}

export function CHANGE_CALL(state, callId) {
  state.currentCallId = callId;
}
