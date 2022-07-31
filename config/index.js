const dotenv = require("dotenv");
dotenv.config();
// inisialisasi config upload image dengan multer
const path = require("path");

module.exports = {
  rootPath: path.resolve(__dirname, ".."),
  serviceName: process.env.SERVICE_NAME,
  urlDb: process.env.MONGO_URL,
};
