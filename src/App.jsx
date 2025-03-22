"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Calendar,
  ChevronRight,
  Globe,
  GraduationCap,
  Languages,
  MapPin,
  Menu,
  MessageSquare,
  Phone,
  User,
  X,
} from "lucide-react";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);
  const targetRef = useRef(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const services = [
    {
      title: "Visa Consultancy",
      description:
        "Expert guidance on visa applications for study, work, and immigration to various countries.",
      icon: <Globe className="h-10 w-10 text-primary" />,
    },
    {
      title: "Language Learning",
      description:
        "Professional language courses in German, French, Spanish, and more with certified instructors.",
      icon: <Languages className="h-10 w-10 text-primary" />,
    },
    {
      title: "Recruitment Services",
      description:
        "Connecting Nigerian talent with German employers through our specialized recruitment program.",
      icon: <GraduationCap className="h-10 w-10 text-primary" />,
    },
  ];

  const languages = [
    {
      name: "German",
      level: "A1-C2",
      flag: "https://img.freepik.com/free-vector/illustration-german-flag_53876-27101.jpg?t=st=1742664322~exp=1742667922~hmac=83aa88f70986769cb5a36b489cea632f0938a027eaedfcd4842959f16ed83178&w=2000",
    },
    {
      name: "French",
      level: "A1-C2",
      flag: "https://img.freepik.com/free-vector/illustration-france-flag_53876-27099.jpg?t=st=1742664355~exp=1742667955~hmac=f29bba22cc8b265dce7f821aa8a419aca3a1fe77115823ed263a0310a37bac86&w=2000",
    },
    {
      name: "Spanish",
      level: "A1-C2",
      flag: "https://img.freepik.com/free-vector/illustration-spain-flag_53876-18168.jpg?t=st=1742664385~exp=1742667985~hmac=cf8956023135d7e7ccdd59db6ccfcf72fddb8996b4e6aea4b7391f9d40e9d0e6&w=2000",
    },
    {
      name: "Italian",
      level: "A1-B2",
      flag: "https://img.freepik.com/free-vector/illustration-italy-flag_53876-27098.jpg?t=st=1742664410~exp=1742668010~hmac=4c7a357a48ba009d2f0095af1662121761d60eea3ad31430fc0430a65fa0fc75&w=2000",
    },
    {
      name: "Dutch",
      level: "A1-B2",
      flag: "https://img.freepik.com/free-vector/illustration-netherlands-flag_53876-27103.jpg?t=st=1742664436~exp=1742668036~hmac=a30b9904ee5058eefb5f36e37ff5d3eb2bcbca8fcbac90b4d950cad9589fb06e&w=2000",
    },
    {
      name: "Portuguese",
      level: "A1-B2",
      flag: "https://img.freepik.com/free-vector/illustration-portugal-flag_53876-18170.jpg?t=st=1742664464~exp=1742668064~hmac=346bcd1e8048e75ea536cf3d5c8fd436216875e60f4accfa752fbe8eb92a5777&w=2000",
    },
  ];

  const testimonials = [
    {
      name: "Chioma A.",
      role: "Student",
      text: "The German language course was excellent! I passed my A1 exam with flying colors and got my student visa approved.",
      image:
        "https://img.freepik.com/free-photo/casual-young-african-man-smiling-isolated-white_93675-128895.jpg?t=st=1742664596~exp=1742668196~hmac=c2c3fed3817ef575a238444daa65d048894b9904b08e5cf70c7b579226c54cfe&w=1380",
    },
    {
      name: "Emmanuel O.",
      role: "IT Professional",
      text: "Thanks to their recruitment services, I secured a job with a top German tech company. The visa process was smooth and well-guided.",
      image:
        "https://img.freepik.com/free-photo/confident-business-woman-portrait-smiling-face_53876-137693.jpg?t=st=1742664616~exp=1742668216~hmac=03f23f509c161478460b977f81d6b4661aca3a866923e3c6b0fa0d1675968fcc&w=1480",
    },
    {
      name: "Blessing M.",
      role: "Healthcare Worker",
      text: "From language training to visa application, they handled everything professionally. Now I'm working as a nurse in Germany.",
      image:
        "https://img.freepik.com/free-photo/man-with-arms-crossed_23-2148666516.jpg?t=st=1742664635~exp=1742668235~hmac=05ab8e61175572eb67a7a316c7e9dc15942a2f640cedc993f427363842c5f8a3&w=1060",
    },
  ];

  const blogPosts = [
    {
      title: "Complete Guide to German Student Visa Application",
      excerpt:
        "Learn everything you need to know about applying for a German student visa, from documentation to interview preparation.",
      date: "October 15, 2023",
      author: "Dr. Adebayo Johnson",
      category: "Visa Guides",
      image:
        "https://img.freepik.com/free-vector/woman-tourist-with-global-map-passport_24877-53474.jpg?t=st=1742664124~exp=1742667724~hmac=acba006c9c652fde40912876f38d4cc25f92cb99f2084b59c48915667f9215f8&w=1380",
      slug: "german-student-visa-guide",
    },
    {
      title: "Top 10 In-Demand Jobs in Germany for Foreigners",
      excerpt:
        "Discover the most sought-after professions in Germany and how to position yourself for employment opportunities.",
      date: "September 28, 2023",
      author: "Ngozi Okafor",
      category: "Career Advice",
      image:
        "https://img.freepik.com/free-vector/job-vacancy-background-with-chair-flat-style_23-2147875408.jpg?t=st=1742664225~exp=1742667825~hmac=6b2f92e8c533455ac789811eff6338d5d1964ea0fcaa53f27f42dec68800415a&w=1060",
      slug: "in-demand-jobs-germany",
    },
    {
      title: "How to Master German Language Quickly: Proven Methods",
      excerpt:
        "Effective strategies and techniques to accelerate your German language learning journey from beginner to fluent speaker.",
      date: "August 12, 2023",
      author: "Prof. Chibuike Eze",
      category: "Language Learning",
      image:
        "https://img.freepik.com/free-vector/oktoberfest-germany-celebration_24908-56011.jpg?t=st=1742664266~exp=1742667866~hmac=aa85b1b9726b3b8f33c299cac6d5d0380a2268f82340dff332a38d6e0cc93f15&w=1060",
      slug: "master-german-quickly",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <a href="/" className="flex items-center gap-2">
            <Globe className="h-8 w-8 text-primary" />
            <span className="font-bold text-xl">AOCA Resources Limited</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <a
              href="#services"
              className="text-foreground/80 hover:text-primary transition-colors"
            >
              Services
            </a>
            <a
              href="#languages"
              className="text-foreground/80 hover:text-primary transition-colors"
            >
              Languages
            </a>
            <a
              href="#blog"
              className="text-foreground/80 hover:text-primary transition-colors"
            >
              Blog
            </a>
            <a
              href="#testimonials"
              className="text-foreground/80 hover:text-primary transition-colors"
            >
              Testimonials
            </a>
            <a
              href="#about"
              className="text-foreground/80 hover:text-primary transition-colors"
            >
              About Us
            </a>
            <a
              href="#contact"
              className="text-foreground/80 hover:text-primary transition-colors"
            >
              Contact
            </a>
            <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors">
              Get Started
            </button>
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
            className="fixed inset-0 bg-white z-50 md:hidden"
          >
            <div className="flex flex-col h-full bg-white">
              <div className="flex justify-between items-center p-4 border-b">
                <a href="/" className="flex items-center gap-2">
                  <Globe className="h-8 w-8 text-primary" />
                  <span className="font-bold text-xl">
                    AOCA Resources Limited
                  </span>
                </a>
                <button
                  className="p-2 rounded-md hover:bg-muted/50 transition-colors"
                  onClick={toggleMenu}
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <nav className="flex flex-col gap-4 p-6 bg-white">
                <a
                  href="#services"
                  className="text-lg font-medium py-2 hover:text-primary transition-colors"
                  onClick={toggleMenu}
                >
                  Services
                </a>
                <a
                  href="#languages"
                  className="text-lg font-medium py-2 hover:text-primary transition-colors"
                  onClick={toggleMenu}
                >
                  Languages
                </a>
                <a
                  href="#blog"
                  className="text-lg font-medium py-2 hover:text-primary transition-colors"
                  onClick={toggleMenu}
                >
                  Blog
                </a>
                <a
                  href="#testimonials"
                  className="text-lg font-medium py-2 hover:text-primary transition-colors"
                  onClick={toggleMenu}
                >
                  Testimonials
                </a>
                <a
                  href="#about"
                  className="text-lg font-medium py-2 hover:text-primary transition-colors"
                  onClick={toggleMenu}
                >
                  About Us
                </a>
                <a
                  href="#contact"
                  className="text-lg font-medium py-2 hover:text-primary transition-colors"
                  onClick={toggleMenu}
                >
                  Contact
                </a>
                <button className="mt-4 bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors">
                  Get Started
                </button>
              </nav>
            </div>
          </motion.div>
        )}
      </header>

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
                  Your Gateway to Global{" "}
                  <span className="text-primary">Opportunities</span>
                </h1>
              </motion.div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-xl text-muted-foreground"
              >
                Professional visa consultancy, language learning, and
                recruitment services to help Nigerians achieve their
                international dreams.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <button className="bg-primary text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-primary/90 transition-colors">
                  Explore Services
                </button>
                <button className="border border-input bg-background px-6 py-3 rounded-md text-lg font-medium hover:bg-accent hover:text-accent-foreground transition-colors">
                  Contact Us
                </button>
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

      {/* Services Section */}
      <section id="services" className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              Our Services
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-muted-foreground max-w-2xl mx-auto"
            >
              Comprehensive solutions to help you achieve your international
              goals
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="bg-white rounded-lg shadow-md h-full hover:shadow-lg transition-shadow">
                  <div className="p-6 flex flex-col h-full">
                    <div className="mb-4">{service.icon}</div>
                    <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                    <p className="text-muted-foreground mb-6 flex-grow">
                      {service.description}
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

      {/* Languages Section */}
      <section id="languages" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              Languages We Teach
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-muted-foreground max-w-2xl mx-auto"
            >
              Professional language courses with certified instructors
            </motion.p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {languages.map((language, index) => (
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
                  <img
                    src={language.flag || "/placeholder.svg"}
                    alt={language.name}
                    className="w-[60px] h-[40px] rounded"
                  />
                </div>
                <h3 className="font-bold text-lg mb-1">{language.name}</h3>
                <p className="text-muted-foreground text-sm">
                  {language.level}
                </p>
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
            <button className="bg-primary text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-primary/90 transition-colors">
              View All Courses
            </button>
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
              Insights, guides, and news about visa applications, language
              learning, and international opportunities
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
                    <a href={`/blog/${post.slug}`}>{post.title}</a>
                  </h3>
                  <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{post.date}</span>
                    </div>
                  </div>
                  <a
                    href={`/blog/${post.slug}`}
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
              Hear from our clients who have successfully achieved their
              international goals
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

      {/* About Section */}
      <section id="about" className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="relative h-[500px] w-full rounded-2xl overflow-hidden shadow-xl">
                <img
                  src="https://img.freepik.com/free-photo/business-people-doing-teamwork-startup-presentation-anlayzing-research-data-information-documents-planning-report-project-with-notes-paperwork-files-office-with-big-windows_482257-49771.jpg?t=st=1742664704~exp=1742668304~hmac=b2c3a671eead2d806d89d1224dd343e6cfe48af532779b94ce8481a0074537a7&w=2000"
                  alt="About AOCA Resources Limited"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-primary p-6 rounded-lg shadow-lg">
                <p className="text-primary-foreground text-lg font-bold">
                  Established 2010
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <h2 className="text-3xl md:text-4xl font-bold">
                About AOCA Resources Limited
              </h2>
              <p className="text-muted-foreground">
                AOCA Resources Limited is a leading visa consultancy, language
                learning, and recruitment agency based in Lagos, Nigeria. With
                over a decade of experience, we have helped thousands of
                Nigerians achieve their dreams of studying, working, and living
                abroad.
              </p>
              <p className="text-muted-foreground">
                Our team of experienced consultants and language instructors are
                dedicated to providing personalized services tailored to meet
                your specific needs. We pride ourselves on our high success rate
                and the trust our clients place in us.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="flex items-center gap-2">
                  <div className="bg-primary/20 p-2 rounded-full">
                    <GraduationCap className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Successful Visas</p>
                    <p className="text-2xl font-bold">5000+</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="bg-primary/20 p-2 rounded-full">
                    <Languages className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Language Students</p>
                    <p className="text-2xl font-bold">10,000+</p>
                  </div>
                </div>
              </div>
              <button className="border border-input bg-background px-6 py-3 rounded-md text-lg font-medium hover:bg-accent hover:text-accent-foreground transition-colors mt-4">
                Learn More About Us
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              Get In Touch
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-muted-foreground max-w-2xl mx-auto"
            >
              Have questions? Contact us today for a consultation
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-4">
                <div className="bg-primary/20 p-3 rounded-full">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Visit Us</h3>
                  <p className="text-muted-foreground">
                    123 Victoria Island, Lagos, Nigeria
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-primary/20 p-3 rounded-full">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Call Us</h3>
                  <p className="text-muted-foreground">+234 123 456 7890</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-primary/20 p-3 rounded-full">
                  <MessageSquare className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Email Us</h3>
                  <p className="text-muted-foreground">
                    info@aocaresources.com
                  </p>
                </div>
              </div>
              <div className="pt-6">
                <div className="relative h-[300px] w-full rounded-xl overflow-hidden">
                  <img
                    src="https://img.freepik.com/free-vector/informational-city-map-with-streets-name_23-2148309621.jpg?t=st=1742665016~exp=1742668616~hmac=b85ca40aac58c0038ecc0d49ba48fab2f91632e9071f10ef70742b39bcdbba69&w=1800"
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
                  <h3 className="font-bold text-xl mb-6">Send Us a Message</h3>
                  <form className="space-y-4">
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
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-sm font-medium">
                        Phone
                      </label>
                      <input
                        id="phone"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="service" className="text-sm font-medium">
                        Service Interested In
                      </label>
                      <select
                        id="service"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="">Select a service</option>
                        <option value="visa">Visa Consultancy</option>
                        <option value="language">Language Learning</option>
                        <option value="recruitment">
                          Recruitment Services
                        </option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">
                        Message
                      </label>
                      <textarea
                        id="message"
                        rows={4}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      ></textarea>
                    </div>
                    <button className="w-full bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors">
                      Send Message
                    </button>
                  </form>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <a href="/" className="flex items-center gap-2 mb-4">
                <Globe className="h-8 w-8" />
                <span className="font-bold text-xl">
                  AOCA Resources Limited
                </span>
              </a>
              <p className="text-primary-foreground/80 mb-4">
                Your trusted partner for visa consultancy, language learning,
                and recruitment services.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#services"
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  >
                    Services
                  </a>
                </li>
                <li>
                  <a
                    href="#languages"
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  >
                    Languages
                  </a>
                </li>
                <li>
                  <a
                    href="#blog"
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#testimonials"
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  >
                    Testimonials
                  </a>
                </li>
                <li>
                  <a
                    href="#about"
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Services</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  >
                    Visa Consultancy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  >
                    Language Learning
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  >
                    Recruitment Services
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  >
                    Study Abroad
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  >
                    Immigration Services
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Contact</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span className="text-primary-foreground/80">
                    123 Victoria Island, Lagos, Nigeria
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span className="text-primary-foreground/80">
                    +234 123 456 7890
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  <span className="text-primary-foreground/80">
                    info@aocaresources.com
                  </span>
                </li>
              </ul>
              <div className="mt-4 flex gap-4">
                <a
                  href="#"
                  className="bg-primary-foreground/20 p-2 rounded-full hover:bg-primary-foreground/30 transition-colors"
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
                  className="bg-primary-foreground/20 p-2 rounded-full hover:bg-primary-foreground/30 transition-colors"
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
                  className="bg-primary-foreground/20 p-2 rounded-full hover:bg-primary-foreground/30 transition-colors"
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
          <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center">
            <p className="text-primary-foreground/80">
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
