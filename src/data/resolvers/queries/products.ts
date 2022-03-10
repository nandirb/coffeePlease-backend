import Products from "../../../db/models/Products";

const productsQueries = {
  /**
   * Get one products
   */
  async productDetail(_root, { _id }: { _id: string }) {
    return await Products.findOne({ _id });
  },
  
  /**
   * Get All products
  */
  async products(_root) {
    return await Products.find();
  },
};

export default productsQueries;
