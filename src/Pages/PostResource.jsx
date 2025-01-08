import React, { useState, useEffect } from 'react';
import { 
  Image, 
  Link, 
  Tag, 
  Type, 
  X, 
  Upload, 
  Hash, 
  Info, 
  Check,
  AlertCircle,
  ArrowRight
} from 'lucide-react';
import { Link as RouterLink } from 'react-router-dom';

const CreatePost = ({ isSidebarOpen }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [currentTag, setCurrentTag] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const categories = [
    'Tractors',
    'Seeds',
    'Equipment',
    'Farming Tips',
    'Market Insights',
    'Events',
    'Soil Management',
    'Pest Control',
    'Irrigation',
    'Organic Farming'
  ];

  const handleCategoryToggle = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleAddTag = (e) => {
    e.preventDefault();
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      setTags([...tags, currentTag.trim()]);
      setCurrentTag('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className={`flex-1 transition-all duration-300 bg-gray-100 min-h-screen pb-20 md:pb-0
      ${isSidebarOpen ? 'md:ml-64' : 'md:ml-20'}`}>
      
      <div className="pt-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-green-600 to-green-500 p-4 md:p-8 lg:p-12 mb-6">
            <div className="relative z-10">
              <h1 className="text-2xl md:text-4xl font-bold mb-2 md:mb-4 text-white">
                Create a Post
              </h1>
              <p className="text-sm md:text-lg text-white/90 mb-4 md:mb-6">
                Share your insights, experiences, and knowledge with the community!
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
          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
            {/* Title Section */}
            <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-200">
              <label className="block mb-2 font-medium text-gray-700">Post Title</label>
              <div className="relative">
                <Type className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Enter a descriptive title..."
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Categories Section */}
            <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-200">
              <label className="block mb-4 font-medium text-gray-700">Categories</label>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => handleCategoryToggle(category)}
                    className={`px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-sm font-medium transition-colors
                      ${selectedCategories.includes(category)
                        ? 'bg-green-100 text-green-700 border-2 border-green-500'
                        : 'bg-gray-100 text-gray-600 border-2 border-transparent hover:bg-gray-200'
                      }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Description Section */}
            <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-200">
              <label className="block mb-2 font-medium text-gray-700">Brief Description</label>
              <div className="relative">
                <Info className="absolute left-3 top-3 text-gray-400" />
                <textarea
                  placeholder="Write a brief summary of your post..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 min-h-[100px]"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Main Content Section */}
            <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-200">
              <label className="block mb-2 font-medium text-gray-700">Main Content</label>
              <div className="mb-4 flex flex-wrap gap-2">
                <button type="button" className="p-2 hover:bg-gray-100 rounded">
                  <Type className="w-5 h-5 text-gray-600" />
                </button>
                <button type="button" className="p-2 hover:bg-gray-100 rounded">
                  <Image className="w-5 h-5 text-gray-600" />
                </button>
                <button type="button" className="p-2 hover:bg-gray-100 rounded">
                  <Link className="w-5 h-5 text-gray-600" />
                </button>
              </div>
              <textarea
                placeholder="Share your knowledge and experience..."
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 min-h-[200px]"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
            </div>

            {/* Media Upload Section */}
            <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-200">
              <label className="block mb-4 font-medium text-gray-700">Media Upload</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 md:p-8 text-center">
                <Upload className="w-6 h-6 md:w-8 md:h-8 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">Drag and drop files here, or click to browse</p>
                <p className="text-xs md:text-sm text-gray-500">Supported formats: JPG, PNG, MP4 (Max 10MB)</p>
                <input type="file" className="hidden" multiple accept="image/*,video/*" />
                <button type="button" className="mt-4 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                  Browse Files
                </button>
              </div>
            </div>

            {/* Tags Section */}
            <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-200">
              <label className="block mb-2 font-medium text-gray-700">Tags</label>
              <div className="flex flex-wrap gap-2 mb-4">
                {tags.map((tag) => (
                  <span 
                    key={tag} 
                    className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-gray-700"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-2 text-gray-500 hover:text-gray-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </span>
                ))}
              </div>
              <div className="relative">
                <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <form onSubmit={handleAddTag} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Add tags..."
                    className="flex-1 pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors whitespace-nowrap"
                  >
                    Add Tag
                  </button>
                </form>
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

export default CreatePost;
