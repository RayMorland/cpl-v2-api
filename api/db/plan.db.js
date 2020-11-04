var mongoose = require('mongoose');
var Plan = mongoose.model('Plan');

const allPlans = async () => {
    try {
        const result = await Plan.find().exec();
        return result;
    } catch (err) {
        throw new Error(err.message);
    }
};

const findPlan = async (searchQuery) => {

    try {
        const result = await Plan.find(
            searchQuery
        ).
            exec();

        return result;
    } catch (err) {
        throw new Error(err.message);
    }
};

const createPlan = async (membershipId, newPlan) => {
    let plan = new Plan(newPlan);
    plan._id = new mongoose.Types.ObjectId();
    plan.creationDate = new Date();
    plan.lastEditDate = new Date();
    plan.membershipId = membershipId;

    try {
        const result = await plan.save();
        return result;
    } catch (err) {
        throw new Error(err.message);
    }
};

const removePlan = async (plan) => {
    try {
        const result = await Plan.findByIdAndRemove(
            { "_id": plan._id }
        ).exec();
        return result;
    } catch (err) {
        throw new Error(err.message);
    }
};

const updatePlan = async (id, updatedPlan) => {

    updatedPlan.lastEditDate = new Date();

    try {
        const result = await Plan.findByIdAndUpdate(
            { "_id": id },
            updatedPlan,
            { new: true }
        ).exec();

        return result;
    } catch (err) {
        throw new Error(err.message);
    }
};

const membersWithPlan = async (membership) => {

    try {
        const result = await Plan.
            findOne({ _id: membership }).
            populate('members').
            exec((err, membership) => {
                if (err) {
                    errorHandler(err, res);
                }
                res.status(200).send(membership);
            });
            return result;
    } catch (err) {
        throw new Error(err.message);
    }
};

module.exports = {
    allPlans,
    findPlan,
    createPlan,
    removePlan,
    updatePlan,
    membersWithPlan
}