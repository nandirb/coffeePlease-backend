import { Model, model } from "mongoose";
import { cartSchema, ICart, ICartDocument } from "./definitions/cart";

export interface ICartModel extends Model<ICartDocument> {
  getCarts(_id: string): Promise<ICartDocument>;
  addCart(doc: ICart): Promise<ICartDocument>;
}

export const loadClass = () => {
  class Cart {
    public static async getCarts(_id: string) {
      let cart = await Carts.findOne({ _id });

      if (!cart) {
        throw new Error("Service cart not found");
      }

      return cart;
    }

    public static async addCart(doc: ICart) {
      // generate code automatically
      let cart = await Carts.findOne({ productId: doc.productId });

      if (!cart) {
        cart = await Carts.create({
          ...doc,
          createdAt: new Date(),
        });
      } else {
        await Carts.updateOne(
          { _id: cart._id },
          { $set: { ...doc, count: ++cart.count } }
        );
        cart = await Carts.findOne({ _id: cart._id });
      }

      return cart;
    }
  }

  cartSchema.loadClass(Cart);

  return cartSchema;
};

loadClass();

export const Carts = model<ICartDocument, ICartModel>("carts", cartSchema);

export default Carts;
