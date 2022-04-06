import { Orders } from "../../../db/models";
import { IOrder } from "../../../db/models/definitions/order";

const orderMutations = {
  /*
   * Add Order
   */
  async addOrder(_root, doc: IOrder) {
    const order = await Orders.addOrder({
      ...doc,
    });
    return order._id;
  },
  /*
   * Delete Order
   */
  async deleteOrder(_root, { _id }: { _id: string }) {
    await Orders.deleteOne({ _id });
    return `deleted order with ${_id}`;
  },
};

export default orderMutations;
