import Orders from "../../../db/models/Orders";

const orderQueries = {
  /**
   * Get order by list
   */

  async orders(_root) {
    return await Orders.find();
  },

  async myOrders(_root, _args, { userId }: { userId: string }) {
    if (userId) {
      return await Orders.findOne({ userId: userId });
    }
    return null;
  },
};

export default orderQueries;
