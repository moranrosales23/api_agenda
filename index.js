const express = require("express");
const connectDB = require("./config/database");
const morgan = require("morgan");

const app = express();

const PORT = process.env.PORT || 3000;
const PERSONS_ROUTE = require("./api/persons");

morgan.token("data", function getId(req) {
  return JSON.stringify(req.body);
});

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :data")
);

app.use(express.json());
app.listen(PORT, () => {
  connectDB();
});

app.use(PERSONS_ROUTE);
