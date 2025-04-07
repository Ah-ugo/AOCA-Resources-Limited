"use client";

import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  Globe,
  Calendar,
  User,
  Tag,
  ChevronRight,
  ChevronLeft,
  Clock,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  MessageSquare,
  AlertCircle,
  Loader,
  CheckCircle,
} from "lucide-react";
import Header from "../components/Header";
import { getBlogPost, getBlogPosts } from "../services/blogService";
import { addComment } from "../services/commentService";

function BlogPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [blogPosts, setBlogPosts] = useState([]);

  // Comment form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [commentLoading, setCommentLoading] = useState(false);
  const [commentError, setCommentError] = useState("");
  const [commentSuccess, setCommentSuccess] = useState(false);
  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    comment: "",
  });

  const validateForm = () => {
    let isValid = true;
    const errors = { name: "", email: "", comment: "" };

    if (!name.trim()) {
      errors.name = "Name is required";
      isValid = false;
    }

    if (!email.trim()) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      errors.email = "Please enter a valid email address";
      isValid = false;
    }

    if (!comment.trim()) {
      errors.comment = "Comment is required";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const AddComment = async () => {
    // Reset states
    setCommentError("");
    setCommentSuccess(false);

    // Validate form
    if (!validateForm()) {
      return;
    }

    // Set loading state
    setCommentLoading(true);

    const payload = {
      content: comment,
      name: name,
      email: email,
    };

    try {
      const resp = await addComment(slug, payload);
      console.log(resp, "comment===");

      // Show success message
      setCommentSuccess(true);

      // Clear form
      setName("");
      setEmail("");
      setComment("");

      // Reset form errors
      setFormErrors({ name: "", email: "", comment: "" });

      // Refresh post data to show new comment
      refreshPostData();

      // Auto-hide success message after 5 seconds
      setTimeout(() => {
        setCommentSuccess(false);
      }, 5000);
    } catch (error) {
      console.error("Error adding comment:", error);
      setCommentError(
        error.message || "Failed to add comment. Please try again."
      );
    } finally {
      setCommentLoading(false);
    }
  };

  const refreshPostData = async () => {
    try {
      const fetchedPost = await getBlogPost(slug);
      setPost(fetchedPost);

      // Update related posts if they exist
      if (fetchedPost.related_posts && fetchedPost.related_posts.length > 0) {
        setRelatedPosts(fetchedPost.related_posts);
      }
    } catch (error) {
      console.error("Error refreshing post data:", error);
    }
  };

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        const fetchedPost = await getBlogPost(slug);
        // Transform related posts if they exist
        if (fetchedPost.related_posts && fetchedPost.related_posts.length > 0) {
          setRelatedPosts(fetchedPost.related_posts);
        }
        setPost(fetchedPost);
        console.log(fetchedPost, "yello===");
      } catch (error) {
        console.error("Error fetching blog post:", error);
        navigate("/not-found");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
    window.scrollTo(0, 0);
  }, [slug, navigate]);

  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const posts = await getBlogPosts();

        setBlogPosts(posts);
      } catch (error) {
        console.error("Error fetching all blog posts:", error);
      }
    };
    fetchAllPosts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!post) {
    return null;
  }

  // Format date from API data (assuming it's in YYYY-MM-DD format)
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Find previous and next posts
  const currentIndex = blogPosts.findIndex((p) => p._id === post._id);
  const prevPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;
  const nextPost =
    currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Page Content */}
      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="relative">
          <div className="h-[300px] md:h-[400px] w-full relative">
            <div className="absolute inset-0 bg-black/50 z-10"></div>
            <img
              src={post.featured_image || "/placeholder.svg"}
              alt={post.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 z-20 flex items-center justify-center">
              <div className="container mx-auto px-4 text-center text-white">
                <div className="inline-flex items-center gap-2 bg-primary px-3 py-1 rounded-full text-sm mb-4">
                  <Tag className="h-4 w-4" />
                  <span>{post.category}</span>
                </div>
                <h1 className="text-3xl md:text-5xl font-bold mb-4">
                  {post.title}
                </h1>
                <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    <span>
                      {post.author ? post.author.name : "Unknown Author"}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(post.created_at)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Blog Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Main Content */}
              <div className="lg:w-2/3">
                <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
                  {/* Article Content */}
                  <div className="prose max-w-none">
                    <div dangerouslySetInnerHTML={{ __html: post.content }} />
                  </div>

                  {/* Tags */}
                  <div className="mt-8 pt-6 border-t">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-medium">Tags:</span>
                      {post.tags &&
                        post.tags.map((tag, index) => (
                          <Link
                            key={index}
                            to={`/blog?tag=${tag}`}
                            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm"
                          >
                            {tag}
                          </Link>
                        ))}
                    </div>
                  </div>

                  {/* Share */}
                  <div className="mt-6 pt-6 border-t">
                    <h3 className="font-medium mb-3 flex items-center gap-2">
                      <Share2 className="h-5 w-5" />
                      Share this article
                    </h3>
                    <div className="flex gap-2">
                      <button className="bg-[#1877F2] text-white p-2 rounded-full">
                        <Facebook className="h-5 w-5" />
                      </button>
                      <button className="bg-[#1DA1F2] text-white p-2 rounded-full">
                        <Twitter className="h-5 w-5" />
                      </button>
                      <button className="bg-[#0A66C2] text-white p-2 rounded-full">
                        <Linkedin className="h-5 w-5" />
                      </button>
                    </div>
                  </div>

                  {/* Author Bio */}
                  <div className="mt-8 pt-6 border-t">
                    <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-start">
                      <div className="w-20 h-20 rounded-full bg-gray-200 overflow-hidden">
                        <img
                          src={
                            post.author && post.author.image
                              ? post.author.image
                              : "https://via.placeholder.com/80x80"
                          }
                          alt={post.author ? post.author.name : "Author"}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">
                          {post.author ? post.author.name : "Unknown Author"}
                        </h3>
                        <p className="text-gray-500 mb-2">
                          {post.author && post.author.role
                            ? post.author.role
                            : "Content Writer"}
                        </p>
                        <p className="text-gray-600">
                          {post.authorBio ||
                            "An experienced writer specializing in German immigration, language learning, and cultural adaptation topics."}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Post Navigation */}
                  <div className="mt-8 pt-6 border-t grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      {prevPost ? (
                        <Link
                          to={`/blog/${prevPost.slug}`}
                          className="flex flex-col p-4 border rounded-lg hover:bg-gray-50"
                        >
                          <span className="text-sm text-gray-500 flex items-center">
                            <ChevronLeft className="h-4 w-4 mr-1" /> Previous
                            Article
                          </span>
                          <span className="font-medium">{prevPost.title}</span>
                        </Link>
                      ) : (
                        <div></div>
                      )}
                    </div>
                    <div>
                      {nextPost ? (
                        <Link
                          to={`/blog/${nextPost.slug}`}
                          className="flex flex-col p-4 border rounded-lg hover:bg-gray-50 text-right"
                        >
                          <span className="text-sm text-gray-500 flex items-center justify-end">
                            Next Article{" "}
                            <ChevronRight className="h-4 w-4 ml-1" />
                          </span>
                          <span className="font-medium">{nextPost.title}</span>
                        </Link>
                      ) : (
                        <div></div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Comments Section */}
                <div className="bg-white rounded-lg shadow-md p-6 md:p-8 mt-8">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    Comments ({post.comments ? post.comments.length : 0})
                  </h3>

                  <div className="space-y-6">
                    {/* Dynamic Comments based on API data */}
                    {post.comments && post.comments.length > 0 ? (
                      post.comments.map((comment, index) => (
                        <div key={comment._id || index} className="flex gap-4">
                          <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                            <img
                              src={comment.user_image}
                              alt={comment.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-medium">{comment.name}</h4>
                              <span className="text-xs text-gray-500">
                                {formatDate(
                                  comment.created_at || post.created_at
                                )}
                              </span>
                            </div>
                            <p className="text-gray-600">{comment.content}</p>
                            <button className="text-sm text-primary mt-2">
                              Reply
                            </button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500">
                        No comments yet. Be the first to comment!
                      </p>
                    )}

                    {/* Sample static comments - can be removed or kept based on preference */}
                    {post.comments && post.comments.length === 0 && (
                      <>
                        <div className="flex gap-4">
                          <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                            <img
                              src="https://via.placeholder.com/40x40"
                              alt="Commenter"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-medium">John Doe</h4>
                              <span className="text-xs text-gray-500">
                                2 days ago
                              </span>
                            </div>
                            <p className="text-gray-600">
                              This article was very helpful! I'm planning to
                              apply for the nursing pathway and this gave me a
                              clear understanding of the process.
                            </p>
                            <button className="text-sm text-primary mt-2">
                              Reply
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Comment Form */}
                  <div className="mt-8 pt-6 border-t">
                    <h4 className="font-bold mb-4">Leave a Comment</h4>

                    {/* Success message */}
                    {commentSuccess && (
                      <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-4 flex items-center">
                        <CheckCircle className="h-5 w-5 mr-2" />
                        <span>Your comment has been posted successfully!</span>
                      </div>
                    )}

                    {/* Error message */}
                    {commentError && (
                      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4 flex items-center">
                        <AlertCircle className="h-5 w-5 mr-2" />
                        <span>{commentError}</span>
                      </div>
                    )}

                    <div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Name *
                          </label>
                          <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                            id="name"
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                              formErrors.name ? "border-red-500" : ""
                            }`}
                            required
                            disabled={commentLoading}
                          />
                          {formErrors.name && (
                            <p className="text-red-500 text-xs mt-1">
                              {formErrors.name}
                            </p>
                          )}
                        </div>
                        <div>
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Email *
                          </label>
                          <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            id="email"
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                              formErrors.email ? "border-red-500" : ""
                            }`}
                            required
                            disabled={commentLoading}
                          />
                          {formErrors.email && (
                            <p className="text-red-500 text-xs mt-1">
                              {formErrors.email}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="comment"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Comment *
                        </label>
                        <textarea
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          id="comment"
                          rows={4}
                          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                            formErrors.comment ? "border-red-500" : ""
                          }`}
                          required
                          disabled={commentLoading}
                        ></textarea>
                        {formErrors.comment && (
                          <p className="text-red-500 text-xs mt-1">
                            {formErrors.comment}
                          </p>
                        )}
                      </div>
                      <button
                        onClick={AddComment}
                        // type="submit"
                        className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors flex items-center"
                        disabled={commentLoading}
                      >
                        {commentLoading ? (
                          <>
                            <Loader className="h-4 w-4 mr-2 animate-spin" />
                            Posting...
                          </>
                        ) : (
                          "Post Comment"
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:w-1/3">
                {/* Related Posts */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                  <h3 className="text-lg font-bold mb-4">Related Articles</h3>
                  <div className="space-y-4">
                    {relatedPosts.length > 0 ? (
                      relatedPosts.map((relatedPost) => (
                        <div key={relatedPost._id} className="flex gap-3">
                          <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                            <img
                              src={
                                relatedPost.featured_image || "/placeholder.svg"
                              }
                              alt={relatedPost.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <h4 className="font-medium text-sm hover:text-primary transition-colors">
                              <Link to={`/blog/${relatedPost.slug}`}>
                                {relatedPost.title}
                              </Link>
                            </h4>
                            <div className="flex items-center gap-1 mt-1 text-xs text-gray-500">
                              <Calendar className="h-3 w-3" />
                              <span>{formatDate(relatedPost.created_at)}</span>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500">
                        No related articles found.
                      </p>
                    )}
                  </div>
                </div>

                {/* Categories */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                  <h3 className="text-lg font-bold mb-4">Categories</h3>
                  <ul className="space-y-2">
                    {[...new Set(blogPosts.map((post) => post.category))].map(
                      (category, index) => {
                        const count = blogPosts.filter(
                          (post) => post.category === category
                        ).length;
                        return (
                          <li key={index}>
                            <Link
                              to={`/blog?category=${category}`}
                              className="flex items-center gap-2 text-gray-700 hover:text-primary"
                            >
                              <Tag className="h-4 w-4" />
                              <span>{category}</span>
                              <span className="ml-auto bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
                                {count}
                              </span>
                            </Link>
                          </li>
                        );
                      }
                    )}
                  </ul>
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

export default BlogPost;
