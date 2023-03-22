import gql from "graphql-tag";

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
