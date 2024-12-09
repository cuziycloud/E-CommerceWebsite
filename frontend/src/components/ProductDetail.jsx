import React, { useEffect, useState } from 'react';
import { FiSearch, FiShoppingCart, FiUser, FiStar, FiChevronDown, FiPlus, FiMinus, FiArrowLeft, FiArrowRight, FiMaximize2, FiX } from "react-icons/fi";
import { FaFacebook, FaInstagram, FaTwitter, FaGoogle } from "react-icons/fa";
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';


const ProductDetail = ({ onAddToCart }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedTab, setSelectedTab] = useState("description");
  const [showZoomModal, setShowZoomModal] = useState(false);
  const { slug } = useParams();
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: 0,
    oldPrice: 0,
    rating: 0,
    reviewCount: 0,
    tags: [],
    images: [],
    specs: [], // Đảm bảo `specs` được khởi tạo
    reviews: [],
    stock: 0, // Thêm stock để kiểm tra số lượng tồn kho
  });
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/slug/${slug}`);
        const productData = response.data.product;
  
        // Chuyển đổi `specs` từ đối tượng thành chuỗi
        const updatedVariants = productData.variants.map(variant => ({
          ...variant,
          specs: variant.specs.map(spec => `${spec.label}: ${spec.value}`).join(', ')
        }));
  
        setProduct({ ...productData, variants: updatedVariants });
  
        // Gọi API lấy sản phẩm liên quan
        const relatedResponse = await axios.post('http://localhost:5000/api/products/related-products', { tags: productData.tags });
        setRelatedProducts(relatedResponse.data.products);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };
  
    fetchProduct();
  }, [slug]);
  

  if (!product) {
    return <div>Loading...</div>;
  }

  const handlePrevImage = () => {
    setSelectedImage((prev) => (prev === 0 ? product.images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setSelectedImage((prev) => (prev === product.images.length - 1 ? 0 : prev + 1));
  };

  const handleAddToCart = () => {
    const productToAdd = {
      id: product._id,
      name: product.name,
      price: product.price,
      image: product.images[selectedImage],
      quantity // Đảm bảo truyền quantity đúng
    };
    onAddToCart(productToAdd);
  };
  


  // Zoom Modal Component
  const ZoomModal = () => {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
        <div className="relative max-w-4xl w-full h-full m-4 bg-white rounded-lg overflow-hidden">
          <button
            onClick={() => setShowZoomModal(false)}
            className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 z-10"
          >
            <FiX size={24} />
          </button>
          <div className="w-full h-full overflow-auto p-4">
            <img
              src={`http://localhost:5000${product.images[selectedImage]}`}
              alt={product.name}
              className="w-full h-auto object-contain cursor-zoom-in transform transition-transform duration-300 hover:scale-150"
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Main Content */}
      <main className="container mx-auto px-4 pt-24 pb-12 text-left">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Updated Product Images Section with Zoom Button */}
          <div className="space-y-4">
            <div className="relative h-[400px] w-full bg-gray-100 rounded-lg overflow-hidden">
              {product.images && (
                <>
                  <img
                    src={`http://localhost:5000${product.images[selectedImage]}`}
                    alt={product.name}
                    className="object-cover w-full h-full"
                  />
                  <button
                    onClick={() => setShowZoomModal(true)}
                    className="absolute top-4 right-4 p-2 bg-white/40 rounded-full hover:bg-white/60 transition-all backdrop-blur-sm"
                  >
                    <FiMaximize2 size={18} />
                  </button>
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/40 p-1.5 rounded-full hover:bg-white/60 transition-all backdrop-blur-sm"
                  >
                    <FiArrowLeft size={18} />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/40 p-1.5 rounded-full hover:bg-white/60 transition-all backdrop-blur-sm"
                  >
                    <FiArrowRight size={18} />
                  </button>
                </>
              )}
            </div>
            <div className="grid grid-cols-4 gap-4">
              {product.images && product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`h-24 w-full rounded-lg overflow-hidden ${selectedImage === index ? "ring-2 ring-blue-500" : ""}`}
                >
                  <img
                    src={`http://localhost:5000${image}`}
                    alt={`${product.name} ${index + 1}`}
                    className="object-cover w-full h-full"
                  />
                </button>
              ))}
            </div>
          </div>
  
          {/* Product Info */}
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, index) => (
                  <FiStar
                    key={index}
                    className={index < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"}
                  />
                ))}
              </div>
              <span className="text-gray-600">{product.reviewCount} reviews</span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-4">
                <span className="text-3xl font-bold">${product.price}</span>
                <span className="text-xl text-gray-500 line-through">${product.oldPrice}</span>
                <span className="px-2 py-1 bg-red-100 text-red-600 rounded-md text-sm">25% OFF</span>
              </div>
              <p className="text-green-600">10% off when paying with e-wallet</p>
            </div>
            <p className="text-gray-600">{product.description}</p> {/* Đảm bảo hiển thị đúng mô tả */}
            <div className="flex flex-wrap gap-2">
              {product.tags && product.tags.map((tag, index) => (
                <button
                  key={index}
                  className={`px-4 py-2 rounded-full bg-gray-200 text-sm font-medium transition-colors duration-200 hover:opacity-80`}
                >
                  {tag}
                </button>
              ))}
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="font-medium">Quantity:</span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 rounded-md border hover:bg-gray-100"
                  >
                    <FiMinus />
                  </button>
                  <span className="w-12 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 rounded-md border hover:bg-gray-100"
                  >
                    <FiPlus />
                  </button>
                </div>
              </div>
              {product.stock === 0 ? (
                <div className="text-red-600 font-medium">Out of stock</div>
              ) : (
                <div className="flex space-x-4">
                  <button 
                    className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    onClick={handleAddToCart}
                  >
                    Add to Cart
                  </button>
                  <Link to="/cart" className="flex-1">
                    <button 
                      className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                      View Cart
                    </button>
                  </Link>       
                </div>
              )}
            </div>
          </div>
        </div>
  
        {/* Tabs */}
        <div className="mt-12">
          <div className="border-b">
            <div className="flex space-x-8">
              <button
                onClick={() => setSelectedTab("description")}
                className={`py-4 ${selectedTab === "description" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500"}`}
              >
                Specifications
              </button>
              <button
                onClick={() => setSelectedTab("reviews")}
                className={`py-4 ${selectedTab === "reviews" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500"}`}
              >
                Reviews
              </button>
            </div>
          </div>
  
          <div className="py-8">
            {selectedTab === "description" ? (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-8">
                  {product.variants && product.variants.map((variant, index) => (
                    <div key={index}>
                      {variant.specs && variant.specs.split(',').map((spec, i) => {
                        const [label, value] = spec.split(':').map(item => item.trim());
                        return (
                          <div key={i} className={`p-4 rounded-lg ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                            <span className="font-medium">{label}:</span>
                            <span className="ml-20">{value}</span>
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                {product.reviews && product.reviews.map((review, index) => (
                  <div key={index} className="border-b pb-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <span className="font-medium">{review.name}</span>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <FiStar
                              key={i}
                              className={i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"}
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-gray-500">{review.date}</span>
                    </div>
                    <p className="mt-2 text-gray-600">{review.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
  
        {/* Related Products */}
<div className="mt-12">
  <h2 className="text-2xl font-bold mb-6">Related Products</h2>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    {relatedProducts && relatedProducts.map((product) => (
      <div key={product._id} className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
        <img
          src={`http://localhost:5000${product.images[0]}`}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h3 className="font-medium">{product.name}</h3>
          <p className="text-lg font-bold mt-2">${product.price}</p>
          <Link to={`/product-detail/${product.slug}`} className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-center block">
            View Details
          </Link>
        </div>
      </div>
    ))}
  </div>
</div>


    </main>

    {/* Zoom Modal */}
    {showZoomModal && <ZoomModal />}
  </div>
);
}

export default ProductDetail;
