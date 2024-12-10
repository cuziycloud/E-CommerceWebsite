const express = require('express');
const multer = require('multer');
const path = require('path');
<<<<<<< HEAD
const { addProduct, getProducts } = require('../controllers/productController');
=======
>>>>>>> a8a81ce (Final code)

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../../uploads/');
    console.log('Upload destination path:', uploadPath); // Debug thông tin đường dẫn
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const filename = `${Date.now()}-${file.originalname}`;
    console.log('File name:', filename); // Debug thông tin tên file
    cb(null, filename);
  },
});

const upload = multer({ storage });

<<<<<<< HEAD
// Kiểm tra lại các hàm callback để đảm bảo import đúng
console.log('addProduct:', addProduct);
console.log('getProducts:', getProducts);

router.post('/add-product', upload.array('images', 5), addProduct); // Định nghĩa route thêm sản phẩm
router.get('/list', getProducts); // Định nghĩa route lấy danh sách sản phẩm

module.exports = router;
=======
router.post('/upload', upload.single('image'), (req, res) => {
  console.log('File received:', req.file); // Debug thông tin file nhận được
  if (!req.file) {
    console.log('No file uploaded'); // Debug khi không có file tải lên
    return res.status(400).json({ error: 'No file uploaded' });
  }
  res.status(200).json({ url: `/uploads/${req.file.filename}` });
});

module.exports = router;
>>>>>>> a8a81ce (Final code)
