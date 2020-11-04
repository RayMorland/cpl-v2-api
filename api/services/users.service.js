const usersDb = require('../db/users.db');

const getUsers = async () => {
    try {
        const result = await usersDb.getUsers();
        return result;
    } catch (err) {
        throw new Error(err.message);
    }
}

const findUser = async (user) => {
    try {
        const result = await usersDb.findUser(user);
        return result;
    } catch (err) {
        throw new Error(err.message);
    }
}

const createUser = async (newUserInfo, userType, cognitoId) => {
    try {
    //     const result = await usersDb.findUser({email: newUserInfo.email});
        
    //     // if (result != null && result != undefined) {
    //         if (result != null && result.length > 0 && userType === result.userType) {
    //             throw new Error("User already exists");
    //         } else {
                newUser = await usersDb.createUser(newUserInfo, userType, cognitoId);
                return newUser;
            // }
        // }
    } catch (err) {
        throw new Error(err.message);
    }
}

const updateUser = async (updatedUser) => {
    try {
        const result = await usersDb.updateUser(updatedUser);
        return result;
    } catch (err) {
        throw new Error(err.message);
    }
}

const deleteUser = async (deletedUser) => {
    try {
        const result = await usersDb.deleteUser(deletedUser);
        return result;
    } catch (err) {
        throw new Error(err.message);
    }
}

module.exports = {
    getUsers,
    createUser,
    findUser,
    updateUser,
    deleteUser
}