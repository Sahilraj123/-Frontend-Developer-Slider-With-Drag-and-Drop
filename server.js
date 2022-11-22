const express = require("express");
const multer = require("multer");
const fs = require("fs");

// constant
const app = express();
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    const dir = "uploads/";
    !fs.existsSync(dir) && fs.mkdirSync(dir);
    callback(null, "uploads/");
  },
  filename: (req, file, callback) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    let ext = file.originalname.lastIndexOf(".");
    ext = file.originalname.substr(ext + 1);
    callback(null, `${file.fieldname}-${uniqueSuffix}.${ext}`);
  },
});
const upload = multer({ storage });

// middleware
app.use(express.json());

// routes
app.post("/upload/single", upload.single("file"), (req, res) => {
  res.json({ file: req.file });
});
app.post("/upload/multiple", upload.array("file", 4), (req, res) => {
  res.json({ files: req.files });
});

app.listen(5000, () => console.log("App is running on http://localhost:5000"));
