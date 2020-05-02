import { model } from "mongoose";

class Service {
  constructor(instance) {
    this.model = instance;
    this.modelName = instance.modelName;

    this.createService();
  }

  static create(instance) {
    return new Service(instance);
  }

  createService() {
    this.create = async data => this.model.create(data);

    this.get = async (value, field, callback) =>
      this.model.findOne(value, field, callback);

    this.getMany = async (value, field, callback) =>
      this.model.find(value, field, callback);

    this.all = async () => this.model.collection;

    this.agg = (value, callback) => this.model.aggregate(value, callback);

    this.aggPaginate = async (aggregate, options) =>
      this.model.aggregatePaginate(aggregate, options);

    this.paginate = async (aggregate, options) =>
      this.model.paginate(aggregate, options);

    this.update = async (value, data, field) =>
      this.model.updateOne(value, data, field);

    this.delete = async (value, field) => this.model.deleteOne(value, field);

    this.deleteMany = async (value, field) =>
      this.model.deleteMany(value, field);

    this.count = async () => this.model.countDocuments({});
  }
}

export const createService = (name, scheme) => {
  const createdModel = model(name, scheme);

  return new Service(createdModel);
};
