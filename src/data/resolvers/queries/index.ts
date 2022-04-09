import userQueries from "./users";
import productsQueries from "./products";
import categoryQueries from "./category";
import orderQueries from "./order";

export default {
  ...userQueries,
  ...productsQueries,
  ...categoryQueries,
  ...orderQueries,
};
