// import React, { useState } from "react";
// import { FiSearch, FiShoppingCart, FiUser, FiStar, FiChevronDown, FiPlus, FiMinus } from "react-icons/fi";
// import { FaFacebook, FaInstagram, FaTwitter, FaGoogle } from "react-icons/fa";

// const ProductDetail = () => {
//   const [selectedImage, setSelectedImage] = useState(0);
//   const [quantity, setQuantity] = useState(1);
//   const [selectedTab, setSelectedTab] = useState("description");
//   const [showCart, setShowCart] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [isAdmin, setIsAdmin] = useState(false);
//   const [cartItems, setCartItems] = useState(0);
//   const [showLogin, setShowLogin] = useState(false);
//   const [showRegister, setShowRegister] = useState(false);
//   const [showCheckout, setShowCheckout] = useState(false);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [showBestSeller, setShowBestSeller] = useState(false);
//   const [showNewArrivals, setShowNewArrivals] = useState(false);

//   const product = {
//     name: "Premium Wireless Headphones",
//     price: 299.99,
//     oldPrice: 399.99,
//     rating: 4.5,
//     reviewCount: 128,
//     description: "Experience premium sound quality with our latest wireless headphones featuring active noise cancellation.",
//     images: [
//       "images.unsplash.com/photo-1505740420928-5e560c06d30e",
//       "images.unsplash.com/photo-1583394838336-acd977736f90",
//       "images.unsplash.com/photo-1487215078519-e21cc028cb29",
//       "images.unsplash.com/photo-1524678714210-9917a6c619c2"
//     ],
//     specs: [
//       { label: "Battery Life", value: "Up to 30 hours" },
//       { label: "Bluetooth Version", value: "5.0" },
//       { label: "Noise Cancellation", value: "Active" },
//       { label: "Weight", value: "250g" }
//     ],
//     reviews: [
//       {
//         name: "John D.",
//         rating: 5,
//         comment: "Best headphones I've ever owned!",
//         date: "2023-12-01"
//       },
//       {
//         name: "Sarah M.",
//         rating: 4,
//         comment: "Great sound quality, but slightly expensive.",
//         date: "2023-11-28"
//       }
//     ]
//   };

//   const relatedProducts = [
//     {
//       id: 1,
//       name: "Wireless Earbuds",
//       price: 149.99,
//       image: "images.unsplash.com/photo-1572569511254-d8f925fe2cbb"
//     },
//     {
//       id: 2,
//       name: "Over-Ear Headphones",
//       price: 199.99,
//       image: "images.unsplash.com/photo-1583394838336-acd977736f90"
//     }
//   ];

//   const categories = [
//     { id: 1, name: "Phones", image: "images.unsplash.com/photo-1511707171634-5f897ff02aa9" },
//     { id: 2, name: "Laptops", image: "images.unsplash.com/photo-1496181133206-80ce9b88a853" },
//     { id: 3, name: "Best Sellers", image: "images.unsplash.com/photo-1531297484001-80022131f5a1" },
//     { id: 4, name: "New Arrivals", image: "images.unsplash.com/photo-1498049794561-7780e7231661" }
//   ];

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Navigation */}
//       <nav className="fixed top-0 w-full bg-gray-900 text-white shadow-md z-40">
//         <div className="container mx-auto px-4 py-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-8">
//               <h1 className="text-2xl font-bold text-blue-400">TechStore</h1>
//               <div className="hidden md:flex space-x-6 relative">
//                 {categories.map(category => (
//                   <div
//                     key={category.id}
//                     className="relative group"
//                     onMouseEnter={() => setShowCategoryDropdown(true)}
//                     onMouseLeave={() => setShowCategoryDropdown(false)}
//                   >
//                     <button className="flex items-center space-x-1 hover:text-blue-400 transition-colors">
//                       <span>{category.name}</span>
//                       <FiChevronDown />
//                     </button>
//                     {showCategoryDropdown && (
//                       <div className="absolute top-full left-0 w-48 bg-white text-gray-900 shadow-lg rounded-lg py-2 mt-2 transform opacity-0 group-hover:opacity-100 transition-all duration-200">
//                         <a href="#" className="block px-4 py-2 hover:bg-gray-100">Sub Category 1</a>
//                         <a href="#" className="block px-4 py-2 hover:bg-gray-100">Sub Category 2</a>
//                         <a href="#" className="block px-4 py-2 hover:bg-gray-100">Sub Category 3</a>
//                       </div>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             </div>
//             <div className="flex items-center space-x-6">
//               <div className="relative">
//                 <FiShoppingCart className="text-2xl" />
//                 {cartItems > 0 && (
//                   <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
//                     {cartItems}
//                   </span>
//                 )}
//               </div>
//               <button onClick={() => setShowLogin(true)} className="flex items-center space-x-2">
//                 <FiUser className="text-2xl" />
//                 <span>{isLoggedIn ? "John Doe" : "Login"}</span>
//               </button>
//               <button
//                 onClick={() => setIsAdmin(!isAdmin)}
//                 className={`p-2 rounded ${isAdmin ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-900"}`}
//               >
//                 {isAdmin ? "Admin" : "Customer"}
//               </button>
//             </div>
            
