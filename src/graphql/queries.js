import { gql } from 'apollo-boost';

export const USER_QUERY = gql`
  query User($email: ID!) {
    user(email: $email) {
      email
      name
      role
    }
  }
`;

export const ALL_USERS_QUERY = gql`
  query {
    allUsers {
      email
      name
      role
    }
  }
`;
