const commonParams = `
  email: String,
  phoneNumber: String,
  avatar: String
  address: String
`;

export const types = `
  type User {
    _id: String!
    isActive: Boolean
    fullName: String
    ${commonParams}
  }
`;

export const queries = `
  userDetail(_id: String): User
  currentUser: User
`;

export const mutations = `
  register(email: String!, password: String!): String
  login(email: String!, password: String!): String
  logout: String
  forgotPassword(email: String!): String!
  usersUpdate(_id: String!, ${commonParams}): User
  usersChangePassword(currentPassword: String!, newPassword: String!): User
`;
