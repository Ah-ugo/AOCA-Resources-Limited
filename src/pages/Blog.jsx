"use client";

import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Globe,
  Search,
  Calendar,
  User,
  Tag,
  ChevronRight,
  ChevronLeft,
  Clock,
} from "lucide-react";
import { blogPosts } from "../data/blogData";

function Blog() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("");
  const postsPerPage = 6;

  // Get category from URL if present
  useEffect(() => {
    const category = searchParams.get("category");
    if (category) {
      setSelectedCategory(category);
    } else {
      setSelectedCategory("");
    }
    setCurrentPage(1);
  }, [searchParams]);

  // Initialize posts
  useEffect(() => {
    setPosts(blogPosts);
  }, []);

  // Filter posts based on search query and category
  useEffect(() => {
    let result = [...posts];

    // Filter by search query
    if (searchQuery) {
      result = result.filter(
        (post) =>
          post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.content.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory) {
      result = result.filter((post) => post.category === selectedCategory);
    }

    setFilteredPosts(result);
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, posts]);

  // Get all unique categories
  const categories = [...new Set(posts.map((post) => post.category))];

  // Get current posts for pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    // The search is already handled by the useEffect
  };

  // Handle category filter
  const handleCategoryFilter = (category) => {
    if (category === selectedCategory) {
      // If clicking the already selected category, clear the filter
      setSearchParams({});
      setSelectedCategory("");
    } else {
      setSearchParams({ category });
      setSelectedCategory(category);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <Globe className="h-8 w-8 text-primary" />
            <span className="font-bold text-xl">AOCA Resources Limited</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/#pathways"
              className="text-foreground/80 hover:text-primary transition-colors"
            >
              Pathways
            </Link>
            <Link
              to="/#courses"
              className="text-foreground/80 hover:text-primary transition-colors"
            >
              Courses
            </Link>
            <Link to="/blog" className="text-primary font-medium">
              Blog
            </Link>
            <Link
              to="/about"
              className="text-foreground/80 hover:text-primary transition-colors"
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className="text-foreground/80 hover:text-primary transition-colors"
            >
              Contact
            </Link>
            <Link
              to="/login"
              className="text-foreground/80 hover:text-primary transition-colors"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
            >
              Register
            </Link>
          </nav>
        </div>
      </header>

      {/* Page Content */}
      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="bg-primary/10 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Blog</h1>
              <p className="text-xl text-gray-600">
                Insights, guides, and news about German visa applications,
                language learning, and international opportunities
              </p>
            </div>
          </div>
        </section>

        {/* Blog Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Main Content */}
              <div className="lg:w-3/4">
                {/* Search and Filter Bar */}
                <div className="mb-8 flex flex-col md:flex-row gap-4">
                  <form onSubmit={handleSearch} className="flex-1">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search articles..."
                        className="w-full px-4 py-2 pl-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </div>
                  </form>

                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => handleCategoryFilter("")}
                      className={`px-3 py-1 text-sm rounded-md ${
                        selectedCategory === ""
                          ? "bg-primary text-white"
                          : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                      }`}
                    >
                      All
                    </button>
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => handleCategoryFilter(category)}
                        className={`px-3 py-1 text-sm rounded-md ${
                          selectedCategory === category
                            ? "bg-primary text-white"
                            : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Blog Posts */}
                {currentPosts.length === 0 ? (
                  <div className="text-center py-12">
                    <h3 className="text-xl font-medium mb-2">No posts found</h3>
                    <p className="text-gray-600">
                      Try adjusting your search or filter to find what you're
                      looking for.
                    </p>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
                    {currentPosts.map((post, index) => (
                      <motion.div
                        key={post.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                      >
                        <div className="relative h-48 w-full overflow-hidden">
                          <img
                            src={post.image || "/placeholder.svg"}
                            alt={post.title}
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                          />
                          <div className="absolute top-4 left-4 bg-primary text-white text-xs font-semibold px-2 py-1 rounded">
                            {post.category}
                          </div>
                        </div>
                        <div className="p-6">
                          <h3 className="text-xl font-bold mb-2 hover:text-primary transition-colors">
                            <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                          </h3>
                          <p className="text-gray-600 mb-4">{post.excerpt}</p>
                          <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                            <div className="flex items-center gap-1">
                              <User className="h-4 w-4" />
                              <span>{post.author}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              <span>{post.date}</span>
                            </div>
                          </div>
                          <Link
                            to={`/blog/${post.slug}`}
                            className="inline-flex items-center text-primary font-medium hover:underline"
                          >
                            Read More
                            <ChevronRight className="h-4 w-4 ml-1" />
                          </Link>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-12 flex justify-center">
                    <nav className="flex items-center gap-2">
                      <button
                        onClick={() => paginate(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                        className="p-2 rounded-md border hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>

                      {[...Array(totalPages)].map((_, index) => (
                        <button
                          key={index}
                          onClick={() => paginate(index + 1)}
                          className={`w-10 h-10 rounded-md ${
                            currentPage === index + 1
                              ? "bg-primary text-white"
                              : "border hover:bg-gray-100"
                          }`}
                        >
                          {index + 1}
                        </button>
                      ))}

                      <button
                        onClick={() =>
                          paginate(Math.min(totalPages, currentPage + 1))
                        }
                        disabled={currentPage === totalPages}
                        className="p-2 rounded-md border hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </nav>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="lg:w-1/4">
                {/* Categories */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                  <h3 className="text-lg font-bold mb-4">Categories</h3>
                  <ul className="space-y-2">
                    <li>
                      <button
                        onClick={() => handleCategoryFilter("")}
                        className={`flex items-center gap-2 w-full text-left ${
                          selectedCategory === ""
                            ? "text-primary font-medium"
                            : "text-gray-700"
                        }`}
                      >
                        <Tag className="h-4 w-4" />
                        <span>All Categories</span>
                        <span className="ml-auto bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
                          {posts.length}
                        </span>
                      </button>
                    </li>
                    {categories.map((category) => {
                      const count = posts.filter(
                        (post) => post.category === category
                      ).length;
                      return (
                        <li key={category}>
                          <button
                            onClick={() => handleCategoryFilter(category)}
                            className={`flex items-center gap-2 w-full text-left ${
                              selectedCategory === category
                                ? "text-primary font-medium"
                                : "text-gray-700"
                            }`}
                          >
                            <Tag className="h-4 w-4" />
                            <span>{category}</span>
                            <span className="ml-auto bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
                              {count}
                            </span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* Recent Posts */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                  <h3 className="text-lg font-bold mb-4">Recent Posts</h3>
                  <div className="space-y-4">
                    {posts.slice(0, 5).map((post) => (
                      <div key={post.id} className="flex gap-3">
                        <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                          <img
                            src={post.image || "/placeholder.svg"}
                            alt={post.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-medium text-sm hover:text-primary transition-colors">
                            <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                          </h4>
                          <div className="flex items-center gap-1 mt-1 text-xs text-gray-500">
                            <Clock className="h-3 w-3" />
                            <span>{post.date}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Call to Action */}
                <div className="bg-primary/10 rounded-lg p-6">
                  <h3 className="text-lg font-bold mb-3">
                    Ready to Start Your Journey?
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Join our language courses and take the first step toward
                    your future in Germany.
                  </p>
                  <Link
                    to="/register"
                    className="block w-full bg-primary text-white text-center px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
                  >
                    Register Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <Link to="/" className="flex items-center gap-2 mb-4">
                <Globe className="h-8 w-8" />
                <span className="font-bold text-xl">
                  AOCA Resources Limited
                </span>
              </Link>
              <p className="text-gray-400 mb-4">
                Your trusted partner for German language training, visa
                consultancy, and recruitment services.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/#pathways"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Pathways
                  </Link>
                </li>
                <li>
                  <Link
                    to="/#courses"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Courses
                  </Link>
                </li>
                <li>
                  <Link
                    to="/blog"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Contact</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <Globe className="h-5 w-5 mt-0.5" />
                  <div>
                    <p className="font-medium">Lagos Office:</p>
                    <p className="text-gray-400">
                      8 Bayo Adetuna Street off Sangotedo. Lagos.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <Globe className="h-5 w-5 mt-0.5" />
                  <div>
                    <p className="font-medium">Port Harcourt Office:</p>
                    <p className="text-gray-400">
                      7 Salvation Avenue, Off Igbo Etche Road, Rumukwurusi, Port
                      Harcourt
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Follow Us</h3>
              <div className="flex gap-4 mb-6">
                <a
                  href="#"
                  className="bg-gray-800 p-2 rounded-full hover:bg-primary transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="bg-gray-800 p-2 rounded-full hover:bg-primary transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="bg-gray-800 p-2 rounded-full hover:bg-primary transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              &copy; {new Date().getFullYear()} AOCA Resources Limited. All
              rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Blog;
