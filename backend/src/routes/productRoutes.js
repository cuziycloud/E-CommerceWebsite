const express = require('express');
const multer = require('multer');
const path = require('path');
const { addProduct, getProducts } = require('../controllers/productController');

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

// Kiểm tra lại các hàm callback để đảm bảo import đúng
console.log('addProduct:', addProduct);
console.log('getProducts:', getProducts);

router.post('/add-product', upload.array('images', 5), addProduct); // Định nghĩa route thêm sản phẩm
router.get('/list', getProducts); // Định nghĩa route lấy danh sách sản phẩm

module.exports = router;
