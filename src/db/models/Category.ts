import { Model, model } from "mongoose";
import { categorySchema, ICategoryDocument } from "./definitions/category";

export interface ICategoryModel extends Model<ICategoryDocument> {
  getCategory(_id: string): Promise<ICategoryDocument>;
}

export const loadClass = () => {
  class Category {
    public static async getCategory(_id: string) {
      const category = await Categories.findOne({ _id });

      if (!category) {
        throw new Error("Service category not found");
      }

      return category;
    }
  }

  categorySchema.loadClass(Category);

  return categorySchema;
};

loadClass();

export const Categories = model<ICategoryDocument, ICategoryModel>(
  "categories",
  categorySchema
);

export default Categories;
