import gql from "graphql-tag";

export const getLastMessageInTheChat = gql`
  subscription getLastMessageInTheChat($chat_id: Int) {
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

export const getSavedMessagesInThisChat = gql`
  subscription getSavedMessagesInThisChat($chat_id: Int) {
    chats(where: { id: { _eq: $chat_id } }) {
      messages {
        id
        senderId
        senderDisplayName
        senderAvatarUrl
        created_at
        content
        consumerId
      }
    }
  }
`;
