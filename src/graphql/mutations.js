import { gql } from 'apollo-boost';

export const USER_MUTATION = gql`
  mutation UpdateUser($email: ID!, $newAttributes: UserAttributesInput!) {
    updateUser(email: $email, newAttributes: $newAttributes) {
      email
      name
      role
    }
  }
`;

export const DELETE_USER_MUTATION = gql`
  mutation DeleteUsers($emails: [ID]!) {
    deleteUsers(emails: $emails)
  }
`;

export const RESET_USERS_MUTATION = gql`
  mutation ResetUsers {
    resetUsers
  }
`;
