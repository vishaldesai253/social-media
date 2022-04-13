const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      min: 3,
      max: 20,
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
      max: 30,
    },
    lastName: {
      type: String,
      default: "",
      max: 30,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    mobileNumber: {
      type: Number,
      min: 9,
      max: 10,
      match: [
        /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/,
        "Please fill a valid mobile number",
      ],
    },
    profilePicture: {
      type: String,
      default: "",
    },
    followers: {
      type: Array,
      default: [],
    },
    followings: {
      type: Array,
      default: [],
    },
    activity: {
      type: [
        {
          category: String,
          referenceId: Schema.Types.ObjectId,
          parentId: Schema.Types.ObjectId,
        },
      ],
      default: [],
    },
    about: {
      type: String,
      max: 50,
    },
    location: {
      type: String,
      max: 50,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
