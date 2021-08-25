const mongoose = require("mongoose");
const express = require("express");

const url = "mongodb+srv://digvijay1:Netflix1!@cluster0.0f1og.mongodb.net/makkaj?retryWrites=true&w=majority";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose.connect(url || "mongodb://localhost/makkaj", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const db = mongoose.connection;
db.once("open", (_) => {
  console.log("Database connected:", url);
});

db.on("error", (err) => {
  console.error("connection error:", err);
});
