const mongoose = require("mongoose");
const problemSchema = new mongoose.Schema({
    problem:  String,
    Description: String  
  });
  const Problem = mongoose.model('Problem', problemSchema);
   module.exports = Problem;
