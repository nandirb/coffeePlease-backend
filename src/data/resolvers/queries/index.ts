import userQueries from "./users";
import productsQueries from "./products";
import categoryQueries from "./category";
import cartQueries from "./cart";

export default {
  ...userQueries,
  ...productsQueries,
  ...categoryQueries,
  ...cartQueries,
};
