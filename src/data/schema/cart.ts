export const types = `
  type Cart {
    _id: String!
    productId: String
    count: Int
    product: Product
  }
`;

export const queries = `
  carts(type: String): [Cart]
`;

export const mutations = `
    addCart(productId: String!): Cart
    deleteCart(cartId: String!): String
`;
