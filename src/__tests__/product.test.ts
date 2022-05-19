import { productFactory } from "../db/factories";
import { Products } from "../db/models";
import "./setup.ts";

describe("Product DB ", () => {
  test("Create product", async () => {
    const testProduct = await Products.addProduct({
      name: "Product1",
      type: "cafe",
      cal: "400gr",
      unitPrice: 9999,
      categoryId: "c1",
      image: "i1",
    });

    expect(testProduct).toBeDefined();
    expect(testProduct.name).toHaveLength;
    expect(testProduct.unitPrice).toBeGreaterThan(0);
    expect(testProduct.type).not.toBeGreaterThan;
  });
});
