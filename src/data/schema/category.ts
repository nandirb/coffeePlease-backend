export const types = `
  type Category {
    _id: String!
    name: String!
    type : String!
  }
`;

export const queries = `
  categories(type: String): [Category!]
`;

export const mutations = `
  
`;