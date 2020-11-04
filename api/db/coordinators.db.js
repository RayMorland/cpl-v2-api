const mongoose = require("mongoose");
const Coordinator = mongoose.model("Coordinator");

const allCoordinators = async () => {
  try {
    const result = await Coordinator.find().exec();
    return result;
  } catch (err) {
    throw new Error(err.message);
  }
};

const findCoordinator = async (searchQuery) => {

  try {
    const result = await Coordinator.findOne(searchQuery)
      .populate("meets")
      .exec();
    return result;
  } catch (err) {
    throw new Error(err.message);
  }
};

const createCoordinator = async (newCoordinator) => {
  let coordinator = new Coordinator(newCoordinator);
  coordinator._id = new mongoose.Types.ObjectId();
  coordinator.creationDate = new Date();
  coordinator.lastEditDate = new Date();
  coordinator.status = "application";

  try {
    const result = await coordinator.save();
    return result;
  } catch (err) {
    throw new Error(err.message);
  }
};

const removeCoordinator = async (Coordinator) => {
  try {
    const result = await Coordinator.findByIdAndRemove({
      _id: coordinator._id,
    }).exec();
    return result;
  } catch (err) {
    throw new Error(err.message);
  }
};

const updateCoordinator = async (id, updatedCoordinator) => {
  updatedCoordinator.lastEditDate = new Date();

  try {
    const result = await Coordinator.findByIdAndUpdate(
      { _id: id },
      updatedCoordinator,
      { new: true }
    ).exec();
    return result;
  } catch (err) {
    throw new Error(err.message);
  }
};

const getCoordinatorsMeets = async (coordinator) => {
  try {
    const result = await Coordinator.findById(coordinator)
      .populate("meets")
      .exec();
    return result;
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = {
  allCoordinators,
  findCoordinator,
  createCoordinator,
  removeCoordinator,
  updateCoordinator,
  getCoordinatorsMeets,
};
