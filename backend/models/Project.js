const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {type:String, required:true},
  shortDesc: String,
  fullDesc: String,
  tech: [String],
  liveUrl: String,
  repoUrl: String,
  screenshotUrl: String // optional
}, { timestamps:true });

module.exports = mongoose.model('Project', projectSchema);