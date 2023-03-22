import gql from "graphql-tag";

export const createMessage = gql`
  mutation createMessage(
    $senderId: String!
    $consumerId: String!
    $senderDisplayName: String!
    $senderAvatarUrl: String!
    $content: String!
    $chat_id: Int!
  ) {
    insert_messages_one(
      object: {
        senderId: $senderId
        consumerId: $consumerId
        senderDisplayName: $senderDisplayName
        senderAvatarUrl: $senderAvatarUrl
        content: $content
        chat_id: $chat_id
      }
    ) {
      id
    }
  }
`;
