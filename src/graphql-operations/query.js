import gql from "graphql-tag";

export const getLastMessageInTheChat = gql`
  query getLastMessageInTheChat($chat_id: Int) {
    chats(where: { id: { _eq: $chat_id } }) {
      messages(order_by: { created_at: desc }, limit: 1) {
        id
        senderId
        senderDisplayName
        senderAvatarUrl
        created_at
        content
        consumerId
        chat_id
      }
    }
  }
`;

export const getUserById = gql`
  query getUserById($id: String) {
    users(where: { id: { _eq: $id } }) {
      first_name
      email
    }
  }
`;

export const getSavedMessagesInThisChat = gql`
  query getSavedMessagesInThisChat($chat_id: Int) {
    messages(where: { chat_id: { _eq: $chat_id } }) {
      id
      senderId
      senderDisplayName
      senderAvatarUrl
      created_at
      content
      consumerId
    }
  }
`;
