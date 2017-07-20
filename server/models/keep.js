import { models } from '../config/constants'
let mongoose = require('mongoose')
let ObjectId = mongoose.Schema.ObjectId

var schema = new mongoose.Schema({
  title: { type: String, required: true },
  imageURL: { type: String, required: true },
  body: { type: String, required: true },
  tags: [{ type: String }],
  vaults: [{ type: ObjectId, ref: models.vault.name }],
  articleURL: { type: String, required: true },
  created: { type: Number, default: Date.now() },
  creatorId: { type: ObjectId, ref: models.user.name, required: true },
  keepCount: { type: Number, default: 0 },
  shareCount: { type: Number, default: 0 },
  viewCount: { type: Number, default: 0 },
  private: { type: Boolean, default: false }
});

module.exports = mongoose.model(models.keep.name, schema);