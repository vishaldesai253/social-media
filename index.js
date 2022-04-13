const express = require("express");
const app = express();

//connect database
require("./routes/connectDB");

const authSystem = require("./routes/authSystem");
const postRoute = require("./routes/posts");

//middleware
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("Welcome to Social Media API");
});

//for create new user
app.use("/api/authSystem", authSystem);

//Handle all api request [like, comment, comment on like, getlikes of post]
app.use("/api/posts", postRoute);

const PORT = 8080;
app.listen(PORT, () => {
  console.log("social Media server is running on " + PORT + " !");
});
