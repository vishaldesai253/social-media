const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
      max: 100,
    },
    content: {
      type: String,
      required: true,
      max: 500,
    },
    images: {
      type: Array,
      default: [],
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    comments: [
      {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Comment",
      },
    ],
    hashtags: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

postSchema.pre("find", function () {
  this.populate("comments");
});

module.exports = mongoose.model("Post", postSchema);
