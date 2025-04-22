export const typeDefs = `
  type User {
    id: ID!
    email: String!
    username: String!
    imageUrl: String
    createdAt: String!
    updatedAt: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    me: User
    users: [User!]!
  }

  type Mutation {
    signup(email: String!, password: String!, username: String!, imageUrl: String): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
    forgotPassword(email: String!): Boolean!
    resetPassword(token: String!, refreshToken: String!, newPassword: String!): Boolean!
  }
`; 