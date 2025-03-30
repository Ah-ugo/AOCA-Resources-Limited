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
} from "lucide-react";
import { blogPosts } from "../data/blogData";
import Header from "../components/Header";

function BlogPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Find the post with the matching slug
    const foundPost = blogPosts.find((post) => post.slug === slug);

    if (foundPost) {
      setPost(foundPost);

      // Find related posts (same category, excluding current post)
      const related = blogPosts
        .filter(
          (p) => p.category === foundPost.category && p.id !== foundPost.id
        )
        .slice(0, 3);

      setRelatedPosts(related);
    } else {
      // If post not found, navigate to 404 page
      navigate("/not-found");
    }

    setLoading(false);

    // Scroll to top when post changes
    window.scrollTo(0, 0);
  }, [slug, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!post) {
    return null; // This should not happen as we navigate to 404 if post not found
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      {/* <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <Globe className="h-8 w-8 text-primary" />
            <span className="font-bold text-xl">AOCA Resources Limited</span>
          </Link>

          Desktop Navigation 
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
      </header> */}
      <Header />

      {/* Page Content */}
      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="relative">
          <div className="h-[300px] md:h-[400px] w-full relative">
            <div className="absolute inset-0 bg-black/50 z-10"></div>
            <img
              src={post.image || "/placeholder.svg"}
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
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{post.readTime} min read</span>
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
                      {post.tags.map((tag, index) => (
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
                            post.authorImage ||
                            "https://via.placeholder.com/80x80"
                          }
                          alt={post.author}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">{post.author}</h3>
                        <p className="text-gray-500 mb-2">
                          {post.authorRole || "Content Writer"}
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
                      {post.prevPost ? (
                        <Link
                          to={`/blog/${post.prevPost.slug}`}
                          className="flex flex-col p-4 border rounded-lg hover:bg-gray-50"
                        >
                          <span className="text-sm text-gray-500 flex items-center">
                            <ChevronLeft className="h-4 w-4 mr-1" /> Previous
                            Article
                          </span>
                          <span className="font-medium">
                            {post.prevPost.title}
                          </span>
                        </Link>
                      ) : (
                        <div></div>
                      )}
                    </div>
                    <div>
                      {post.nextPost ? (
                        <Link
                          to={`/blog/${post.nextPost.slug}`}
                          className="flex flex-col p-4 border rounded-lg hover:bg-gray-50 text-right"
                        >
                          <span className="text-sm text-gray-500 flex items-center justify-end">
                            Next Article{" "}
                            <ChevronRight className="h-4 w-4 ml-1" />
                          </span>
                          <span className="font-medium">
                            {post.nextPost.title}
                          </span>
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
                    Comments (3)
                  </h3>

                  <div className="space-y-6">
                    {/* Comment 1 */}
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
                          This article was very helpful! I'm planning to apply
                          for the nursing pathway and this gave me a clear
                          understanding of the process.
                        </p>
                        <button className="text-sm text-primary mt-2">
                          Reply
                        </button>
                      </div>
                    </div>

                    {/* Comment 2 */}
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
                          <h4 className="font-medium">Sarah Johnson</h4>
                          <span className="text-xs text-gray-500">
                            1 week ago
                          </span>
                        </div>
                        <p className="text-gray-600">
                          Do you know if the language requirements are the same
                          for all pathways? I'm particularly interested in the
                          study pathway.
                        </p>
                        <button className="text-sm text-primary mt-2">
                          Reply
                        </button>
                      </div>
                    </div>

                    {/* Comment 3 with reply */}
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                        <img
                          src="https://via.placeholder.com/40x40"
                          alt="Commenter"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="w-full">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium">Michael Brown</h4>
                          <span className="text-xs text-gray-500">
                            2 weeks ago
                          </span>
                        </div>
                        <p className="text-gray-600">
                          I completed my B1 certification last month. How long
                          does the visa process typically take after submitting
                          all documents?
                        </p>
                        <button className="text-sm text-primary mt-2">
                          Reply
                        </button>

                        {/* Reply */}
                        <div className="mt-4 ml-6 pt-4 border-t flex gap-4">
                          <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                            <img
                              src={
                                post.authorImage ||
                                "https://via.placeholder.com/32x32"
                              }
                              alt={post.author}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-medium">{post.author}</h4>
                              <span className="text-xs text-gray-500">
                                1 week ago
                              </span>
                            </div>
                            <p className="text-gray-600">
                              Hi Michael, the visa processing time can vary, but
                              typically it takes 4-8 weeks after submitting all
                              required documents. Feel free to contact our
                              office for more specific guidance based on your
                              situation.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Comment Form */}
                  <div className="mt-8 pt-6 border-t">
                    <h4 className="font-bold mb-4">Leave a Comment</h4>
                    <form>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Name *
                          </label>
                          <input
                            type="text"
                            id="name"
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                            required
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Email *
                          </label>
                          <input
                            type="email"
                            id="email"
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                            required
                          />
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
                          id="comment"
                          rows={4}
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          required
                        ></textarea>
                      </div>
                      <button
                        type="submit"
                        className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
                      >
                        Post Comment
                      </button>
                    </form>
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
                        <div key={relatedPost.id} className="flex gap-3">
                          <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                            <img
                              src={relatedPost.image || "/placeholder.svg"}
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
                              <span>{relatedPost.date}</span>
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
