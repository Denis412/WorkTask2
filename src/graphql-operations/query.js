import gql from "graphql-tag";

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
