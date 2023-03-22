import gql from "graphql-tag";

export const getUsers = gql`
  subscription getUsers {
    users {
      id
      first_name
      email
      avatar_url
    }
  }
`;

export const getAllChatsSenderForCurrentUser = gql`
  subscription getAllChatsSenderForCurrentUser($user_id: String!) {
    chats(where: { sender_id: { _eq: $user_id } }) {
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

export const getAllChatsConsumerForCurrentUser = gql`
  subscription getAllChatsSenderForCurrentUser($user_id: String!) {
    chats(where: { consumer_id: { _eq: $user_id } }) {
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
