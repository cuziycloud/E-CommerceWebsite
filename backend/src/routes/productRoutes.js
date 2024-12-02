const express = require('express');
const multer = require('multer');
const path = require('path');
const { addProduct, getProducts, getProductById, getProductsByCategory, deleteProduct, updateProduct } = require('../controllers/productController');

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

router.post('/add-product', upload.array('images', 5), addProduct);
router.get('/category', getProductsByCategory); // Định nghĩa route lấy sản phẩm theo category, đưa lên trên
router.get('/', getProducts); // Định nghĩa route lấy danh sách sản phẩm
router.get('/:id', getProductById); // Định nghĩa route lấy thông tin sản phẩm theo ID
router.delete('/:id', deleteProduct); // Định nghĩa route xóa sản phẩm
router.put('/:id', updateProduct); // Định nghĩa route cập nhật sản phẩm

module.exports = router;
