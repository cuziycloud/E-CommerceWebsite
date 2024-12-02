const Product = require('../models/Product');

// Thêm sản phẩm mới
exports.addProduct = async (req, res) => {
  const { name, description, price, category, tags, variants, stock, isActive, images } = req.body;
  console.log('Request body:', req.body); // Debug thông tin body của request

  let uploadedImages = [];
  if (req.files && req.files.length > 0) {
    uploadedImages = req.files.map(file => `/uploads/${file.filename}`);
    console.log('Uploaded images:', uploadedImages); // Debug thông tin images
  } else {
    console.log('No files uploaded'); // Debug khi không có files tải lên
  }

  console.log('Variants:', variants); // Debug thông tin variants
  console.log('Tags:', tags); // Debug thông tin tags

  try {
    const newProduct = new Product({
      name,
      description,
      price,
      category,
      tags, // Thêm tags vào đây
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
    res.status(400).json({ success: false, message: 'Lỗi khi thêm sản phẩm', error: error.message });
  }
};

// Lấy danh sách sản phẩm
exports.getProducts = async (req, res) => {
  console.log('Fetching products');
  try {
    const products = await Product.find();
    const updatedProducts = products.map(product => {
      let status;
      if (!product.isAvailable) {
        status = 'Unavailable';
      } else if (product.stock < 10) {
        status = 'Low Stock';
      } else {
        status = 'Available';
      }
      return { ...product._doc, status };
    });
    console.log('Products:', updatedProducts);
    res.status(200).json({ success: true, products: updatedProducts });
  } catch (error) {
    console.log('Error fetching products:', error);
    res.status(500).json({ success: false, message: 'Không thể lấy danh sách sản phẩm', error: error.message });
  }
};

// Lấy thông tin sản phẩm theo ID
exports.getProductById = async (req, res) => {
  const { id } = req.params;
  console.log('Fetching product by ID:', id); // Debug ID sản phẩm cần lấy
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    console.log('Product found:', product); // Debug thông tin sản phẩm tìm thấy
    res.status(200).json({ success: true, product });
  } catch (error) {
    console.log('Error fetching product by ID:', error); // Debug khi có lỗi
    res.status(500).json({ success: false, message: 'Error fetching product', error: error.message });
  }
};

// Lấy sản phẩm theo category
exports.getProductsByCategory = async (req, res) => {
  const { category } = req.query;
  console.log('Category query:', category); // Debug category query
  try {
    const products = await Product.find({ category: category }, 'name price images'); // Chỉ lấy các trường cần thiết
    console.log('Products found:', products); // Debug sản phẩm tìm thấy
    res.status(200).json({ success: true, products });
  } catch (error) {
    console.log('Error fetching products by category:', error); // Debug khi có lỗi
    res.status(500).json({ success: false, message: 'Failed to fetch products', error: error.message });
  }
};





// Xóa sản phẩm
exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  console.log('Deleting product ID:', id); // Debug thông tin ID sản phẩm cần xóa

  try {
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    console.log('Product deleted:', product); // Debug thông tin sản phẩm sau khi xóa
    res.status(200).json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    console.log('Error deleting product:', error); // Debug khi có lỗi
    res.status(500).json({ success: false, message: 'Cannot delete product', error: error.message });
  }
};

// Cập nhật sản phẩm
exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, category, tags, variants, stock, images, isAvailable } = req.body;
  console.log('Updating product ID:', id); // Debug thông tin ID sản phẩm cần cập nhật
  console.log('Data received:', req.body); // Debug thông tin body của request

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, {
      name,
      description,
      price,
      category,
      tags,
      variants,
      stock,
      images,
      isAvailable
    }, { new: true });

    if (!updatedProduct) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    console.log('Product updated:', updatedProduct); // Debug thông tin sản phẩm sau khi cập nhật
    res.status(200).json({ success: true, message: 'Product updated successfully', product: updatedProduct });
  } catch (error) {
    console.log('Error updating product:', error); // Debug khi có lỗi
    res.status(500).json({ success: false, message: 'Cannot update product', error: error.message });
  }
};
