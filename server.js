const express = require("express");
const multer = require("multer");
const Note = require("./models/Note");

const router = express.Router();

const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.single("file"), async (req, res) => {
  const note = new Note({
    title: req.body.title,
    file: req.file.filename
  });

  await note.save();
  res.json({ message: "Note uploaded successfully" });
});

module.exports = router;
