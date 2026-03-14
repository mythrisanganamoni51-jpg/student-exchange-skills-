const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

const uploadPath = path.join("public", "uploads");

// multer setup
const storage = multer.diskStorage({
destination: function (req, file, cb) {
cb(null, uploadPath);
},
filename: function (req, file, cb) {
cb(null, file.originalname);
}
});

const upload = multer({ storage });

// upload route
app.post("/upload", upload.single("file"), (req, res) => {

if (!req.file) {
return res.send("Upload failed");
}

res.send("File uploaded successfully!");

});

// list files
app.get("/files", (req, res) => {

fs.readdir(uploadPath, (err, files) => {

if (err) {
return res.json([]);
}

res.json(files);

});

});

// serve uploads
app.use("/uploads", express.static(uploadPath));

// serve website
app.use(express.static("public"));

// start server
app.listen(PORT, () => {
console.log("Server running at http://localhost:3000");
});
