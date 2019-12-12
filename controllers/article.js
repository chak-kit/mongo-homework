articleModel = require('../models/article');
userModel = require('../models/user');
const url = require('url');

module.exports = {createArticle, updateArticle, getByFilter, deleteArticle};

async function createArticle(req, res, next) {
  const {body} = req;
  try {
    let checkOwner = await userModel.findOne({_id: body.owner});
    if (checkOwner) {
      const article = await articleModel.create(body);
      await userModel.updateOne({_id: body.owner}, {$inc: {numberOfArticles: 1}});
      res.json(article)
    } else {
      throw new Error("Owner does not exist")
    }
  } catch (e) {
    next(e)
  }
}

async function updateArticle(req, res, next) {
  const {body} = req;
  try {
    let checkOwner = await userModel.findOne({_id: body.owner});
    if (!checkOwner) throw new Error("Owner does not exist");
    let checkArticle = await articleModel.findOne({_id: req.params.id});
    if (!checkArticle) throw new Error("Article does not exist");

    const article = await articleModel.updateOne({_id: req.params.id}, req.body);
    res.json(article)
  } catch (e) {
    next(e)
  }
}

async function getByFilter(req, res, next) {
  const url_parts = url.parse(req.url, true);
  const query = url_parts.query;
  try {
    console.log(query);
    const queryObject = {
      [query.filterName]: query.filterValue
    };
    const articles = await articleModel.find(queryObject).populate('owner');
    res.json(articles)
  } catch (e) {
    next(e)
  }
}

async function deleteArticle(req, res, next) {
  const {body} = req;
  try {
    let checkOwner = await userModel.findOne({_id: body.owner});
    if (checkOwner) {
      const article = await articleModel.deleteOne({_id: req.params.id}, req.body);
      await userModel.updateOne({_id: body.owner}, {$inc: {numberOfArticles: -1}});
      res.json(article)
    } else {
      throw new Error("Owner does not exist")
    }
  } catch (e) {
    next(e)
  }
}
