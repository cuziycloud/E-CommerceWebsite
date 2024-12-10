import React, { useState } from "react";
import { FiTrash2, FiUpload } from "react-icons/fi";
import { MdPreview } from "react-icons/md";
<<<<<<< HEAD
=======
import slugify from 'slugify';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

>>>>>>> a8a81ce (Final code)

const AddProductForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
<<<<<<< HEAD
    tag: "",
    category: "Laptop",
    isAvailable: false,
    variants: [{ size: "", color: "", material: "", stock: "" }],
    images: []
  });

=======
    category: "",
    tags: "",
    images: [],
    isAvailable: true,
    variants: [
      {
        color: "",
        size: "",
        stock: "",
        specs: [] // Khởi tạo specs là một mảng trống
      },
    ],
    createdAt: new Date().toISOString(),
  });
  
  
>>>>>>> a8a81ce (Final code)
  const [errors, setErrors] = useState({});
  const [isPreview, setIsPreview] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

<<<<<<< HEAD
  // Updated categories array with technology focus
=======
>>>>>>> a8a81ce (Final code)
  const categories = [
    "Laptop",
    "Phone",
    "Tablet",
    "Console",
    "Accessory"
  ];

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "name":
        if (!value) error = "Product name is required";
        break;
      case "price":
        if (!value) error = "Price is required";
        if (isNaN(value)) error = "Price must be a number";
<<<<<<< HEAD
        // Added validation for negative price
        if (Number(value) < 0) error = "Price cannot be negative";
        break;
      case "tag":
=======
        if (Number(value) < 0) error = "Price cannot be negative";
        break;
      case "tags":
>>>>>>> a8a81ce (Final code)
        if (!value) error = "At least one tag is required";
        const tags = value.split(",").map(tag => tag.trim());
        if (tags.some(tag => tag === "")) {
          error = "Invalid tag format";
        }
        break;
      case "stock":
        if (value < 0) error = "Stock cannot be negative";
        break;
      default:
        break;
    }
    return error;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    let fieldValue = type === "checkbox" ? checked : value;
  
<<<<<<< HEAD
    // Chuyển đổi giá trị của trường price thành số
=======
>>>>>>> a8a81ce (Final code)
    if (name === "price") {
      fieldValue = parseFloat(value);
    }
  
    setFormData({ ...formData, [name]: fieldValue });
    const error = validateField(name, fieldValue);
    setErrors({ ...errors, [name]: error });
  };
<<<<<<< HEAD
  
  const handleVariantChange = (index, field, value) => {
    const newVariants = [...formData.variants];
  
    // Chuyển đổi giá trị của trường stock thành số nguyên
    if (field === "stock") {
      newVariants[index][field] = parseInt(value, 10);
=======

  const handleVariantChange = (index, field, value) => {
    const newVariants = [...formData.variants];
  
    if (field === "specs") {
      newVariants[index][field] = value; // Giữ specs như một chuỗi
>>>>>>> a8a81ce (Final code)
    } else {
      newVariants[index][field] = value;
    }
  
    setFormData({ ...formData, variants: newVariants });
  
    if (field === "stock") {
<<<<<<< HEAD
      const error = validateField("stock", newVariants[index][field]);
=======
      const error = validateField("stock", value);
>>>>>>> a8a81ce (Final code)
      if (error) {
        setErrors({ ...errors, [`variant${index}stock`]: error });
      } else {
        const newErrors = { ...errors };
        delete newErrors[`variant${index}stock`];
        setErrors(newErrors);
      }
    }
  };
  
<<<<<<< HEAD

=======
  
  
  
  
  
>>>>>>> a8a81ce (Final code)

  const addVariant = () => {
    setFormData({
      ...formData,
<<<<<<< HEAD
      variants: [...formData.variants, { size: "", color: "", material: "", stock: "" }]
=======
      variants: [...formData.variants, { size: "", color: "", stock: "", specs: [] }]
>>>>>>> a8a81ce (Final code)
    });
  };

  const removeVariant = (index) => {
    if (formData.variants.length === 1) {
      setErrors({ ...errors, variants: "At least one variant is required" });
      return;
    }
    const newVariants = formData.variants.filter((_, i) => i !== index);
    setFormData({ ...formData, variants: newVariants });
  };

  const handleImageUpload = (e) => {
    setIsLoading(true);
    const files = Array.from(e.target.files);
    const imageUrls = [];
  
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = URL.createObjectURL(file);
<<<<<<< HEAD
        imageUrls.push(imageUrl); // Lưu URL tạm thời vào mảng
=======
        imageUrls.push(imageUrl); 
>>>>>>> a8a81ce (Final code)
  
        if (imageUrls.length === files.length) {
          setFormData({ ...formData, images: [...formData.images, ...imageUrls] });
          setIsLoading(false);
        }
      };
      reader.readAsDataURL(file);
    });
  };
