import { gql } from "apollo-server-express";
import {
  mutations as UserMutations,
  queries as UserQueries,
  types as UserTypes,
} from "./user";
import {
  mutations as ProductMutations,
  queries as ProductQueries,
  types as ProductTypes,
} from "./products";
import {
  mutations as CategoryMutations,
  queries as CategoryQueries,
  types as CategoryTypes,
} from "./category";
import {
  mutations as CartMutations,
  queries as CartQueries,
  types as CartTypes,
} from "./cart";
import {
    mutations as OrderMutations,
    queries as OrderQueries,
    types as OrderTypes,
  } from "./order";

export const types = `
  ${UserTypes}
  ${ProductTypes}
  ${CategoryTypes}
  ${CartTypes}
  ${OrderTypes}
`;

export const queries = `
  type Query {
    ${UserQueries}
    ${ProductQueries}
    ${CategoryQueries}
    ${CartQueries}
    ${OrderQueries}
  }
`;

export const mutations = `
  type Mutation {
    ${UserMutations}
    ${CartMutations}
    ${ProductMutations}
    ${CategoryMutations}
    ${OrderMutations}
  }
`;

const typeDefs = gql(`${types} ${queries} ${mutations}`);

export default typeDefs;
