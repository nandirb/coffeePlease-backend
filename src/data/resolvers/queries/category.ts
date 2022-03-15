import Categories from "../../../db/models/Category";

const categoryQueries = {
  /**
   * Get category by list
   */
  async categories(_root: { type: string }) {
    return await Categories.find();
  },
};

export default categoryQueries;
