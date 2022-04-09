const commonParams = `
  email: String,
  phoneNumber: String,
  avatar: String
  address: String
  point: Int
  reward:Int
`;

export const types = `
  type User {
    _id: String!
    fullName: String
    ${commonParams}
  }
`;

export const queries = `
  userDetail(_id: String): User
  currentUser: User
  users: [User]
`;

export const mutations = `
  register(email: String!, password: String!): String
  login(email: String!, password: String!): String
  logout: String
  forgotPassword(email: String!): String!
  usersUpdate(_id: String!, ${commonParams}): User
  usersChangePassword(currentPassword: String!, newPassword: String!): User
`;
