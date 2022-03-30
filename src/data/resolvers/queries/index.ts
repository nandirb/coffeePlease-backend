import userQueries from "./users";
import productsQueries from "./products";
import categoryQueries from "./category";

export default {
  ...userQueries,
  ...productsQueries,
  ...categoryQueries,
};
