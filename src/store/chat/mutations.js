export function CHANGE_CHAT(state, chat) {
  state.selectedChat = chat;
}

export function SET_CURRENT_USER(state, user) {
  state.currentUser = user;
}

export function SET_CURRENT_CHATS(state, chats) {
  state.currentChats = chats;
}

export function CHANGE_CALL_ID_IN_CHAT(state, callId) {
  state.selectedChat.call_id = callId;
}
