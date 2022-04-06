import { Orders } from "../../../db/models";

const orderQueries = {
  /**
   * Get order by list
   */

  async orders(_root, _args) {
    return Orders.find();
  },
};

export default orderQueries;
