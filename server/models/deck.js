import { models } from '../config/constants'
let mongoose = require('mongoose')
let ObjectId = mongoose.Schema.ObjectId

var schema = new mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  creatorId: { type: ObjectId, ref: models.user.name, required: true },
  created: { type: Number, default: Date.now() },
  value: { type: Number }
});

module.exports = mongoose.model(models.deck.name, schema);