//           </div>
//         </div>
//       </nav> 

//       Main Content
//       <main className="container mx-auto px-4 pt-24 pb-12">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//           {/* Product Images */}
//           <div className="space-y-4">
//             <div className="aspect-w-1 aspect-h-1 bg-gray-100 rounded-lg overflow-hidden">
//               <img
//                 src={`https://${product.images[selectedImage]}`}
//                 alt={product.name}
//                 className="object-cover w-full h-full transform hover:scale-110 transition-transform duration-300"
//               />
//             </div>
//             <div className="grid grid-cols-4 gap-4">
//               {product.images.map((image, index) => (
//                 <button
//                   key={index}
//                   onClick={() => setSelectedImage(index)}
//                   className={`aspect-w-1 aspect-h-1 rounded-lg overflow-hidden ${selectedImage === index ? "ring-2 ring-blue-500" : ""}`}
//                 >
//                   <img
//                     src={`https://${image}`}
//                     alt={`${product.name} ${index + 1}`}
//                     className="object-cover w-full h-full"
//                   />
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Product Info */}
//           <div className="space-y-6 text-left"> {/* Thêm class text-left */}
//             <h1 className="text-3xl font-bold">{product.name}</h1>
//             <div className="flex items-center space-x-4">
//               <div className="flex items-center">
//                 {[...Array(5)].map((_, index) => (
//                   <FiStar
//                     key={index}
//                     className={index < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"}
//                   />
//                 ))}
//               </div>
//               <span className="text-gray-600">{product.reviewCount} reviews</span>
//             </div>

//             <div className="space-y-2">
//               <div className="flex items-center space-x-4">
//                 <span className="text-3xl font-bold">${product.price}</span>
//                 <span className="text-xl text-gray-500 line-through">${product.oldPrice}</span>
//                 <span className="px-2 py-1 bg-red-100 text-red-600 rounded-md text-sm">25% OFF</span>
//               </div>
//               <p className="text-green-600">10% off when paying with e-wallet</p>
//             </div>

//             <p className="text-gray-600">{product.description}</p>

//             <div className="space-y-4">
//               <div className="flex items-center space-x-4">
//                 <span className="font-medium">Quantity:</span>
//                 <div className="flex items-center space-x-2">
//                   <button
//                     onClick={() => setQuantity(Math.max(1, quantity - 1))}
//                     className="p-2 rounded-md border hover:bg-gray-100"
//                   >
//                     <FiMinus />
//                   </button>
//                   <span className="w-12 text-center">{quantity}</span>
//                   <button
//                     onClick={() => setQuantity(quantity + 1)}
//                     className="p-2 rounded-md border hover:bg-gray-100"
//                   >
//                     <FiPlus />
//                   </button>
//                 </div>
//               </div>

//               <div className="flex space-x-4">
//                 <button className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
//                   Add to Cart
//                 </button>
//                 <button className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700">
//                   Buy Now
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Tabs */}
//         <div className="mt-12">
//           <div className="border-b">
//             <div className="flex space-x-8">
//               <button
//                 onClick={() => setSelectedTab("description")}
//                 className={`py-4 ${selectedTab === "description" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500"}`}
//               >
//                 Description
//               </button>
//               <button
//                 onClick={() => setSelectedTab("reviews")}
//                 className={`py-4 ${selectedTab === "reviews" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500"}`}
//               >
//                 Reviews
//               </button>
//             </div>
//           </div>

//           <div className="py-8">
//             {selectedTab === "description" ? (
//               <div className="grid grid-cols-2 gap-8">
//                 {product.specs.map((spec, index) => (
//                   <div key={index} className="border p-4 rounded-lg">
//                     <span className="font-medium">{spec.label}:</span>
//                     <span className="ml-2">{spec.value}</span>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <div className="space-y-8">
//                 {product.reviews.map((review, index) => (
//                   <div key={index} className="border-b pb-6">
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center space-x-4">
//                         <span className="font-medium">{review.name}</span>
//                         <div className="flex">
//                           {[...Array(5)].map((_, i) => (
//                             <FiStar
//                               key={i}
//                               className={i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"}
//                             />
//                           ))}
//                         </div>
//                       </div>
//                       <span className="text-gray-500">{review.date}</span>
//                     </div>
//                     <p className="mt-2 text-gray-600">{review.comment}</p>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Related Products */}
//         <div className="mt-12">
//           <h2 className="text-2xl font-bold mb-6">Related Products</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//             {relatedProducts.map((product) => (
//               <div key={product.id} className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
//                 <img
//                   src={`https://${product.image}`}
//                   alt={product.name}
//                   className="w-full h-48 object-cover"
//                 />
//                 <div className="p-4">
//                   <h3 className="font-medium">{product.name}</h3>
//                   <p className="text-lg font-bold mt-2">${product.price}</p>
//                   <button className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
//                     View Details
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </main>

