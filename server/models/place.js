import { models } from '../config/constants'
let mongoose = require('mongoose')
let ObjectId = mongoose.Schema.ObjectId

var schema = new mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  image: { type: String, required: true },
  created: { type: Number, default: Date.now() }
});

module.exports = mongoose.model(models.place.name, schema);