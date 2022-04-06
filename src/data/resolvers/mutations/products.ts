import { IProduct } from "../../../db/models/definitions/products";
import Products from "../../../db/models/Products";

// interface IPackageEdit extends IPackage {
//   _id: string;
// }

const productMutations = {
  /*
   * Add Product
   */
  async addProduct(_root, doc: IProduct) {
    return await Products.addProduct({
      ...doc,
    });
  },
  /*
   * Delete Product
   */
  async deleteProduct(_root, { _id }: { _id: string }) {
    await Products.deleteOne({ _id });
    return `deleted product with ${_id}`;
  },
};

export default productMutations;
