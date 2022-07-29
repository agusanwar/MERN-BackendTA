const mongoose = require("mongoose");
const { urlDb } = require("../config");

mongoose
  .connect(urlDb, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
  })
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

const db = mongoose.connection;

module.exports = db;
