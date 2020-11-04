
const newsService = require('../services/news.service');

const errorHandler = (err, res) => {
  console.log(err.message);
  return res.status(500).send({ message: err.message });
};

const allNews = async (req, res) => {

  try {
    const reuslt = await newsService.allNews();
    res.status(200).send(reuslt);
  } catch (err) {
    errorHandler(err, res);
  }
};

const findNews = async (req, res) => {
  let searchQuery = req.query;

  try {
    const reuslt = await newsService.findNews(searchQuery);
    res.status(200).send(reuslt);
  } catch (err) {
    errorHandler(err, res);
  }
};

const createNews = async (req, res) => {
  let newNews = req.body.newNews;

  try {
    const reuslt = await newsService.createNews(newNews);
    res.status(200).send(reuslt);
  } catch (err) {
    errorHandler(err, res);
  }
};

const updateNews = async (req, res) =>{
  let updatedNews = req.body.updatedNews;
  const id = req.body._id
  
  try {
    const reuslt = await newsService.updateNews(id, updatedNews);
    res.status(200).send(reuslt);
  } catch (err) {
    errorHandler(err,res);
  }
};

const removeNews = async (req, res) => {
  let removedNews = req.body.removedNews;
  
  try {
    const reuslt = await newsService.removeNews(removedNews);
    res.status(200).send(reuslt);
  } catch (err) {
    errorHandler(err,res);
  }
};

module.exports = {
  allNews,
  createNews,
  findNews,
  updateNews,
  removeNews
}