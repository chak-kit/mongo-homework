const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Types = mongoose.Types;

const ArticleSchema = new Schema({
  title: {type: String, min: 5, max: 400, required: true, index: true},
  subtitle: {type: String, min: 5, required: false},
  description: {type: String, min: 5, max: 5000, required: true},
  owner: {type: Types.ObjectId, ref: 'User', required: true},
  category: {type: String, enum: ['sport', 'games', 'history'], required: true},
  createdAt: {type: Date, default: Date.now()},
  updatedAt: {type: Date, default: Date.now()}
});

module.exports = mongoose.model('Article', ArticleSchema);