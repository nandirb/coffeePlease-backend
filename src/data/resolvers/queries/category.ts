import Categories from "../../../db/models/Category";

const categoryQueries = {
  /**
   * Get category by list
   */
  async categories(_root, { type }: { type: string }) {
    console.log(type);
    return await Categories.find();
  },
};

export default categoryQueries;
