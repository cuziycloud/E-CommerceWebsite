const express = require('express');
const multer = require('multer');
const path = require('path');
const {
  addProduct,
  getProducts,
  getProductById,
  getProductsByCategory,
  getProductBySlug,
  deleteProduct,
  updateProduct,
  updateProductBySlug, // Thêm hàm cập nhật sản phẩm theo slug
} = require('../controllers/productController');

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

// Route thêm sản phẩm mới
router.post('/add-product', upload.array('images', 5), addProduct);

// Route lấy sản phẩm theo category
router.get('/category', getProductsByCategory);

// Route lấy sản phẩm theo slug
router.get('/slug/:slug', getProductBySlug);

// Route cập nhật sản phẩm theo slug
router.put('/slug/:slug', updateProductBySlug); // Thêm route cập nhật sản phẩm theo slug

// Route lấy danh sách sản phẩm
router.get('/', getProducts);

// Route lấy thông tin sản phẩm theo ID
router.get('/:id', getProductById);

// Route xóa sản phẩm
router.delete('/:id', deleteProduct);

// Route cập nhật sản phẩm
router.put('/:id', updateProduct);

module.exports = router;
