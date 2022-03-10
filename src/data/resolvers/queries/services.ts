import Services from "../../../db/models/Services";

const servicesQueries = {
  /**
   * Get one products
   */
  async serviceDetail(_root, { _id }: { _id: string }) {
    return await Services.findOne({ _id });
  },

  /**
   * Get All products
   */
  async services(_root) {
    return await Services.find();
  },
};

export default servicesQueries;
