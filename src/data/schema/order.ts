export const types = `
  type OrderProduct {
    product: Product
    count: Int
  }

  type Order {
    _id: String
    createdAt: String
    status: String
    deliverType: String
    deliverAddress: String
    products: [String]
  }
`;

export const queries = `
  orders(deliverType: String): [Order]
`;

export const mutations = `
  addOrder(deliverType: String!, deliverAddress: String, products: [String]): String
  deleteOrder(orderId: String!): String
`;
