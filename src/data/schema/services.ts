export const types = `
  type Service {
    _id: String!
    name: String
    type: String
    description: String
    categoryId: String
    category: ServiceCategory
  }


  type ServiceCategory {
    _id: String!
    type : String!
    name: String!
    description: String!
  }

`;

export const queries = `
  services(categoryId: String, searchValue: String, page: Int, perPage: Int): [Service]
  serviceDetail(_id: String): Service
`;
