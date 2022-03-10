import userQueries from "./users";
import productsQueries from "./products";
import servicesQueries from "./services";
import categoryQueries from "./category";

export default {
  ...userQueries,
  ...productsQueries,
  ...servicesQueries,
  ...categoryQueries,
};
