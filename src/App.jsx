"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Calendar,
  ChevronRight,
  Clock,
  FileText,
  Globe,
  GraduationCap,
  Laptop,
  MapPin,
  Menu,
  MessageSquare,
  Phone,
  User,
  Video,
  X,
} from "lucide-react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useNavigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Header from "./components/Header";
import FAQ from "./pages/FAQ";
// import { blogPosts } from "./data/blogData";
import NotFound from "./pages/NotFound";
import { getBlogPosts } from "./services/blogService";
import Careers from "./pages/Careers";
import CareerDetail from "./pages/CareerDetail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard/*"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/career/:id" element={<CareerDetail />} />
        <Route path="/blogs" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/not-found" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

// Private route component to protect dashboard
function PrivateRoute({ children }) {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);
  const targetRef = useRef(null);
  const pathwaysRef = useRef(null);
  const coursesRef = useRef(null);
  const navigate = useNavigate();
  const [blogPosts, setPosts] = useState([]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const getBlogPostss = async () => {
    const blogPosts = await getBlogPosts();
    setPosts(blogPosts);
  };

  // Initialize posts
  useEffect(() => {
    getBlogPostss();
  }, []);

  // function formatCreatedAt(createdAt) {
  //   const dateObj = new Date(createdAt);
  //   const year = dateObj.getFullYear();
  //   const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  //   const day = String(dateObj.getDate()).padStart(2, "0");
  //   const hours = String(dateObj.getHours()).padStart(2, "0");
  //   const minutes = String(dateObj.getMinutes()).padStart(2, "0");

  //   return `${year}-${month}-${day} ${hours}:${minutes}`;
  // }

  const formatCreatedAt = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  const pathways = [
    {
      title: "Nursing Work Contract",
      description:
        "Specialized pathway for nursing professionals to secure work contracts with German healthcare institutions.",
      icon: <Globe className="h-10 w-10 text-primary" />,
    },
    {
      title: "Ausbildung Training",
      description:
        "Vocational training pathway that combines theoretical learning with practical work experience in Germany.",
      icon: <GraduationCap className="h-10 w-10 text-primary" />,
    },
    {
      title: "Study Pathway",
      description:
        "Academic route for students looking to pursue higher education at German universities and colleges.",
      icon: <FileText className="h-10 w-10 text-primary" />,
    },
    {
      title: "Opportunity/Job Seeker",
      description:
        "Pathway for qualified professionals seeking employment opportunities in the German job market.",
      icon: <Laptop className="h-10 w-10 text-primary" />,
    },
  ];

  const courses = [
    {
      name: "Beginner Course",
      level: "A1",
      flag: "https://via.placeholder.com/60x40",
    },
    {
      name: "Intermediary Course",
      level: "A2",
      flag: "https://via.placeholder.com/60x40",
    },
    {
      name: "Advance Course",
      level: "B1",
      flag: "https://via.placeholder.com/60x40",
    },
    {
      name: "Upper Advance Course",
      level: "B2",
      flag: "https://via.placeholder.com/60x40",
    },
  ];

  const testimonials = [
    {
      name: "Chioma A.",
      role: "Nursing Professional",
      text: "The German language course was excellent! I passed my B1 exam and secured a nursing position in Berlin through AOCA's work contract pathway.",
      image: "https://via.placeholder.com/80x80",
    },
    {
      name: "Emmanuel O.",
      role: "IT Professional",
      text: "Thanks to their job seeker pathway services, I secured a job with a top German tech company. The visa process was smooth and well-guided.",
      image: "https://via.placeholder.com/80x80",
    },
    {
      name: "Blessing M.",
      role: "Healthcare Worker",
      text: "From language training to visa application, they handled everything professionally. Now I'm working as a nurse in Germany.",
      image: "https://via.placeholder.com/80x80",
    },
  ];

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
            <a
              href="#pathways"
              className="text-foreground/80 hover:text-primary transition-colors"
            >
              Pathways
            </a>
            <a
              href="#courses"
              className="text-foreground/80 hover:text-primary transition-colors"
            >
              Courses
            </a>
            <a
              href="/blogs"
              className="text-foreground/80 hover:text-primary transition-colors"
            >
              Blog
            </a>
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

         Mobile Menu Button 
          <button
            className="md:hidden p-2 rounded-md hover:bg-muted/50 transition-colors"
            onClick={toggleMenu}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        Mobile Navigation 
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            className="fixed inset-0 bg-white z-50 md:hidden"
          >
            <div className="flex flex-col h-full bg-white">
              <div className="flex justify-between items-center p-4 border-b bg-white">
                <Link to="/" className="flex items-center gap-2">
                  <Globe className="h-8 w-8 text-primary" />
                  <span className="font-bold text-xl">
                    AOCA Resources Limited
                  </span>
                </Link>
                <button
                  className="p-2 rounded-md hover:bg-muted/50 transition-colors"
                  onClick={toggleMenu}
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <nav className="flex flex-col gap-4 p-6 bg-white">
                <a
                  href="#pathways"
                  className="text-lg font-medium py-2 hover:text-primary transition-colors"
                  onClick={toggleMenu}
                >
                  Pathways
                </a>
                <a
                  href="#courses"
                  className="text-lg font-medium py-2 hover:text-primary transition-colors"
                  onClick={toggleMenu}
                >
                  Courses
                </a>
                <a
                  href="/blogs"
                  className="text-lg font-medium py-2 hover:text-primary transition-colors"
                  onClick={toggleMenu}
                >
                  Blog
                </a>
                <Link
                  to="/about"
                  className="text-lg font-medium py-2 hover:text-primary transition-colors"
                  onClick={toggleMenu}
                >
                  About Us
                </Link>
                <Link
                  to="/contact"
                  className="text-lg font-medium py-2 hover:text-primary transition-colors"
                  onClick={toggleMenu}
                >
                  Contact
                </Link>
                <Link
                  to="/login"
                  className="text-lg font-medium py-2 hover:text-primary transition-colors"
                  onClick={toggleMenu}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="mt-4 bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
                  onClick={toggleMenu}
                >
                  Register
                </Link>
              </nav>
            </div>
          </motion.div>
        )}
      </header> */}

      <Header pathwaysRef={pathwaysRef} coursesRef={coursesRef} />

      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/5 z-0" />
        <motion.div
          style={{ opacity, scale }}
          className="container mx-auto px-4 relative z-10"
          ref={targetRef}
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  Your Gateway to <span className="text-primary">German</span>{" "}
                  Opportunities
                </h1>
              </motion.div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-xl text-muted-foreground"
              >
                Professional German language training, visa consultancy, and
                recruitment services to help Nigerians achieve their
                international dreams.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link
                  to="/register"
                  className="bg-primary text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-primary/90 transition-colors"
                >
                  Start Learning
                </Link>
                <Link
                  to="/contact"
                  className="border border-input bg-background px-6 py-3 rounded-md text-lg font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  Contact Us
                </Link>
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="relative h-[400px] w-full rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://img.freepik.com/free-vector/cartoon-working-day-illustration_23-2148957047.jpg?t=st=1742664050~exp=1742667650~hmac=02ee70feee0252908460f36c19d158835a78b7633203586799c26ed6fc99d4d0&w=1800"
                  alt="Global opportunities"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-background p-4 rounded-lg shadow-lg">
                <div className="flex items-center gap-2">
                  <div className="bg-primary/20 p-2 rounded-full">
                    <GraduationCap className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Success Rate</p>
                    <p className="text-2xl font-bold">98%</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Germany Travel Pathways Section */}
      <section id="pathways" className="py-20 bg-muted/50" ref={pathwaysRef}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              Germany Travel Pathways
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-muted-foreground max-w-2xl mx-auto"
            >
              Comprehensive solutions to help you achieve your German
              immigration goals
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {pathways.map((pathway, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="bg-white rounded-lg shadow-md h-full hover:shadow-lg transition-shadow">
                  <div className="p-6 flex flex-col h-full">
                    <div className="mb-4">{pathway.icon}</div>
                    <h3 className="text-xl font-bold mb-2">{pathway.title}</h3>
                    <p className="text-muted-foreground mb-6 flex-grow">
                      {pathway.description}
                    </p>
                    <button className="border border-input bg-background px-4 py-2 rounded-md w-full flex justify-between items-center group hover:bg-accent hover:text-accent-foreground transition-colors">
                      Learn More
                      <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* German Courses Section */}
      <section id="courses" className="py-20" ref={coursesRef}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              German Courses
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-muted-foreground max-w-2xl mx-auto"
            >
              Professional German language courses with certified instructors
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {courses.map((course, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-background rounded-xl p-6 text-center shadow-md border"
              >
                <div className="mb-4 flex justify-center">
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-3xl font-bold text-primary">
                      {course.level}
                    </span>
                  </div>
                </div>
                <h3 className="font-bold text-lg mb-1">{course.name}</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Level {course.level}
                </p>
                <div className="space-y-2 text-left mb-6">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" />
                    <span className="text-sm">3 months duration</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Video className="h-4 w-4 text-primary" />
                    <span className="text-sm">Live online classes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-primary" />
                    <span className="text-sm">Certification exam prep</span>
                  </div>
                </div>
                <Link
                  to="/register"
                  className="inline-block w-full bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
                >
                  Enroll Now
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-12 text-center"
          >
            <Link
              to="/contact"
              className="border border-input bg-background px-6 py-3 rounded-md text-lg font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              Request Course Information
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              Latest from Our Blog
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-muted-foreground max-w-2xl mx-auto"
            >
              Insights, guides, and news about German visa applications,
              language learning, and international opportunities
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <img
                    src={post.featured_image || "/placeholder.svg"}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 bg-primary text-white text-xs font-semibold px-2 py-1 rounded">
                    {post.category}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 hover:text-primary transition-colors">
                    <a href={`/blog/${post._id}`}>{post.title}</a>
                  </h3>
                  <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      <span>{post.author.name}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{formatCreatedAt(post.created_at)}</span>
                    </div>
                  </div>
                  <a
                    href={`/blog/${post._id}`}
                    className="inline-flex items-center text-primary font-medium hover:underline"
                  >
                    Read More
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-12 text-center"
            onClick={() => navigate("/blogs")}
          >
            <button className="border border-input bg-background px-6 py-3 rounded-md text-lg font-medium hover:bg-accent hover:text-accent-foreground transition-colors">
              View All Articles
            </button>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              Success Stories
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-muted-foreground max-w-2xl mx-auto"
            >
              Hear from our clients who have successfully achieved their German
              immigration goals
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="bg-white rounded-lg shadow-md h-full">
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="relative h-16 w-16 rounded-full overflow-hidden">
                        <img
                          src={testimonial.image || "/placeholder.svg"}
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">
                          {testimonial.name}
                        </h3>
                        <p className="text-muted-foreground">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                    <p className="text-muted-foreground italic">
                      "{testimonial.text}"
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold mb-6"
            >
              Ready to Start Your German Journey?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl mb-8 text-white/90"
            >
              Join our language courses, explore visa pathways, and take the
              first step toward your future in Germany.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                to="/register"
                className="bg-white text-primary px-6 py-3 rounded-md text-lg font-medium hover:bg-white/90 transition-colors"
              >
                Register Now
              </Link>
              <Link
                to="/contact"
                className="border border-white bg-transparent px-6 py-3 rounded-md text-lg font-medium hover:bg-white/10 transition-colors"
              >
                Contact Us
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

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
                  <a
                    href="#pathways"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Pathways
                  </a>
                </li>
                <li>
                  <a
                    href="#courses"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Courses
                  </a>
                </li>
                <li>
                  <a
                    href="#blog"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Blog
                  </a>
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
                  <MapPin className="h-5 w-5 mt-0.5" />
                  <div>
                    <p className="font-medium">Lagos Office:</p>
                    <p className="text-gray-400">
                      8 Bayo Adetuna Street off Sangotedo. Lagos.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <MapPin className="h-5 w-5 mt-0.5" />
                  <div>
                    <p className="font-medium">Port Harcourt Office:</p>
                    <p className="text-gray-400">
                      7 Salvation Avenue, Off Igbo Etche Road, Rumukwurusi, Port
                      Harcourt
                    </p>
                  </div>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  <span className="text-gray-400">
                    08038867495, 08036714612
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  <span className="text-gray-400">WhatsApp: 08038865466</span>
                </li>
                <li className="flex items-start gap-2">
                  <MessageSquare className="h-5 w-5 mt-0.5" />
                  <div>
                    <p className="text-gray-400">info@aocaresorcesltd.com</p>
                    <p className="text-gray-400">aocaresources@gmail.com</p>
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
              <h3 className="font-bold text-lg mb-4">Student Portal</h3>
              <Link
                to="/login"
                className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors inline-block"
              >
                Login to Dashboard
              </Link>
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

export default App;
