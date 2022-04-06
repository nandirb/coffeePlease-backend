import * as dotenv from "dotenv";
import { connect } from "../db/connection";
import { Products } from "../db/models";

dotenv.config();

const command = async () => {
  console.log(`Process started at: ${new Date()}`);

  await connect();

  const products = await Products.findOne({
    contentType: "customer",
  });

  if (!products) {
    return;
  }

  //   await Products.createField({
  //     text: "Middle Name",
  //     type: "middleName",
  //     canHide: false,
  //     groupId: fieldGroup._id,
  //     contentType: "customer",
  //     isDefinedByErxes: true,
  //   });
};

command().then(() => {
  console.log(`Process finished at: ${new Date()}`);
  process.exit();
});
