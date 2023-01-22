var express = require("express");
var router = express.Router();
const { signup, signin } = require("./controller");
// for upload image
const multer = require("multer");
const os = require("os");


router.post('/signup', multer({ dest: os.tmpdir() }).single("image"), signup);
router.post('/signin', signin);

module.exports = router;
