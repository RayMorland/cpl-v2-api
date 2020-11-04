var mongoose = require('mongoose');
var User = mongoose.model('User');

const getUsers = async () => {

    try {
        const users = await User.find().exec();
        return users;
    } catch (err) {
        throw new Error(err);
    }
};

const findUser = async (user) => {
    console.log(user);
    try {
        const result = await User.findOne(
            user
        ).
            exec();
            console.log(result);
        return result;
    } catch (err) {
        throw new Error(err.message);
    }
};

const createUser = async (newUserInfo, userType, cognitoId) => {
    var user = new User();
    user._id = new mongoose.Types.ObjectId();
    user.creationDate = new Date();
    user.lastEditDate = new Date();
    user.userType = userType;
    user.cognitoId = cognitoId;
    user.status = "onboarding";
    user.email = newUserInfo.email;
    
    if ( userType === "member") {
        user.name = newUserInfo.personal.firstName + ' ' + newUserInfo.personal.lastName;
    } else if (userType === "coordinator"){
        user.name = newUserInfo.name;
    }
    
    // user.setPassword(newUserInfo.password);
    // var token;
    // token = user.generateJwt();

    console.log(user);

    try {
        const newUser = await user.save();
        return {
            newUser: newUser,
            // token: token
        }
    } catch (err) {
        throw new Error(err.message);
    }
};

const updateUser = async (updatedUser) => {
    try {
        const user = await User.findOneAndUpdate(
            { _id: updatedUser._id },
            updatedUser,
            { new: true }
        ).
            exec();
        return user;
    } catch (err) {
        throw new Error(err);
    }
};

const deleteUser = async (deletedUser) => {
    try {
        const user = await User.findByIdAndRemove(
            { _id: deletedUser },
        ).
            exec();
        return user;
    } catch (err) {
        throw new Error(err);
    }
};

module.exports = {
    getUsers,
    findUser,
    createUser,
    updateUser,
    deleteUser
}