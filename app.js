const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const tasks = require("./routes/api/tasks");
const users = require("./routes/api/users");
const auth = require("./routes/api/auth");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS,DELETE");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type, x-auth-token");
//   if (req.method === "OPTIONS") {
//     return res.sendStatus(200);
//   }
//   next();
// });

mongoose
  .connect(
    `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@cluster0-jwfcs.mongodb.net/${MONGO_DB}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }
  )
  .then(() => console.log("MongoDb connected....."))
  .catch((err) => console.log("Cannot connect to db due to " + err));

app.use("/api/tasks", tasks);
app.use("/api/register", users);
app.use("/api/login", auth);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server Started on port ${port}`));
