const newsDb = require('../db/news.db');

const allNews = async () => {

    try {
        const result = await newsDb.allNews();
        return result;
    } catch (err) {
        throw new Error(err.message);
    }
};

const findNews = async (searchQuery) => {

    try {
        const result = await newsDb.findNews(searchQuery);
        return result;
    } catch (err) {
        throw new Error(err.message);
    }
}

const createNews = async (newNews) => {

    try {
        const result = await newsDb.findNews(newNews);
        if (result != null && result != undefined) {
            if (result.length > 0) {
                throw new Error("News already exists");
            } else {
                newNews = await newsDb.createNews(newNews);
                return newNews;
            }
        }
        throw new Error("Null Result");
    } catch (err) {
        throw new Error(err.message);
    }
};

const updateNews = async (id, updatedNews) => {

    try {
        const result = await newsDb.updateNews(id, updatedNews);
        return result;
    } catch (err) {
        throw new Error(err.message);
    }
};

const deleteNews = async (deletedNews) => {
    try {
        const result = await newsDb.removeNews(deletedNews);
        return result;
    } catch (err) {
        errorHandler(err);
    }
};

module.exports = {
    createNews,
    findNews,
    allNews,
    updateNews,
    deleteNews
};