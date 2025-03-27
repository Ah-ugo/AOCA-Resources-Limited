"use client";

import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Globe, Menu, X } from "lucide-react";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Pathways", path: "/application-process" },
    { name: "Courses", path: "/pricing" },
    { name: "Blog", path: "/blog" },
    { name: "Events", path: "/events" },
    { name: "Success Stories", path: "/success-stories" },
    { name: "FAQ", path: "/faq" },
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <Globe className="h-8 w-8 text-primary" />
          <span className="font-bold text-xl">AOCA Resources Limited</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-4">
          {navItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className={`px-2 py-1 text-sm rounded-md transition-colors ${
                isActive(item.path)
                  ? "text-primary font-medium"
                  : "text-foreground/80 hover:text-primary"
              }`}
            >
              {item.name}
            </Link>
          ))}
          <Link
            to="/login"
            className="text-foreground/80 hover:text-primary transition-colors ml-2"
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

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-md hover:bg-muted/50 transition-colors"
          onClick={toggleMenu}
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, x: "100%" }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: "100%" }}
          className="fixed inset-0 bg-background z-50 md:hidden"
        >
          <div className="flex flex-col h-full">
            <div className="flex justify-between items-center p-4 border-b">
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
            <nav className="flex flex-col gap-2 p-6 overflow-y-auto">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  className={`text-lg font-medium py-2 hover:text-primary transition-colors ${
                    isActive(item.path) ? "text-primary" : ""
                  }`}
                  onClick={toggleMenu}
                >
                  {item.name}
                </Link>
              ))}
              <div className="border-t my-4 pt-4">
                <Link
                  to="/login"
                  className="block text-lg font-medium py-2 hover:text-primary transition-colors"
                  onClick={toggleMenu}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="mt-4 bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors block text-center"
                  onClick={toggleMenu}
                >
                  Register
                </Link>
              </div>
            </nav>
          </div>
        </motion.div>
      )}
    </header>
  );
}

export default Header;
