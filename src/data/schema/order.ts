export const types = `
  type OrderProduct {
    productId: String
    count: Int
  }

  type Order {
    _id: String
    createdAt: String
    status: String
    deliverType: String
    deliverAddress: String
    totalPrice: Float
    userId: String
    items: [OrderProduct]
  }

  input productInput {
    productId: String
    count: Int
  }
`;

export const queries = `
  orders(deliverType: String): [Order],
  myOrders(userId: String): [Order]
`;

export const mutations = `
  addOrder(deliverType: String!, deliverAddress: String,  totalPrice: Int, userId: String!, items: [productInput] ): Order,
  deleteOrder(orderId: String!): String
`;
