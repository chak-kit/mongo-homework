userModel = require('../models/user');
articleModel = require('../models/article');

module.exports = {createUser, updateUser, getUserById, deleteById, getArticlesByUser};

async function createUser(req, res, next) {
  const {body} = req;
  console.log(userModel, 'user model');
  try {
    const user = await userModel.create(body);
    return res.json(user)
  } catch (e) {
    next(e)
  }
}

async function updateUser(req, res, next) {
  try {
    let checkUser = await userModel.findOne({_id: req.params.id});
    if (checkUser) {
      const user = await userModel.updateOne({_id: req.params.id}, req.body);
      res.json(user)
    } else {
      throw new Error("User does not exist")
    }
  } catch (e) {
    next(e);
  }
}

async function getUserById(req, res, next) {
  try {
    let checkUser = await userModel.findOne({_id: req.params.id});
    if (checkUser) {
      const user = await userModel.findOne({_id: req.params.id});
      res.json(user)
    } else {
      throw new Error("User does not exist")
    }
  } catch (e) {
    next(e);
  }
}

async function deleteById(req, res, next) {
  try {
    let checkUser = await userModel.findOne({_id: req.params.id});
    if (checkUser) {
      const user = await userModel.deleteOne({_id: req.params.id}, req.body);
      res.json(user)
    } else {
      throw new Error("User does not exist")
    }
  } catch (e) {
    next(e);
  }
}

async function getArticlesByUser(req, res, next) {
  try {
    let checkUser = await articleModel.findOne({owner: req.params.id});
    if (checkUser) {
      const user = await articleModel.find({owner: req.params.id});
      res.json(user)
    } else {
      throw new Error("User does not exist")
    }
  } catch (e) {
    next(e);
  }
}
