var mongoose = require('mongoose');
var News = mongoose.model('News');

const allNews = async () => {
    try {
        const result = News.find().exec();
        return result;
    } catch (err) {
        throw new Error(err.message);
    }
}

const findNews = async (searchQuery) => {

    try {
        const result = await News.find(
            searchQuery
        ).
            exec();

        return result;
    } catch (err) {
        throw new Error(err.message);
    }
};

const createNews = async (news) => {
    let createdNews = new News(news);
    createdNews._id = new mongoose.Types.ObjectId();
    createdNews.creationDate = new Date();
    createdNews.lastEditDate = new Date();

    try {
        const newNews = await createdNews.save();
        return newNews;
    } catch (err) {
        throw new Error(err.message);
    }
}

const updateNews = async (id, updatedNews) => {

    updatedNews.lastEditDate = new Date();

    try {
        const result = await News.findByIdAndUpdate(
            { "_id": id },
            updatedNews,
            { new: true }
        ).exec();
        return result;
    } catch (err) {
        throw new Error(err.message);
    }
}

const removeNews = async (news) => {
    try {
        const result = await News.findByIdAndRemove(
            { "_id": news._id }
        ).exec();
        return result;
    } catch (err) {
        throw new Error(err.message);
    }
}

module.exports = {
    allNews,
    findNews,
    createNews,
    removeNews,
    updateNews
}