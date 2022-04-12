export const types = `
  type Product {
    _id: String!
    name: String
    unitPrice: Float
    image: String
  }

  input productInput {
    _id: String
    name: String
    unitPrice: Float
    image: String
  }


  input itemInput {
    product: productInput
    count: Int
  }

  type itemType {
    product: Product
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
