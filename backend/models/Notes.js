const mongoose = require("mongoose");
const { Schema } = mongooose;

const NotesSchema = new Schema({
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
  },

  tag: {
    type: String,
    default: "General",
  },

  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("notes", NotesSchema);
