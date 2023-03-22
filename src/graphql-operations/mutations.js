import gql from "graphql-tag";

export const createUser = gql`
  mutation createUser($id: String, $first_name: String, $email: String) {
    insert_users_one(
      object: { id: $id, first_name: $first_name, email: $email }
    ) {
      id
    }
  }
`;

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
