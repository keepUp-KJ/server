const userRoutes = require("./src/routes/userRoutes");
const contactRoutes = require("./src/routes/contactRoutes");
const reminderRoutes = require("./src/routes/reminderRoutes");

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(
  "mongodb+srv://admin:jk9998@keepup.wpw8h.mongodb.net/ku?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  }
);
OkxJD6oe4J2RLGd2

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

userRoutes(app);
contactRoutes(app);
reminderRoutes(app);

mongoose.connection.on("connected", () => {
  console.log("Connected to mongo instance");
});

mongoose.connection.on("error", (err) => {
  console.error("Error connecting to mongo\n", err);
});

app.get("/", (req, res) => res.send(`Hello`));

app.listen(process.env.PORT || 3000, () => {
  console.log(`Your server is running`);
});
