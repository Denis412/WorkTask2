import gql from "graphql-tag";

export const getCurrentIdCalls = gql`
  query getCurrentIdCalls($user_id: String!) {
    calls(
      where: {
        _or: [
          { consumer_id: { _eq: $user_id } }
          { sender_id: { _eq: $user_id } }
        ]
      }
    ) {
      id
    }
  }
`;

export const getUsersLastSeen = gql`
  query getUsersLastSeen($last_seen: timestamptz) {
    users(where: { last_seen: { _gte: $last_seen } }) {
      id
      last_seen
    }
  }
`;

export const getAllChatsForCurrentUser = gql`
  query getAllChatsForCurrentUser($user_id: String!) {
    chats(
      where: {
        _or: [
          { consumer_id: { _eq: $user_id } }
          { sender_id: { _eq: $user_id } }
        ]
      }
    ) {
      sender_id
      consumer_id
      id
      consumer_firstName
      consumer_avatar
      sender_firstName
      sender_avatar
    }
  }
`;

export const getUsers = gql`
  query getUsers {
    users {
      id
      first_name
      email
      avatar_url
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
