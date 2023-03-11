const mongoose = require("mongoose");

const Post = mongoose.model(
  "Post",
  new mongoose.Schema(
    {
      title: String,
      body: String,      
    },
    {
      timestamps: true,
    }
  )
);

module.exports = Post;