//       {/* Footer */}
//       <footer className="bg-gray-900 text-white py-12">
//         <div className="container mx-auto px-4">
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//             <div>
//               <h3 className="text-xl font-bold mb-4">TechStore</h3>
//               <p className="text-gray-400">Your one-stop shop for all things tech</p>
//             </div>
//             <div>
//               <h4 className="font-bold mb-4">Quick Links</h4>
//               <ul className="space-y-2">
//                 <li><a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
//                 <li><a href="#" className="text-gray-400 hover:text-white">Terms of Use</a></li>
//                 <li><a href="#" className="text-gray-400 hover:text-white">Return Policy</a></li>
//               </ul>
//             </div>
//             <div>
//               <h4 className="font-bold mb-4">Contact</h4>
//               <ul className="space-y-2 text-gray-400">
//                 <li>123 Tech Street</li>
//                 <li>Phone: (123) 456-7890</li>
//                 <li>Email: support@techstore.com</li>
//               </ul>
//             </div>
//             <div>
//               <h4 className="font-bold mb-4">Follow Us</h4>
//               <div className="flex space-x-4">
//                 <FaFacebook className="text-2xl hover:text-blue-500 cursor-pointer" />
//                 <FaGoogle className="text-2xl hover:text-red-500 cursor-pointer" />
//               </div>
//             </div>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default ProductDetail;

import React, { useState } from "react";
import { FiSearch, FiShoppingCart, FiUser, FiStar, FiChevronDown, FiPlus, FiMinus } from "react-icons/fi";
import { FaFacebook, FaInstagram, FaTwitter, FaGoogle } from "react-icons/fa";

