var mongoose = require('mongoose');
var User = mongoose.model('User');
var usersService = require('../services/users.service');

const errorHandler = function (err, res) {
    return res.status(500).send({ message: err.message });
};

const getUsers = async (req, res) => {
    try {
        const result = await usersService.getUsers();
        res.status(200).send(result);
    } catch (err) {
        errorHandler(err, res);
    }
}

const createUser = async (req, res) => {
    const newUser = req.body.newUser;
    const cognito = req.body.cognito;
    const userType = req.body.userType;

    console.log(req.body);

    try {
        const user = await usersService.createUser(newUser, userType, cognito);
        res.status(200).send(user);
    } catch (err) {
        errorHandler(err, res);
    }
}

const findUser =  async (req, res) => {

    const user = req.query;

    try {
        const result = await usersService.findUser(user);
        res.status(200).send(result);
    } catch (err) {
        errorHandler(err, res);
    }
}

const findUserByEmail =  async (req, res) => {

    const user = req.query;

    user.email = decodeURIComponent(user.email);

    try {
        const result = await usersService.findUser(user);
        res.status(200).send(result);
    } catch (err) {
        errorHandler(err, res);
    }
}

const updateUser = async (req, res) => {
    const updatedUser = req.body.updatedUser;

    try {
        const result = await usersService.updateUser(updatedUser);
        return result;
    } catch (err) {
        errorHandler(err, res);
    }
}

const deleteUser = async (req, res) => {
    const deletedUser = req.body.deletedUser;

    try {
        const result = await usersService.deleteUser(deletedUser);
        return result;
    } catch (err) {
        errorHandler(err, res);
    }
}

module.exports = {
    getUsers,
    createUser,
    findUser,
    findUserByEmail,
    updateUser,
    deleteUser
}