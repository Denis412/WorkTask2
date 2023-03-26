import gql from "graphql-tag";

export const createCallInChat = gql`
  mutation createCallInChat($id: Int!, $call_id: String!) {
    update_chats_by_pk(pk_columns: { id: $id }, _set: { call_id: $call_id }) {
      id
    }
  }
`;

export const updateUserLastSeen = gql`
  mutation updateUserLastSeen($user_id: String!, $last_seen: timestamptz!) {
    update_users(
      where: { id: { _eq: $user_id } }
      _set: { last_seen: $last_seen }
    ) {
      affected_rows
    }
  }
`;

export const createChat = gql`
  mutation createChat(
    $sender_id: String!
    $consumer_id: String!
    $sender_avatar: String!
    $consumer_avatar: String!
    $sender_firstName: String!
    $consumer_firstName: String!
  ) {
    insert_chats_one(
      object: {
        sender_id: $sender_id
        consumer_id: $consumer_id
        sender_avatar: $sender_avatar
        sender_firstName: $sender_firstName
        consumer_avatar: $consumer_avatar
        consumer_firstName: $consumer_firstName
      }
    ) {
      id
    }
  }
`;

export const createUser = gql`
  mutation createUser(
    $id: String
    $first_name: String
    $email: String
    $avatar_url: String!
  ) {
    insert_users_one(
      object: {
        id: $id
        first_name: $first_name
        email: $email
        avatar_url: $avatar_url
      }
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
