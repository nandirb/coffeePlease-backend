import { Products } from "../../../db/models";
import Carts from "../../../db/models/Cart";
import { ICart } from "../../../db/models/definitions/cart";

const cartQueries = {
  /**
   * Get cart by list
   */

  async carts(_root: { type: string }) {
    let carts = JSON.parse(JSON.stringify(await Carts.find())) as ICart[];

    for (let cart of carts) {
      const product = await Products.findOne({ _id: cart.productId });

      cart.product = product;
    }

    return carts;
  },
};

export default cartQueries;
