import Orders from "../../../db/models/Orders";

const orderQueries = {
  /**
   * Get order by list
   */

  async orders(_root) {
    return await Orders.find();
  },

  async myOrders(_root, { userId }: { userId: string }) {

    if (userId) {
      return await Orders.find({ userId });
    }
    return null;
  },
};

export default orderQueries;
