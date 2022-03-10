import { Model, model } from "mongoose";
import { serviceSchema, IServiceDocument } from "./definitions/services";

export interface IServiceModel extends Model<IServiceDocument> {
  getService(_id: string): Promise<IServiceDocument>;
}

export const loadClass = () => {
  class Service {
    /**
     * Retreives Service
     */
    public static async getService(_id: string) {
      const service = await Services.findOne({ _id });

      if (!service) {
        throw new Error("Service not found");
      }

      return service;
    }
  }

  serviceSchema.loadClass(Service);

  return serviceSchema;
};

loadClass();

export const Services = model<IServiceDocument, IServiceModel>(
  "service",
  serviceSchema
);

export default Services;