<<<<<<< HEAD
  
=======
>>>>>>> a8a81ce (Final code)

  const removeImage = (index) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    setFormData({ ...formData, images: newImages });
  };

<<<<<<< HEAD
=======
  const handleTagsChange = (e) => {
    setFormData({ ...formData, tags: e.target.value });
  };

>>>>>>> a8a81ce (Final code)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
  
<<<<<<< HEAD
    // Debug toàn bộ formData
    console.log('Form data:', formData);
  
=======
>>>>>>> a8a81ce (Final code)
    Object.keys(formData).forEach((key) => {
      if (key !== "variants" && key !== "images" && key !== "isAvailable") {
        const error = validateField(key, formData[key]);
        if (error) newErrors[key] = error;
      }
    });
  
    formData.variants.forEach((variant, index) => {
<<<<<<< HEAD
      console.log(`Variant ${index}:`, variant); // Debug thông tin variant
=======
>>>>>>> a8a81ce (Final code)
      if (!variant.stock || isNaN(variant.stock) || variant.stock < 0) {
        newErrors[`variant${index}stock`] = 'Stock is required and must be a non-negative number';
      }
      if (!variant.color) {
        newErrors[`variant${index}color`] = 'Color is required';
      }
<<<<<<< HEAD
=======
      if (variant.specs && typeof variant.specs === "string") {
        const specsArray = variant.specs.split(",").map(spec => {
          const [label, specValue] = spec.split(":").map(item => item.trim());
          return { label, value: specValue };
        });
        variant.specs = specsArray;
      }
>>>>>>> a8a81ce (Final code)
    });
  
    if (formData.variants.length === 0) {
      newErrors.variants = "At least one variant is required";
    }
  
    if (Object.keys(newErrors).length === 0) {
<<<<<<< HEAD
      formData.price = Number(formData.price);
      formData.stock = formData.variants.reduce((acc, variant) => acc + parseInt(variant.stock, 10), 0); // Tính tổng số stock
      formData.variants = formData.variants.map(variant => ({
        ...variant,
        stock: parseInt(variant.stock, 10) // Đảm bảo stock là số nguyên
=======
      formData.price = parseFloat(formData.price);
      formData.stock = formData.variants.reduce((acc, variant) => acc + parseInt(variant.stock, 10), 0);
      formData.variants = formData.variants.map(variant => ({
        ...variant,
        stock: parseInt(variant.stock, 10)
>>>>>>> a8a81ce (Final code)
      }));
  
      formData.isActive = formData.isAvailable;
      delete formData.isAvailable;
  
<<<<<<< HEAD
      // Debug dữ liệu trước khi tải lên ảnh
      console.log('Form data before uploading images:', formData);
  
      // Tải lên ảnh và lấy URL
=======
      const slug = slugify(formData.name, { lower: true, strict: true });
      formData.slug = slug;
  
>>>>>>> a8a81ce (Final code)
      const uploadedImageUrls = [];
      for (const imageUrl of formData.images) {
        if (imageUrl.startsWith('blob:')) {
          const response = await fetch(imageUrl);
          const blob = await response.blob();
          const formDataImage = new FormData();
<<<<<<< HEAD
          formDataImage.append('image', blob, `${Date.now()}.png`); // Đặt tên file để tránh blob
=======
          formDataImage.append('image', blob, `${Date.now()}.png`);
>>>>>>> a8a81ce (Final code)
  
          try {
            const uploadResponse = await fetch('http://localhost:5000/api/uploads/upload', {
              method: 'POST',
              body: formDataImage
            });
            if (uploadResponse.ok) {
              const data = await uploadResponse.json();
<<<<<<< HEAD
              console.log('Uploaded image URL:', data.url); // Debug URL ảnh đã tải lên
=======
>>>>>>> a8a81ce (Final code)
              uploadedImageUrls.push(data.url);
            } else {
              console.error('Error uploading image:', uploadResponse.statusText);
            }
          } catch (error) {
            console.error('Error uploading image:', error);
          }
        } else {
<<<<<<< HEAD
          uploadedImageUrls.push(imageUrl); // Nếu là URL trực tiếp từ máy tính người dùng
=======
          uploadedImageUrls.push(imageUrl);
>>>>>>> a8a81ce (Final code)
        }
      }
  
      const productData = { ...formData, images: uploadedImageUrls };
<<<<<<< HEAD
  
      try {
        console.log('Sending data:', productData);
=======
      productData.tags = formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== "");
  
      try {
>>>>>>> a8a81ce (Final code)
        const response = await fetch('http://localhost:5000/api/products/add-product', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(productData),
        });
  
        if (response.ok) {
          const result = await response.json();
          console.log('Form submitted:', result);
<<<<<<< HEAD
=======
          toast.success('Product added successfully!');
  
          // Reload trang sau khi thông báo thành công
          setTimeout(() => {
            window.location.reload();
          }, 2000); // Đợi 2 giây để hiển thị toast trước khi reload trang
>>>>>>> a8a81ce (Final code)
        } else {
          const errorResponse = await response.json();
          console.error('Error submitting form:', errorResponse.error);
        }
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    } else {
      setErrors(newErrors);
    }
  };
  
  
  
<<<<<<< HEAD

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
=======
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 mt-12">
      <ToastContainer />
>>>>>>> a8a81ce (Final code)
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-xl rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Add New Product</h2>
            <button
              type="button"
              onClick={() => setIsPreview(!isPreview)}
              className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
            >
              <MdPreview className="mr-2" />
              {isPreview ? "Edit" : "Preview"}
            </button>
          </div>

          {isPreview ? (
            <div className="space-y-4">
              <PreviewSection formData={formData} />
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${errors.name ? "border-red-500" : ""}`}
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                </div>

                <div>
<<<<<<< HEAD
                  <label htmlFor="tag" className="block text-sm font-medium text-gray-700">
=======
                  <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
>>>>>>> a8a81ce (Final code)
                    Tags * (comma-separated)
                  </label>
                  <input
                    type="text"
<<<<<<< HEAD
                    id="tag"
                    name="tag"
                    value={formData.tag}
                    onChange={handleInputChange}
                    placeholder="tag1, tag2, tag3"
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${errors.tag ? "border-red-500" : ""}`}
                  />
                  {errors.tag && <p className="mt-1 text-sm text-red-500">{errors.tag}</p>}
=======
                    id="tags"
                    name="tags"
                    value={formData.tags}
                    onChange={handleTagsChange}
                    placeholder="tag1, tag2, tag3"
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${errors.tags ? "border-red-500" : ""}`}
                  />
                  {errors.tags && <p className="mt-1 text-sm text-red-500">{errors.tags}</p>}
>>>>>>> a8a81ce (Final code)
                  <p className="mt-1 text-xs text-gray-500">Enter multiple tags separated by commas</p>
                </div>

                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                    Category *
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  >
<<<<<<< HEAD
=======
                    <option value="">Select a category</option>
>>>>>>> a8a81ce (Final code)
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
<<<<<<< HEAD
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                    Price *
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${errors.price ? "border-red-500" : ""}`}
                  />
                  {errors.price && <p className="mt-1 text-sm text-red-500">{errors.price}</p>}
                </div>

=======
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                      Price *
                    </label>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      step="0.01" // Thêm thuộc tính này để cho phép số thực
                      className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${errors.price ? "border-red-500" : ""}`}
                    />
                    {errors.price && <p className="mt-1 text-sm text-red-500">{errors.price}</p>}
                  </div>                                    
>>>>>>> a8a81ce (Final code)
                <div className="col-span-2">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows="4"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>

                <div className="col-span-2">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="isAvailable"
                      name="isAvailable"
                      checked={formData.isAvailable}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="isAvailable" className="ml-2 block text-sm text-gray-700">
                      Product is available for sale
                    </label>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium text-gray-900">Product Variants</h3>
                  <button
                    type="button"
                    onClick={addVariant}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                  >
                    Add Variant
                  </button>
                </div>

                {errors.variants && (
                  <p className="text-sm text-red-500">{errors.variants}</p>
                )}

                {formData.variants.map((variant, index) => (
<<<<<<< HEAD
                  <div key={index} className="flex gap-4 items-start">
                    <div className="flex-1">
                      <input
                        type="text"
                        placeholder="Size"
                        value={variant.size}
                        onChange={(e) => handleVariantChange(index, "size", e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                    </div>
                    <div className="flex-1">
                      <input
                        type="text"
                        placeholder="Color"
                        value={variant.color}
                        onChange={(e) => handleVariantChange(index, "color", e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                    </div>
                    <div className="flex-1">
                      <input
                        type="text"
                        placeholder="Material"
                        value={variant.material}
                        onChange={(e) => handleVariantChange(index, "material", e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                    </div>
                    <div className="flex-1">
                      <input
                        type="number"
                        placeholder="Stock"
                        value={variant.stock}
                        min="0"
                        onChange={(e) => handleVariantChange(index, "stock", e.target.value)}
                        className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${errors[`variant${index}stock`] ? "border-red-500" : ""}`}
                      />
                      {errors[`variant${index}stock`] && (
                        <p className="mt-1 text-sm text-red-500">{errors[`variant${index}stock`]}</p>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => removeVariant(index)}
                      className="mt-1 p-2 text-red-600 hover:text-red-800"
=======
                  <div key={index} className="space-y-4 p-4 border rounded-lg">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <input
                          type="text"
                          placeholder="Size"
                          value={variant.size}
                          onChange={(e) => handleVariantChange(index, "size", e.target.value)}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          placeholder="Color"
                          value={variant.color}
                          onChange={(e) => handleVariantChange(index, "color", e.target.value)}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                      </div>
                      <div>
                        <input
                          type="number"
                          placeholder="Stock"
                          value={variant.stock}
                          min="0"
                          onChange={(e) => handleVariantChange(index, "stock", e.target.value)}
                          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${errors[`variant${index}stock`] ? "border-red-500" : ""}`}
                        />
                        {errors[`variant${index}stock`] && (
                          <p className="mt-1 text-sm text-red-500">{errors[`variant${index}stock`]}</p>
                        )}
                      </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Specifications (comma-separated)
                        </label>
                        <textarea
                          placeholder="e.g., CPU: Intel i7, RAM: 16GB, Storage: 512GB SSD"
                          value={variant.specs || ""}  // Đảm bảo `specs` là chuỗi
                          onChange={(e) => handleVariantChange(index, "specs", e.target.value)}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                          rows="3"
                        />
                      </div>



                    <button
                      type="button"
                      onClick={() => removeVariant(index)}
                      className="mt-2 p-2 text-red-600 hover:text-red-800"
>>>>>>> a8a81ce (Final code)
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                ))}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Product Images</label>
                <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="images"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                      >
                        <span>Upload files</span>
                        <input
                          id="images"
                          type="file"
                          multiple
                          className="sr-only"
                          onChange={handleImageUpload}
                          accept="image/*"
                        />
                      </label>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                  </div>
                </div>

                {isLoading && (
                  <div className="mt-4 flex justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                  </div>
                )}

                <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                  {formData.images.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={image}
                        alt={`Product ${index + 1}`}
                        className="h-45 w-50 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-0 right-0 -mt-2 -mr-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-700"
                      >
                        <FiTrash2 size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4">
                <button
<<<<<<< HEAD
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                >
                  Save Product
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

const PreviewSection = ({ formData }) => {
  const tags = formData.tag.split(",").map(tag => tag.trim()).filter(tag => tag !== "");

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900">Product Details</h3>
        <dl className="mt-2 divide-y divide-gray-200">
          <div className="py-3 flex justify-between">
            <dt className="text-sm font-medium text-gray-500">Name</dt>
            <dd className="text-sm text-gray-900">{formData.name}</dd>
          </div>
          <div className="py-3 flex justify-between">
            <dt className="text-sm font-medium text-gray-500">Category</dt>
            <dd className="text-sm text-gray-900">{formData.category}</dd>
          </div>
          <div className="py-3 flex justify-between">
            <dt className="text-sm font-medium text-gray-500">Price</dt>
            <dd className="text-sm text-gray-900">${formData.price}</dd>
          </div>
          <div className="py-3">
            <dt className="text-sm font-medium text-gray-500">Tags</dt>
            <dd className="mt-1 text-sm text-gray-900">
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </dd>
          </div>
          <div className="py-3 flex justify-between">
            <dt className="text-sm font-medium text-gray-500">Availability</dt>
            <dd className="text-sm text-gray-900">
              {formData.isAvailable ? "Available" : "Not Available"}
            </dd>
          </div>
          <div className="py-3">
            <dt className="text-sm font-medium text-gray-500">Description</dt>
            <dd className="mt-1 text-sm text-gray-900">{formData.description}</dd>
          </div>
        </dl>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900">Variants</h3>
        <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {formData.variants.map((variant, index) => (
            <div
              key={index}
              className="border rounded-lg p-4 bg-gray-50"
            >
              <dl className="divide-y divide-gray-200">
                <div className="py-2 flex justify-between">
                  <dt className="text-sm font-medium text-gray-500">Size</dt>
                  <dd className="text-sm text-gray-900">{variant.size}</dd>
                </div>
                <div className="py-2 flex justify-between">
                  <dt className="text-sm font-medium text-gray-500">Color</dt>
                  <dd className="text-sm text-gray-900">{variant.color}</dd>
                </div>
                <div className="py-2 flex justify-between">
                  <dt className="text-sm font-medium text-gray-500">Material</dt>
                  <dd className="text-sm text-gray-900">{variant.material}</dd>
                </div>
                <div className="py-2 flex justify-between">
                  <dt className="text-sm font-medium text-gray-500">Stock</dt>
                  <dd className="text-sm text-gray-900">{variant.stock}</dd>
                </div>
              </dl>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900">Product Images</h3>
        <div className="mt-2 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {formData.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Product ${index + 1}`}
              className="h-45 w-50 object-cover rounded-lg"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddProductForm;
=======
                                    type="submit"
                                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                                  >
                                    Save Product
                                  </button>
                                </div>
                              </form>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  };
                  
                  

                  const PreviewSection = ({ formData }) => {
                    const tags = formData.tags.split(",").map(tag => tag.trim()).filter(tag => tag !== "");
                  
                    return (
                      <div className="space-y-6">
                        {/* Thông tin sản phẩm chính */}
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">Product Details</h3>
                          <dl className="mt-2 divide-y divide-gray-200">
                            <div className="py-3 flex justify-between">
                              <dt className="text-sm font-medium text-gray-500">Name</dt>
                              <dd className="text-sm text-gray-900">{formData.name}</dd>
                            </div>
                            <div className="py-3 flex justify-between">
                              <dt className="text-sm font-medium text-gray-500">Category</dt>
                              <dd className="text-sm text-gray-900">{formData.category}</dd>
                            </div>
                            <div className="py-3 flex justify-between">
                              <dt className="text-sm font-medium text-gray-500">Price</dt>
                              <dd className="text-sm text-gray-900">${formData.price}</dd>
                            </div>
                            <div className="py-3">
                              <dt className="text-sm font-medium text-gray-500">Tags</dt>
                              <dd className="mt-1 text-sm text-gray-900">
                                <div className="flex flex-wrap gap-2">
                                  {tags.map((tag, index) => (
                                    <span
                                      key={index}
                                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                                    >
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              </dd>
                            </div>
                            <div className="py-3 flex justify-between">
                              <dt className="text-sm font-medium text-gray-500">Availability</dt>
                              <dd className="text-sm text-gray-900">
                                {formData.isAvailable ? "Available" : "Not Available"}
                              </dd>
                            </div>
                            <div className="py-3">
                              <dt className="text-sm font-medium text-gray-500">Description</dt>
                              <dd className="mt-1 text-sm text-gray-900">{formData.description}</dd>
                            </div>
                          </dl>
                        </div>
                  
                        {/* Thông tin variants */}
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">Variants</h3>
                          <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2">
                            {formData.variants.map((variant, index) => (
                              <div key={index} className="border rounded-lg p-4 bg-gray-50">
                                <dl className="divide-y divide-gray-200">
                                  <div className="py-2 flex justify-between">
                                    <dt className="text-sm font-medium text-gray-500">Size</dt>
                                    <dd className="text-sm text-gray-900">{variant.size}</dd>
                                  </div>
                                  <div className="py-2 flex justify-between">
                                    <dt className="text-sm font-medium text-gray-500">Color</dt>
                                    <dd className="text-sm text-gray-900">{variant.color}</dd>
                                  </div>
                                  <div className="py-2 flex justify-between">
                                    <dt className="text-sm font-medium text-gray-500">Stock</dt>
                                    <dd className="text-sm text-gray-900">{variant.stock}</dd>
                                  </div>
                                  <div className="py-2">
                                    <dt className="text-sm font-medium text-gray-500">Specifications</dt>
                                    <dd className="mt-1 text-sm text-gray-900">
                                      <ul className="list-disc pl-5 text-left"> {/* Căn trái ở đây */}
                                        {/* Kiểm tra variant.specs trước khi gọi split */}
                                        {variant.specs && typeof variant.specs === 'string' ? (
                                          variant.specs.split(",").map((spec, i) => (
                                            <li key={i}>{spec.trim()}</li>
                                          ))
                                        ) : (
                                          <li>No specifications provided</li>
                                        )}
                                      </ul>
                                    </dd>
                                  </div>
                                </dl>
                              </div>
                            ))}
                          </div>
                        </div>
                  
                        {/* Thông tin ảnh */}
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">Product Images</h3>
                          <div className="mt-2 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                            {formData.images.map((image, index) => (
                              <img
                                key={index}
                                src={image}
                                alt={`Product ${index + 1}`}
                                className="h-45 w-50 object-cover rounded-lg"
                              />
                            ))}
                           
                          </div>
                        </div>
                      </div>
                    );
                  };



                  
                  
                  
export default AddProductForm;
                  
>>>>>>> a8a81ce (Final code)
