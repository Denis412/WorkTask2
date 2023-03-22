import gql from "graphql-tag";

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