const ProductDetail = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedTab, setSelectedTab] = useState("description");
  const [showCart, setShowCart] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [cartItems, setCartItems] = useState(0);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showBestSeller, setShowBestSeller] = useState(false);
  const [showNewArrivals, setShowNewArrivals] = useState(false);

  const product = {
    name: "Premium Wireless Headphones",
    price: 299.99,
    oldPrice: 399.99,
    rating: 4.5,
    reviewCount: 128,
    description: "Experience premium sound quality with our latest wireless headphones featuring active noise cancellation.",
    tags: [
      { name: "Wireless", color: "bg-blue-100 text-blue-600" },
      { name: "Noise Cancelling", color: "bg-purple-100 text-purple-600" },
      { name: "Premium Audio", color: "bg-green-100 text-green-600" },
      { name: "Bluetooth 5.0", color: "bg-yellow-100 text-yellow-600" },
      { name: "Long Battery Life", color: "bg-red-100 text-red-600" }
    ],
    images: [
      "images.unsplash.com/photo-1505740420928-5e560c06d30e",
      "images.unsplash.com/photo-1583394838336-acd977736f90",
      "images.unsplash.com/photo-1487215078519-e21cc028cb29",
      "images.unsplash.com/photo-1524678714210-9917a6c619c2"
    ],
    specs: [
      { label: "Battery Life", value: "Up to 30 hours" },
      { label: "Bluetooth Version", value: "5.0" },
      { label: "Noise Cancellation", value: "Active" },
      { label: "Weight", value: "250g" }
    ],
    reviews: [
      {
        name: "John D.",
        rating: 5,
        comment: "Best headphones I've ever owned!",
        date: "2023-12-01"
      },
      {
        name: "Sarah M.",
        rating: 4,
        comment: "Great sound quality, but slightly expensive.",
        date: "2023-11-28"
      }
    ]
  };

  const relatedProducts = [
    {
      id: 1,
      name: "Wireless Earbuds",
      price: 149.99,
      image: "images.unsplash.com/photo-1572569511254-d8f925fe2cbb"
    },
    {
      id: 2,
      name: "Over-Ear Headphones",
      price: 199.99,
      image: "images.unsplash.com/photo-1583394838336-acd977736f90"
    }
  ];

  const categories = [
    { id: 1, name: "Phones", image: "images.unsplash.com/photo-1511707171634-5f897ff02aa9" },
    { id: 2, name: "Laptops", image: "images.unsplash.com/photo-1496181133206-80ce9b88a853" },
    { id: 3, name: "Best Sellers", image: "images.unsplash.com/photo-1531297484001-80022131f5a1" },
    { id: 4, name: "New Arrivals", image: "images.unsplash.com/photo-1498049794561-7780e7231661" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
       {/* Navigation */}
      <nav className="fixed top-0 w-full bg-gray-900 text-white shadow-md z-40">
         <div className="container mx-auto px-4 py-4">
           <div className="flex items-center justify-between">
             <div className="flex items-center space-x-8">
               <h1 className="text-2xl font-bold text-blue-400">TechStore</h1>
               <div className="hidden md:flex space-x-6 relative">
                 {categories.map(category => (
                  <div
                    key={category.id}
                    className="relative group"
                    onMouseEnter={() => setShowCategoryDropdown(true)}
                    onMouseLeave={() => setShowCategoryDropdown(false)}
                  >
                    <button className="flex items-center space-x-1 hover:text-blue-400 transition-colors">
                      <span>{category.name}</span>
                      <FiChevronDown />
                    </button>
                    {showCategoryDropdown && (
                      <div className="absolute top-full left-0 w-48 bg-white text-gray-900 shadow-lg rounded-lg py-2 mt-2 transform opacity-0 group-hover:opacity-100 transition-all duration-200">
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100">Sub Category 1</a>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100">Sub Category 2</a>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100">Sub Category 3</a>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="relative">
                <FiShoppingCart className="text-2xl" />
                {cartItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {cartItems}
                  </span>
                )}
              </div>
              <button onClick={() => setShowLogin(true)} className="flex items-center space-x-2">
                <FiUser className="text-2xl" />
                <span>{isLoggedIn ? "John Doe" : "Login"}</span>
              </button>
              <button
                onClick={() => setIsAdmin(!isAdmin)}
                className={`p-2 rounded ${isAdmin ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-900"}`}
              >
                {isAdmin ? "Admin" : "Customer"}
              </button>
            </div>
            
          </div>
        </div>
      </nav> 

      {/* Main Content */}
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-w-1 aspect-h-1 bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={`https://${product.images[selectedImage]}`}
                alt={product.name}
                className="object-cover w-full h-full transform hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-w-1 aspect-h-1 rounded-lg overflow-hidden ${selectedImage === index ? "ring-2 ring-blue-500" : ""}`}
                >
                  <img
                    src={`https://${image}`}
                    alt={`${product.name} ${index + 1}`}
                    className="object-cover w-full h-full"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6 text-left">
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

            <p className="text-gray-600">{product.description}</p>

            {/* Added Product Tags */}
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag, index) => (
                <button
                  key={index}
                  className={`px-4 py-2 rounded-full ${tag.color} text-sm font-medium transition-colors duration-200 hover:opacity-80`}
                >
                  {tag.name}
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

              <div className="flex space-x-4">
                <button className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Add to Cart
                </button>
                <button className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700">
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Rest of the code remains unchanged */}
        {/* Tabs */}
        <div className="mt-12">
          <div className="border-b">
            <div className="flex space-x-8">
              <button
                onClick={() => setSelectedTab("description")}
                className={`py-4 ${selectedTab === "description" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500"}`}
              >
                Description
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
              <div className="grid grid-cols-2 gap-8">
                {product.specs.map((spec, index) => (
                  <div key={index} className="border p-4 rounded-lg">
                    <span className="font-medium">{spec.label}:</span>
                    <span className="ml-2">{spec.value}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-8">
                {product.reviews.map((review, index) => (
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
            {relatedProducts.map((product) => (
              <div key={product.id} className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                <img
                  src={`https://${product.image}`}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-medium">{product.name}</h3>
                  <p className="text-lg font-bold mt-2">${product.price}</p>
                  <button className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      {/* Footer */}
       <footer className="bg-gray-900 text-white py-12">
         <div className="container mx-auto px-4">
           <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
             <div>
               <h3 className="text-xl font-bold mb-4">TechStore</h3>
               <p className="text-gray-400">Your one-stop shop for all things tech</p>
             </div>
             <div>
               <h4 className="font-bold mb-4">Quick Links</h4>
               <ul className="space-y-2">
                 <li><a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
                 <li><a href="#" className="text-gray-400 hover:text-white">Terms of Use</a></li>
                 <li><a href="#" className="text-gray-400 hover:text-white">Return Policy</a></li>
               </ul>
             </div>
             <div>
               <h4 className="font-bold mb-4">Contact</h4>
               <ul className="space-y-2 text-gray-400">
                 <li>123 Tech Street</li>
                 <li>Phone: (123) 456-7890</li>
                 <li>Email: support@techstore.com</li>
               </ul>
             </div>
             <div>
               <h4 className="font-bold mb-4">Follow Us</h4>
               <div className="flex space-x-4">
                 <FaFacebook className="text-2xl hover:text-blue-500 cursor-pointer" />
                 <FaGoogle className="text-2xl hover:text-red-500 cursor-pointer" />
               </div>
             </div>
           </div>
         </div>
       </footer>
    </div>
  );
};

export default ProductDetail;