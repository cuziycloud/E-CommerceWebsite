const express = require('express');
const multer = require('multer');
const path = require('path');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../../uploads/');

    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const filename = `${Date.now()}-${file.originalname}`;

    cb(null, filename);
  },
});

const upload = multer({ storage });

router.post('/upload', upload.single('image'), (req, res) => {

  if (!req.file) {

    return res.status(400).json({ error: 'No file uploaded' });
  }
  res.status(200).json({ url: `/uploads/${req.file.filename}` });
});

module.exports = router;
