const mongoose = require("mongoose");
const { Schema } = mongoose;

const commentSchema = new Schema(
  {
    comment: {
      type: String,
      required: true,
    },
    author: {
      // To reference the user who left comment
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    likes: {
      type: Array,
      defaut: [],
    }, // Array of comment likes user ids

    parentId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Post",
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Comment", commentSchema);
