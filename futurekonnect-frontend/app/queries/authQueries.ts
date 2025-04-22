import { gql } from "@apollo/client";

export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        email
        username
        imageUrl
        createdAt
        updatedAt
      }
    }
  }
`;

export const SIGNUP_MUTATION = gql`
  mutation Signup(
    $email: String!
    $password: String!
    $username: String!
    $imageUrl: String
  ) {
    signup(
      email: $email
      password: $password
      username: $username
      imageUrl: $imageUrl
    ) {
      token
      user {
        id
        email
        username
        imageUrl
        createdAt
        updatedAt
      }
    }
  }
`;

export const FORGOT_PASSWORD_MUTATION = gql`
  mutation ForgotPassword($email: String!) {
    forgotPassword(email: $email)
  }
`;

export const RESET_PASSWORD_MUTATION = gql`
  mutation ResetPassword(
    $token: String!
    $refreshToken: String!
    $newPassword: String!
  ) {
    resetPassword(
      token: $token
      refreshToken: $refreshToken
      newPassword: $newPassword
    )
  }
`;
