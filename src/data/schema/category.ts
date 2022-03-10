export const types = `
  type Category {
    _id: String!
    name: String!
    type : String!
    description: String!
  }
`;

export const queries = `
  categories(type: String): [Category!]
`;
