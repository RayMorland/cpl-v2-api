const leaguesService = require('../services/leagues.service');

const errorHandler = (err, res) => {
  return res.status(500).send({ message: err.message });
};

const getLeagues = async (req, res) => {
  try {
    const league = await leaguesService.getLeagues();
    res.status(200).send(league);
  } catch (err) {
    errorHandler(err, res);
  }
}

const findLeague = async (req, res) => {

}

const createLeague = async (req, res) => {
  const newLeague = req.body.newLeague;

  try {
     const league = await leaguesService.createLeague(newLeague);
     res.status(200).send(league);
  } catch (err) {
    errorHandler(err, res);
  }
}

const updateLeague = async (req, res) => {
  const updatedLeague = req.body.updatedLeague;

  try {
    const league = await leaguesService.updateLeague(updatedLeague);
    res.status(200).send(league);
  } catch (err) {
    errorHandler(err, res);
  }
}

const deleteLeague = async (req, res) => {

}

module.exports = {
  getLeagues,
  findLeague,
  createLeague,
  updateLeague,
  deleteLeague
}