const leagueDb = require('../db/leagues.db');

const getLeagues = async () => {
    try {
        const league = await leagueDb.getLeagues();
        return league;
    } catch (err) {
        throw new Error(err.message);
    }
};

const createLeague = async (newLeague) => {

    try {
        const league = await leagueDb.createLeague(newLeague);
        return league;
    } catch (err) {
        throw new Error(err.message);
    }
};

const updateLeague = async (updatedLeague) => {

    try {
        const league = await leagueDb.updateLeague(updatedLeague);
        return league;
    } catch (err) {
        throw new Error(err.message);
    }
};

module.exports = {
    getLeagues,
    updateLeague,
    createLeague
}