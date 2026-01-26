/** @format */

'use client';

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Globe,
  GraduationCap,
  Languages,
  MapPin,
  MessageSquare,
  Phone,
  CheckCircle,
} from 'lucide-react';
import ukaegbuImage from '../assets/ukaegbu.jpeg';
import Header from '../components/Header';
import Footer2 from '../components/Footer2';

function AboutUs() {
  return (
    <div className='min-h-screen bg-background'>
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
            <Link
              to="/#blog"
              className="text-foreground/80 hover:text-primary transition-colors"
            >
              Blog
            </Link>
            <Link to="/about" className="text-primary font-medium">
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
      <main className='pt-24 pb-16'>
        {/* Hero Section */}
        <section className='bg-primary/10 py-16'>
          <div className='container mx-auto px-4'>
            <div className='max-w-3xl mx-auto text-center'>
              <h1 className='text-4xl md:text-5xl font-bold mb-6'>
                About AOCA Resources Limited
              </h1>
              <p className='text-xl text-gray-600'>
                Your trusted partner for German language training, visa
                consultancy, and recruitment services.
              </p>
            </div>
          </div>
        </section>

        {/* About Content */}
        <section className='py-16'>
          <div className='container mx-auto px-4'>
            <div className='grid md:grid-cols-2 gap-12 items-center'>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className='relative'
              >
                <div className='relative h-[500px] w-full rounded-2xl overflow-hidden shadow-xl'>
                  <img
                    src='https://img.freepik.com/free-vector/tropical-vacation-air-travel-service-composition_98292-6990.jpg?t=st=1743321671~exp=1743325271~hmac=7e621fbb8758e3e2e85f53d5b513e9e876d89e957d33e3daef40d151e9106688&w=1060'
                    alt='About AOCA Resources Limited'
                    className='w-full h-full object-cover'
                  />
                </div>
                <div className='absolute -bottom-6 -right-6 bg-primary p-6 rounded-lg shadow-lg'>
                  <p className='text-primary-foreground text-lg font-bold'>
                    Established 2010
                  </p>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className='space-y-6'
              >
                <h2 className='text-3xl font-bold'>Our Story</h2>
                <p className='text-gray-600'>
                  AOCA Resources Limited is a resource centre that specialises
                  in German and other EU language training, German and EU visa
                  travels and logistics, and German employers to foreign
                  employee recruitment and human resources services.
                </p>
                <p className='text-gray-600'>
                  We offer advice and support to all seeking a pathway to
                  Germany and/or other EU countries. Our team of experienced
                  consultants and language instructors are dedicated to
                  providing personalized services tailored to meet your specific
                  needs.
                </p>
                <p className='text-gray-600'>
                  With over a decade of experience, we have helped thousands of
                  Nigerians achieve their dreams of studying, working, and
                  living abroad. We pride ourselves on our high success rate and
                  the trust our clients place in us.
                </p>
                <div className='grid grid-cols-2 gap-4 pt-4'>
                  <div className='flex items-center gap-2'>
                    <div className='bg-primary/20 p-2 rounded-full'>
                      <GraduationCap className='h-5 w-5 text-primary' />
                    </div>
                    <div>
                      <p className='font-medium'>Successful Visas</p>
                      <p className='text-2xl font-bold'>5000+</p>
                    </div>
                  </div>
                  <div className='flex items-center gap-2'>
                    <div className='bg-primary/20 p-2 rounded-full'>
                      <Languages className='h-5 w-5 text-primary' />
                    </div>
                    <div>
                      <p className='font-medium'>Language Students</p>
                      <p className='text-2xl font-bold'>10,000+</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Our Services */}
        <section className='py-16 bg-gray-50'>
          <div className='container mx-auto px-4'>
            <div className='max-w-3xl mx-auto text-center mb-12'>
              <h2 className='text-3xl font-bold mb-4'>What We Offer</h2>
              <p className='text-gray-600'>
                We provide comprehensive solutions to help you achieve your
                international goals
              </p>
            </div>

            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
              <div className='bg-white rounded-lg shadow-md p-6'>
                <div className='w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4'>
                  <Languages className='h-6 w-6 text-primary' />
                </div>
                <h3 className='text-xl font-bold mb-3'>Language Training</h3>
                <p className='text-gray-600 mb-4'>
                  Professional German language courses from A1 to B2 level with
                  certified instructors. Our courses are designed to help you
                  achieve fluency and pass official certification exams.
                </p>
                <ul className='space-y-2'>
                  <li className='flex items-start gap-2'>
                    <CheckCircle className='h-5 w-5 text-primary mt-0.5' />
                    <span>Beginner to advanced levels</span>
                  </li>
                  <li className='flex items-start gap-2'>
                    <CheckCircle className='h-5 w-5 text-primary mt-0.5' />
                    <span>Certified instructors</span>
                  </li>
                  <li className='flex items-start gap-2'>
                    <CheckCircle className='h-5 w-5 text-primary mt-0.5' />
                    <span>Exam preparation</span>
                  </li>
                </ul>
              </div>

              <div className='bg-white rounded-lg shadow-md p-6'>
                <div className='w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4'>
                  <Globe className='h-6 w-6 text-primary' />
                </div>
                <h3 className='text-xl font-bold mb-3'>Visa Consultancy</h3>
                <p className='text-gray-600 mb-4'>
                  Expert guidance on visa applications for study, work, and
                  immigration to Germany and other EU countries. We handle the
                  entire process from documentation to interview preparation.
                </p>
                <ul className='space-y-2'>
                  <li className='flex items-start gap-2'>
                    <CheckCircle className='h-5 w-5 text-primary mt-0.5' />
                    <span>Application assistance</span>
                  </li>
                  <li className='flex items-start gap-2'>
                    <CheckCircle className='h-5 w-5 text-primary mt-0.5' />
                    <span>Document verification</span>
                  </li>
                  <li className='flex items-start gap-2'>
                    <CheckCircle className='h-5 w-5 text-primary mt-0.5' />
                    <span>Interview coaching</span>
                  </li>
                </ul>
              </div>

              <div className='bg-white rounded-lg shadow-md p-6'>
                <div className='w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4'>
                  <GraduationCap className='h-6 w-6 text-primary' />
                </div>
                <h3 className='text-xl font-bold mb-3'>Recruitment Services</h3>
                <p className='text-gray-600 mb-4'>
                  Connecting Nigerian talent with German employers through our
                  specialized recruitment program. We help match your skills
                  with the right opportunities abroad.
                </p>
                <ul className='space-y-2'>
                  <li className='flex items-start gap-2'>
                    <CheckCircle className='h-5 w-5 text-primary mt-0.5' />
                    <span>Job placement</span>
                  </li>
                  <li className='flex items-start gap-2'>
                    <CheckCircle className='h-5 w-5 text-primary mt-0.5' />
                    <span>Career counseling</span>
                  </li>
                  <li className='flex items-start gap-2'>
                    <CheckCircle className='h-5 w-5 text-primary mt-0.5' />
                    <span>Employer connections</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className='py-16'>
          <div className='container mx-auto px-4'>
            <div className='max-w-3xl mx-auto text-center mb-12'>
              <h2 className='text-3xl font-bold mb-4'>Our Team</h2>
              <p className='text-gray-600'>
                Meet our dedicated team of professionals committed to helping
                you achieve your international goals
              </p>
            </div>

            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
              <div className='bg-white rounded-lg shadow-md overflow-hidden'>
                <div className='h-64 overflow-hidden'>
                  <img
                    src={ukaegbuImage}
                    alt='Team Member'
                    className='w-full h-full object-cover'
                  />
                </div>
                <div className='p-6'>
                  <h3 className='text-xl font-bold mb-1'>Obinna Ukaegbu</h3>
                  <p className='text-primary font-medium mb-3'>
                    MD and Principal Partner
                  </p>
                  <p className='text-gray-600'>
                    A Nigerian based German Resident with a track records of
                    accomplishments on German visa travels, German job recruiter
                    and a seasoned advisor and consultant on visa and travel and
                    related matters.
                  </p>
                </div>
              </div>

              {/* <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-64 overflow-hidden">
                  <img
                    src="https://via.placeholder.com/400x400"
                    alt="Team Member"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1">Frau Schmidt</h3>
                  <p className="text-primary font-medium mb-3">
                    Head German Instructor
                  </p>
                  <p className="text-gray-600">
                    A native German speaker with a master's in German
                    linguistics and over 10 years of teaching experience.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-64 overflow-hidden">
                  <img
                    src="https://via.placeholder.com/400x400"
                    alt="Team Member"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1">Ngozi Okafor</h3>
                  <p className="text-primary font-medium mb-3">
                    Visa Consultant
                  </p>
                  <p className="text-gray-600">
                    Specializes in German visa applications with a 98% success
                    rate and extensive knowledge of immigration procedures.
                  </p>
                </div>
              </div> */}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className='py-16 bg-primary text-white'>
          <div className='container mx-auto px-4'>
            <div className='max-w-3xl mx-auto text-center'>
              <h2 className='text-3xl font-bold mb-6'>
                Ready to Start Your German Journey?
              </h2>
              <p className='text-xl mb-8 text-white/90'>
                Join our language courses, explore visa pathways, and take the
                first step toward your future in Germany.
              </p>
              <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                <Link
                  to='/register'
                  className='bg-white text-primary px-6 py-3 rounded-md text-lg font-medium hover:bg-white/90 transition-colors'
                >
                  Register Now
                </Link>
                <Link
                  to='/contact'
                  className='border border-white bg-transparent px-6 py-3 rounded-md text-lg font-medium hover:bg-white/10 transition-colors'
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer2 />
    </div>
  );
}

export default AboutUs;
