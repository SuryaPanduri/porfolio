const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    shortDescription: { type: String, required: true },
    longDescription: String,
    techStack: [String],

    featured: {
      type: Boolean,
      default: false,
    },

    githubUrl: String,
    liveUrl: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);