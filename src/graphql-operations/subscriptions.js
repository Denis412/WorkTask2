import gql from "graphql-tag";

export const getUserById = gql`
  subscription getUsers($id: String!) {
    users(where: { id: { _eq: $id } }) {
      id
      first_name
      email
      avatar_url
      last_seen
    }
  }
`;

export const getUsers = gql`
  subscription getUsers {
    users {
      id
      first_name
      email
      avatar_url
      last_seen
    }
  }
`;

export const getAllChatsForCurrentUser = gql`
  subscription getAllChatsForCurrentUser($user_id: String!) {
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
    messages(
      where: { chat_id: { _eq: $chat_id } }
      order_by: { created_at: asc }
    ) {
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
