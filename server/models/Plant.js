const { Schema } = require("mongoose");

const plantSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },

  description: {
    type: String,
    required: true,
    unique: true,
  },
  plantType:{
    type: String,
    required: true,

  },

  dateAquired: {
    type: Number,
    required: true
  },

  waterReq: {
    type: String,
    required: true,
    unique: true,
  },
  lightReq: {
    type: String,
    required: true,
  },
  careLevel: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
 fertilize: {
    type: String,
    required: true,
    
  },
});

// const Plant = model("Plant", plantSchema);

module.exports = plantSchema;
