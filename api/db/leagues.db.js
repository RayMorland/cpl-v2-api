const mongoose = require("mongoose");
const League = mongoose.model("League");

const getLeagues = async () => {
  try {
    const league = await League.find().exec();
    return league;
  } catch (err) {
    throw new Error(err.message);
  }
};

const createLeague = async (newLeague) => {
    let league = new League(newLeague);
    console.log(league);
    league._id = new mongoose.Types.ObjectId();
    league.creationDate = new Date();
    league.lastEditDate = new Date();
    league.status = "active";
  
    try {
      const result = await league.save();
      return result;
    } catch (err) {
      throw new Error(err.message);
    }
};

const updateLeague = async (updatedLeague) => {
    console.log(updatedLeague);
  try {
    const league = await League.findOneAndUpdate(
      { _id: updatedLeague._id },
      updatedLeague,
      { new: true }
    ).exec();
    return league;
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = {
  getLeagues,
  updateLeague,
  createLeague
};
