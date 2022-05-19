import { faker } from "@faker-js/faker";
import * as Random from "meteor-random";
import { Users, Products, Orders } from "./models";

export const getUniqueValue = async (
  collection: any,
  fieldName: string = "code",
  defaultValue?: string
) => {
  const getRandomValue = (type: string) =>
    type === "email" ? faker.internet.email().toLowerCase() : Random.id();

  let uniqueValue = defaultValue || getRandomValue(fieldName);

  let duplicated = await collection.findOne({ [fieldName]: uniqueValue });

  while (duplicated) {
    uniqueValue = getRandomValue(fieldName);

    duplicated = await collection.findOne({ [fieldName]: uniqueValue });
  }

  return uniqueValue;
};

interface IUserFactoryInput {
  fullName?: string;
  avatar?: string;
  email?: string;
  password?: string;
  isActive?: boolean;
  deviceTokens?: string[];
  registrationToken?: string;
  registrationTokenExpires?: Date;
}

export const userFactory = async (params: IUserFactoryInput = {}) => {
  const userDoc = {
    registrationToken: params.registrationToken,
    registrationTokenExpires: params.registrationTokenExpires,
    email: await getUniqueValue(Users, "email", params.email),
    password:
      params.password ||
      "$2a$10$qfBFBmWmUjeRcR.nBBfgDO/BEbxgoai5qQhyjsrDUMiZC6dG7sg1q",
    isActive: typeof params.isActive !== "undefined" ? params.isActive : true,
    deviceTokens: params.deviceTokens,
  };

  const user = new Users(userDoc);
  await user.save();

  return user;
};

interface IProductFactoryInput {
  name: string;
  type: string;
  cal: string;
  unitPrice: number;
  categoryId: string;
  image: string;
}

export const productFactory = async (
  params: IProductFactoryInput = {
    name: "",
    type: "",
    cal: "",
    unitPrice: 0,
    categoryId: "",
    image: "",
  }
) => {
  const productDoc = {
    name: params.name,
    type: params.type,
    unitPrice: params.unitPrice,
    cal: params.cal,
    categoryId: params.categoryId,
    image: params.image,
  };

  const product = new Products(productDoc);
  return product;
};
