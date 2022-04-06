import users from "./users";
import products from "./products";
import carts from "./carts";
import orders from "./orders";

export default {
  ...users,
  ...products,
  ...carts,
  ...orders,
};
