import { Model, model } from "mongoose";
import { orderSchema, IOrderDocument, IOrder } from "./definitions/order";

export interface IOrderModel extends Model<IOrderDocument> {
  getOrder(_id: string): Promise<IOrderDocument>;
  addOrder(doc: IOrder): Promise<IOrderDocument>;
}

export const loadClass = () => {
  class Order {
    public static async getOrder(_id: string) {
      const order = await Orders.findOne({ _id });

      if (!order) {
        throw new Error("Order not found");
      }

      return order;
    }

    public static async addOrder(doc: IOrder) {
      const order = await Orders.create({
        ...doc,
        status: "PROCESSING",
        createdAt: new Date(),
      });

      return order;
    }
  }

  orderSchema.loadClass(Order);

  return orderSchema;
};

loadClass();

export const Orders = model<IOrderDocument, IOrderModel>("order", orderSchema);

export default Orders;
