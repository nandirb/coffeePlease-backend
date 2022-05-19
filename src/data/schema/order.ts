export const types = `
  type productType {
    _id: String!
    name: String
    unitPrice: Int
    image: String
  }

  input productInput {
    _id: String
    image: String
    name: String
    unitPrice: Int
  }


  input itemInput {
    count: Int
    product: productInput
  }

  type itemType {
    product: productType
    count: Int
  }

  type addressType {
    address: String
    lng: Float
    lat: Float
    phone: String
  }

  input addressInput {
    address: String
    lng: Float
    lat: Float
    phone: String
  }
  
  type Order {
    _id: String
    createdAt: String
    status: String
    deliverType: String
    deliverAddress: addressType
    totalPrice: Float
    userId: String
    items: [itemType]
  }

`;

export const queries = `
  orders(deliverType: String): [Order],
  myOrders(userId: String!): [Order]
`;

export const mutations = `
  addOrder(deliverType: String!, deliverAddress: addressInput,  totalPrice: Int, userId: String!, items: [itemInput] ): Order,
  deleteOrder(orderId: String!): String
`;
