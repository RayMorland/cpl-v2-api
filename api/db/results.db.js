var mongoose = require("mongoose");
var Result = mongoose.model("Result");
var Lift = mongoose.model("Lift");
var Attempt = mongoose.model("Attempt");

const allResults = async () => {
  try {
    const result = Result.find().exec();
    return result;
  } catch (err) {
    throw new Error(err.message);
  }
};

const findResult = async (searchQuery) => {
  try {
    const result = await Result.findOne(searchQuery)
      .populate({
        path: "lifts",
        populate: [
          {
            path: "attempt1",
            model: "Attempt",
          },
          {
            path: "attempt2",
            model: "Attempt",
          },
          {
            path: "attempt3",
            model: "Attempt",
          },
        ],
      })
      .exec();

    return result;
  } catch (err) {
    throw new Error(err.message);
  }
};

const createResult = async (newResult) => {
  let result = new Result(newResult);
  result._id = new mongoose.Types.ObjectId();
  result.creationDate = new Date();
  result.lastEditDate = new Date();

  try {
    const newResults = await result.save();
    return newResults;
  } catch (err) {
    throw new Error(err.message);
  }
};

const createResultFromSpreadsheet = async (newResult, lifts, meetId) => {
  let result = new Result({
    _id: new mongoose.Types.ObjectId(),
    creationDate: new Date(),
    lastEditDate: new Date(),
    registrationId: null,
    memberId: null,
    memberName: newResult.name,
    meetId: meetId,
    meetTitle: null,
    resultDate: null,
    gender: newResult.gender,
    testing: null,
    divisions: newResult.divisions,
    category: newResult.category,
    events: newResult.events,
    weightClass: newResult.weightClass,
    weightAtWeighIn: newResult.weight,
    lifts: lifts,
    total: newResult.total,
    totalRecord: null,
    totalRecordId: null,
    wilksScore: newResult.wilks
  });

  try {
    const newResults = await result.save();
    return newResults;
  } catch (err) {
    throw new Error(err.message);
  }
};

const removeResult = async (deletedResult) => {
  try {
    const result = await Result.findByIdAndRemove({
      _id: deletedResult._id,
    }).exec();
    return result;
  } catch (err) {
    throw new Error(err.message);
  }
};

const updateResult = async (updatedResult) => {
  updatedResult.lastEditDate = new Date();

  try {
    const result = await Result.findByIdAndUpdate(
      { _id: updatedResult._id },
      updatedResult,
      { new: true }
    ).exec();
    return result;
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = {
  allResults,
  findResult,
  createResult,
  createResultFromSpreadsheet,
  removeResult,
  updateResult,
};
