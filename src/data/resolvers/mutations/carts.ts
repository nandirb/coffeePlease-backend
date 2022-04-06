import { ICart } from "../../../db/models/definitions/cart";
import Carts from "../../../db/models/Cart";
import { Products } from "../../../db/models";

const cartMutations = {
  /*
   * Add Cart
   */
  async addCart(_root, doc: ICart) {
    const { productId } = doc;

    let product = await Products.findOne({ _id: productId });

    let cart = await Carts.addCart({
      ...doc,
      count: 1,
    });

    cart.product = product;
    return cart;
  },
  /*
   * Delete Cart
   */
  async deleteCart(_root, { _id }: { _id: string }) {
    await Carts.deleteOne({ _id });
    return `deleted product with ${_id}`;
  },
};

export default cartMutations;
