import express from "express";
import userRoutes from "./src/routes/userRoutes";
import contactRoutes from "./src/routes/contactRoutes";
import reminderRoutes from "./src/routes/reminderRoutes";
import mongoose from "mongoose";
import bodyParser from "body-parser";

const app = express();
const PORT = 3000;

mongoose.Promise = global.Promise;
mongoose.connect(
  "mongodb+srv://admin:jk9998@keepup.wpw8h.mongodb.net/ku?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  }
);

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

app.get("/", (req, res) => res.send(`Server running on ${PORT}`));

app.listen(PORT, () => {
  console.log(`Your server is running on port ${PORT}`);
});
