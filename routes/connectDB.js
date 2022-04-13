const mongoose = require("mongoose");
// Database connection
mongoose.connect("mongodb://localhost:27017/socialmedia", {
  useNewUrlParser: "true",
  useCreateIndex: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("error", (err) => {
  console.log("err", err);
});
mongoose.connection.on("connected", (err, res) => {
  console.log("mongoose is connected");
});
