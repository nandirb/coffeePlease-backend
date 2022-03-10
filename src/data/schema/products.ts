export const types = `
  type ProductCategory {
    _id: String
    name: String
    description: String
    parentId: String
    order: String
    childCount: Float
  }

  type Product {
    _id: String!
    name: String
    type: String
    description: String
    unitPrice: Float
    categoryId: String
    category: ProductCategory
  }
`;

export const queries = `
  products(categoryId: String, searchValue: String, page: Int, perPage: Int): [Product]
  productDetail(_id: String): Product
`;
