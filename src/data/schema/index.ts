import { gql } from "apollo-server-express";
import {
  mutations as UserMutations,
  queries as UserQueries,
  types as UserTypes,
} from "./user";
import { queries as ProductQueries, types as ProductTypes } from "./products";
import { queries as CategoryQueries, types as CategoryTypes } from "./category";

export const types = `
  ${UserTypes}
  ${ProductTypes}
  ${CategoryTypes}
`;

export const queries = `
  type Query {
    ${UserQueries}
    ${ProductQueries}
    ${CategoryQueries}
  }
`;

export const mutations = `
  type Mutation {
    ${UserMutations}
  }
`;

const typeDefs = gql(`${types} ${queries} ${mutations}`);

export default typeDefs;
