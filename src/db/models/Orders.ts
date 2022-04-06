import { Model, model } from "mongoose";
import { orderSchema, IOrderDocument, IOrder } from "./definitions/order";

export interface IOrderModel extends Model<IOrderDocument> {
  getOrders(): Promise<IOrderDocument>;
  addOrder(doc: IOrder): Promise<IOrderDocument>;
}

export const loadClass = () => {
  class Order {
    public static async getOrders() {
      const orders = await Orders.find();

      if (!orders) {
        throw new Error("Service orders not found");
      }

      return orders;
    }

    public static async addOrder(doc: IOrder) {
      // generate code automatically

      return Orders.create({
        ...doc,
        status: "PROCESSING",
        createdAt: new Date(),
      });
    }
  }

  orderSchema.loadClass(Order);

  return orderSchema;
};

loadClass();

export const Orders = model<IOrderDocument, IOrderModel>("order", orderSchema);

export default Orders;
