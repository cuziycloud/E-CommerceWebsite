const Product = require('../models/Product');

// Thêm sản phẩm mới
exports.addProduct = async (req, res) => {
  const { name, description, price, category, variants, stock, isActive, images } = req.body;
  console.log('Request body:', req.body); // Debug thông tin body của request

  let uploadedImages = [];
  if (req.files && req.files.length > 0) {
    uploadedImages = req.files.map(file => `/uploads/${file.filename}`);
    console.log('Uploaded images:', uploadedImages); // Debug thông tin images
  } else {
    console.log('No files uploaded'); // Debug khi không có files tải lên
  }

  console.log('Variants:', variants); // Debug thông tin variants

  // Debug từng variant và các trường bắt buộc
  variants.forEach((variant, index) => {
    console.log(`Backend Variant ${index}:`, variant);
    console.log(`Backend Variant ${index} stock is:`, variant.stock); // Debug giá trị stock
    console.log(`Backend Variant ${index} color is:`, variant.color); // Debug giá trị color
    console.log(`Backend Variant ${index} size is:`, variant.size); // Debug giá trị size
  });

  try {
    const newProduct = new Product({
      name,
      description,
      price,
      category,
      variants, // Đảm bảo variants được cấu trúc đúng
      stock,
      images: uploadedImages.length ? uploadedImages : images, // Đảm bảo images được lưu trữ đúng
      isAvailable: isActive
    });

    console.log('New Product:', newProduct); // Debug thông tin sản phẩm trước khi lưu

    await newProduct.save();
    console.log('Product saved:', newProduct); // Debug thông tin sản phẩm sau khi lưu
    res.status(201).json({ success: true, message: 'Sản phẩm đã được thêm thành công!', product: newProduct });
  } catch (error) {
    console.log('Error saving product:', error); // Debug khi có lỗi
    console.log('Error details:', error.errInfo ? error.errInfo.details : error); // Debug chi tiết lỗi
    res.status(400).json({ success: false, message: 'Lỗi khi thêm sản phẩm', error: error.message });
  }
};

// Lấy danh sách sản phẩm
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    console.log('Products:', products); // Debug thông tin danh sách sản phẩm
    res.status(200).json({ success: true, products });
  } catch (error) {
    console.log('Error fetching products:', error); // Debug khi có lỗi
    res.status(500).json({ success: false, message: 'Không thể lấy danh sách sản phẩm', error: error.message });
  }
};
