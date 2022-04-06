import { Model, model } from "mongoose";
import {
  productSchema,
  IProductDocument,
  IProduct,
} from "./definitions/products";

export interface IProductModel extends Model<IProductDocument> {
  getProduct(_id: string): Promise<IProductDocument>;
  addProduct(doc: IProduct): Promise<IProductDocument>;
}

export const loadClass = () => {
  class Product {
    /**
     * Retreives Product
     */
    public static async getProduct(_id: string) {
      const product = await Products.findOne({ _id });

      if (!product) {
        throw new Error("Product not found");
      }

      return product;
    }
    /**
     * Create new Product
     */
    public static async addProduct(doc: IProduct) {
      // generate code automatically
      const product = await Products.create({
        ...doc,
        createdAt: new Date(),
      });

      return product;
    }
  }

  productSchema.loadClass(Product);

  return productSchema;
};

loadClass();

// tslint:disable-next-line
const Products = model<IProductDocument, IProductModel>(
  "product",
  productSchema
);

export default Products;
