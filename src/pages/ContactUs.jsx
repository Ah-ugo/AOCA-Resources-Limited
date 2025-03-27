"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Globe,
  MapPin,
  MessageSquare,
  Phone,
  Mail,
  Send,
  CheckCircle,
} from "lucide-react";

function ContactUs() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);

      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSuccess(false);
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          service: "",
          message: "",
        });
      }, 3000);
    }, 1500);
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
            <Link
              to="/#blog"
              className="text-foreground/80 hover:text-primary transition-colors"
            >
              Blog
            </Link>
            <Link
              to="/about"
              className="text-foreground/80 hover:text-primary transition-colors"
            >
              About Us
            </Link>
            <Link to="/contact" className="text-primary font-medium">
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
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Contact Us
              </h1>
              <p className="text-xl text-gray-600">
                Get in touch with our team for inquiries about our services
              </p>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-3xl font-bold mb-6">Get In Touch</h2>
                  <p className="text-gray-600 mb-8">
                    Have questions about our services? Contact us today and our
                    team will be happy to assist you with any inquiries.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">Lagos Office</h3>
                      <p className="text-gray-600">
                        8 Bayo Adetuna Street off Sangotedo. Lagos.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">
                        Port Harcourt Office
                      </h3>
                      <p className="text-gray-600">
                        7 Salvation Avenue, Off Igbo Etche Road, Rumukwurusi,
                        Port Harcourt
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">Call Us</h3>
                      <p className="text-gray-600">08038867495, 08036714612</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <MessageSquare className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">WhatsApp</h3>
                      <p className="text-gray-600">08038865466</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">Email Us</h3>
                      <p className="text-gray-600">info@aocaresorcesltd.com</p>
                      <p className="text-gray-600">aocaresources@gmail.com</p>
                    </div>
                  </div>
                </div>

                <div className="pt-6">
                  <div className="relative h-[300px] w-full rounded-xl overflow-hidden">
                    <img
                      src="https://img.freepik.com/free-photo/business-people-doing-teamwork-startup-presentation-anlayzing-research-data-information-documents-planning-report-project-with-notes-paperwork-files-office-with-big-windows_482257-49771.jpg?t=st=1742664704~exp=1742668304~hmac=b2c3a671eead2d806d89d1224dd343e6cfe48af532779b94ce8481a0074537a7&w=2000"
                      alt="Office location"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="bg-white rounded-lg shadow-md">
                  <div className="p-6">
                    <h3 className="font-bold text-xl mb-6">
                      Send Us a Message
                    </h3>

                    {isSuccess ? (
                      <div className="bg-green-50 border border-green-200 rounded-md p-4 text-center">
                        <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-3" />
                        <h4 className="text-lg font-medium text-green-800 mb-1">
                          Message Sent!
                        </h4>
                        <p className="text-green-600">
                          Thank you for contacting us. We'll get back to you
                          shortly.
                        </p>
                      </div>
                    ) : (
                      <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label
                              htmlFor="firstName"
                              className="text-sm font-medium"
                            >
                              First Name
                            </label>
                            <input
                              id="firstName"
                              name="firstName"
                              value={formData.firstName}
                              onChange={handleChange}
                              required
                              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                          </div>
                          <div className="space-y-2">
                            <label
                              htmlFor="lastName"
                              className="text-sm font-medium"
                            >
                              Last Name
                            </label>
                            <input
                              id="lastName"
                              name="lastName"
                              value={formData.lastName}
                              onChange={handleChange}
                              required
                              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label
                            htmlFor="email"
                            className="text-sm font-medium"
                          >
                            Email
                          </label>
                          <input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                        </div>
                        <div className="space-y-2">
                          <label
                            htmlFor="phone"
                            className="text-sm font-medium"
                          >
                            Phone
                          </label>
                          <input
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                        </div>
                        <div className="space-y-2">
                          <label
                            htmlFor="service"
                            className="text-sm font-medium"
                          >
                            Service Interested In
                          </label>
                          <select
                            id="service"
                            name="service"
                            value={formData.service}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          >
                            <option value="">Select a service</option>
                            <option value="language">
                              German Language Course
                            </option>
                            <option value="nursing">
                              Nursing Work Contract
                            </option>
                            <option value="ausbildung">
                              Ausbildung Training
                            </option>
                            <option value="study">Study Pathway</option>
                            <option value="job">Job Seeker Pathway</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label
                            htmlFor="message"
                            className="text-sm font-medium"
                          >
                            Message
                          </label>
                          <textarea
                            id="message"
                            name="message"
                            rows={4}
                            value={formData.message}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          ></textarea>
                        </div>
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
                        >
                          {isSubmitting ? (
                            "Sending..."
                          ) : (
                            <>
                              <Send className="h-4 w-4" />
                              Send Message
                            </>
                          )}
                        </button>
                      </form>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Visit Our Offices</h2>
              <p className="text-gray-600">
                We have offices in Lagos and Port Harcourt to serve you better
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-4 bg-primary text-white">
                  <h3 className="font-bold">Lagos Office</h3>
                </div>
                <div className="h-64">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.7286767086897!2d3.5638!3d6.4355!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMjYnMDcuOCJOIDPCsDMzJzQ5LjciRQ!5e0!3m2!1sen!2sng!4v1616603763408!5m2!1sen!2sng"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    title="Lagos Office Map"
                  ></iframe>
                </div>
                <div className="p-4">
                  <p className="text-gray-600">
                    8 Bayo Adetuna Street off Sangotedo. Lagos.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-4 bg-primary text-white">
                  <h3 className="font-bold">Port Harcourt Office</h3>
                </div>
                <div className="h-64">
                  <iframe
                    src="https://www.google
.com/maps/embed?pb=!1m18!1m12!1m3!1d3975.5741!2d7.0498!3d4.8156!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNMKwNDgnNTYuMiJOIDfCsDAyJzU5LjMiRQ!5e0!3m2!1sen!2sng!4v1616603763408!5m2!1sen!2sng"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    title="Port Harcourt Office Map"
                  ></iframe>
                </div>
                <div className="p-4">
                  <p className="text-gray-600">
                    7 Salvation Avenue, Off Igbo Etche Road, Rumukwurusi, Port
                    Harcourt
                  </p>
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
                    to="/#blog"
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

export default ContactUs;
