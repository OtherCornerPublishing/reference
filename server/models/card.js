import { models } from '../config/constants'
let mongoose = require('mongoose')
let ObjectId = mongoose.Schema.ObjectId

var schema = new mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  image: { type: String, required: true },
  type: [{ type: String, required: true }],
  users: [{ type: ObjectId, ref: models.user.name }],
  created: { type: Number, default: Date.now() },
  foundCount: { type: Number, default: 0 },
  pvp: { type: Boolean, default: true },
  value: { type: Number, required: true },
  lifespan: { type: Number},
  action: { type: String },
  cost: { type: String }
});

module.exports = mongoose.model(models.card.name, schema);