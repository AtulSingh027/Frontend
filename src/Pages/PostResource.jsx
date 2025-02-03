import React, { useState, useEffect } from "react";
import { Type, Upload, Info, Check, ArrowRight, IndianRupee } from "lucide-react";
import { Link as RouterLink } from "react-router-dom";
import axios from "axios";

const categories = [
  { id: "tractors", name: "Tractors" },
  { id: "tools", name: "Farm Tools" },
  { id: "seeds", name: "Seeds" },
  { id: "fertilizers", name: "Fertilizers" },
];

const PostResource = ({ isSidebarOpen }) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  async function Post(e) {
    e.preventDefault();

    const formData = new FormData();
    
    // Match the field names exactly with the Django model
    formData.append("title", e.target.title.value);
    formData.append("Description", e.target.description.value); // Capitalized to match Django model
    formData.append("RentPrice", parseInt(e.target.RentPrice.value)); // Convert to integer
    formData.append("category", selectedCategory);

    // Handle file upload - renamed to match Django model
    const posterFile = e.target["image"]?.files[0];
    if (posterFile) {
      formData.append("Poster", posterFile); // Changed from 'image' to 'Poster'
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/posts/",
        formData,
        {
          headers: { 
            "Content-Type": "multipart/form-data"
          },
        }
      );
      console.log(response);
      setShowSuccess(true);
      
      // Clear form after successful submission
      e.target.reset();
      setSelectedCategory("");
    } catch (error) {
      console.error("Error submitting form:", error);
      // Add error handling here
      alert(error.response?.data?.message || "An error occurred while creating the post");
    }
  }
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className={`flex-1 transition-all duration-300 bg-gray-100 min-h-screen pb-20 md:pb-0
      ${isSidebarOpen ? "md:ml-64" : "md:ml-20"}`}
    >
      <div className="pt-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-green-600 to-green-500 p-4 md:p-8 lg:p-12 mb-6">
            <div className="relative z-10">
              <h1 className="text-2xl md:text-4xl font-bold mb-2 md:mb-4 text-white">
                Create a Post
              </h1>
              <p className="text-sm md:text-lg text-white/90 mb-4 md:mb-6">
                Share your insights, experiences, and knowledge with the
                community!
              </p>
              <RouterLink
                to="/"
                className="inline-flex items-center px-4 py-2 md:px-6 md:py-3 bg-white text-green-600 text-sm md:text-base rounded-lg hover:bg-gray-50 transition-colors"
              >
                Back to Home
                <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5" />
              </RouterLink>
            </div>
            <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-green-400/20 to-transparent" />
          </div>

          {/* Success Message */}
          {showSuccess && (
            <div className="fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2 z-50">
              <Check className="w-5 h-5" />
              <span>Post created successfully!</span>
            </div>
          )}

          {/* Main Form */}
          <form onSubmit={Post} method="post" className="space-y-4 md:space-y-6">
            {/* Title Section */}
            <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-200">
              <label className="block mb-2 font-medium text-gray-700">
                Post Title
              </label>
              <div className="relative">
                <Type className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="title"
                  placeholder="Enter a descriptive title..."
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
            </div>

            {/* Category Section */}
            <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-200">
              <label className="block mb-4 font-medium text-gray-700">Category</label>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => handleCategoryChange(cat.id)}
                    className={`px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-sm font-medium transition-colors
                      ${selectedCategory === cat.id
                        ? "bg-green-100 text-green-700 border-2 border-green-500"
                        : "bg-gray-100 text-gray-600 border-2 border-transparent hover:bg-gray-200"
                      }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Description Section */}
            <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-200">
              <label className="block mb-2 font-medium text-gray-700">
                Brief Description
              </label>
              <div className="relative">
                <Info className="absolute left-3 top-3 text-gray-400" />
                <input
                  placeholder="Write a brief summary of your post..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 min-h-[100px]"
                  name="description"
                  required
                />
              </div>
            </div>

            {/* Media Upload Section */}
            <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-200">
              <label className="block mb-4 font-medium text-gray-700">
                Media Upload
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 md:p-8 text-center">
                <Upload className="w-6 h-6 md:w-8 md:h-8 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">
                  Drag and drop files here, or click to browse
                </p>
                <p className="text-xs md:text-sm text-gray-500">
                  Supported formats: JPG, PNG, MP4 (Max 10MB)
                </p>

                {/* Updated Label for file input */}
                <label
                  htmlFor="poster-upload"
                  className="mt-4 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors inline-block cursor-pointer"
                >
                  Browse File
                </label>

                {/* Hidden file input for image and video */}
                <input
                  type="file"
                  id="poster-upload"
                  className="hidden"
                  multiple
                  accept="image/*,video/*"
                  name="image"
                />
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-200">
              <label className="block mb-2 font-semibold text-black ">
                Price
              </label>
              <div className="relative">
                <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="number"
                  placeholder="Enter the price..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                  name="RentPrice"
                  required
                  min="0"
                  step="0.01"
                />
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex flex-col sm:flex-row justify-end gap-3 sm:space-x-4">
              <button
                type="button"
                className="w-full sm:w-auto px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors order-2 sm:order-1"
              >
                Save Draft
              </button>
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors order-1 sm:order-2"
              >
                Publish Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostResource;