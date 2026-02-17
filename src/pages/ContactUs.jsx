/** @format */

'use client';

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Globe,
  MapPin,
  MessageSquare,
  Phone,
  Mail,
  Send,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import Header from '../components/Header';
import Footer2 from '../components/Footer2';

function ContactUs() {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch(
        'https://aoca-resources-backend.onrender.com/contact',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            accept: 'application/json',
          },
          body: JSON.stringify(formData),
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit form');
      }

      const data = await response.json();
      setIsSuccess(true);

      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSuccess(false);
        setFormData({
          first_name: '',
          last_name: '',
          email: '',
          phone: '',
          service: '',
          message: '',
        });
      }, 3000);
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='min-h-screen bg-background'>
      <Header />

      <main className='pt-24 pb-16'>
        {/* Hero Section */}
        <section className='bg-primary/10 py-16'>
          <div className='container mx-auto px-4'>
            <div className='max-w-3xl mx-auto text-center'>
              <h1 className='text-4xl md:text-5xl font-bold mb-6'>
                Contact Us
              </h1>
              <p className='text-xl text-gray-600'>
                Get in touch with our team for inquiries about our services
              </p>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className='py-16'>
          <div className='container mx-auto px-4'>
            <div className='grid md:grid-cols-2 gap-12'>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className='space-y-8'
              >
                <div>
                  <h2 className='text-3xl font-bold mb-6'>Get In Touch</h2>
                  <p className='text-gray-600 mb-8'>
                    Have questions about our services? Contact us today and our
                    team will be happy to assist you with any inquiries.
                  </p>
                </div>

                <div className='space-y-6'>
                  <div className='flex items-start gap-4'>
                    <div className='bg-primary/10 p-3 rounded-full'>
                      <MapPin className='h-6 w-6 text-primary' />
                    </div>
                    <div>
                      <h3 className='font-bold text-lg'>Lagos Office</h3>
                      <p className='text-gray-600'>
                        8 Bayo Adetuna Street off Sangotedo. Lagos.
                      </p>
                    </div>
                  </div>

                  <div className='flex items-start gap-4'>
                    <div className='bg-primary/10 p-3 rounded-full'>
                      <MapPin className='h-6 w-6 text-primary' />
                    </div>
                    <div>
                      <h3 className='font-bold text-lg'>
                        Port Harcourt Office
                      </h3>
                      <p className='text-gray-600'>
                        No 70 Eliogbolo Road, Rumuodumaya, Port Harcourt
                      </p>
                    </div>
                  </div>

                  <div className='flex items-center gap-4'>
                    <div className='bg-primary/10 p-3 rounded-full'>
                      <Phone className='h-6 w-6 text-primary' />
                    </div>
                    <div>
                      <h3 className='font-bold text-lg'>Call Us</h3>
                      <p className='text-gray-600'>
                        08038865466, +49 1522 1688675
                      </p>
                    </div>
                  </div>

                  <div className='flex items-center gap-4'>
                    <div className='bg-primary/10 p-3 rounded-full'>
                      <MessageSquare className='h-6 w-6 text-primary' />
                    </div>
                    <div>
                      <h3 className='font-bold text-lg'>WhatsApp</h3>
                      <p className='text-gray-600'>08038865466</p>
                    </div>
                  </div>

                  <div className='flex items-start gap-4'>
                    <div className='bg-primary/10 p-3 rounded-full'>
                      <Mail className='h-6 w-6 text-primary' />
                    </div>
                    <div>
                      <h3 className='font-bold text-lg'>Email Us</h3>
                      <p className='text-gray-600'>info@aocaresourcesltd.com</p>
                      <p className='text-gray-600'>aocaresources@gmail.com</p>
                    </div>
                  </div>
                </div>

                <div className='pt-6'>
                  <div className='relative h-[300px] w-full rounded-xl overflow-hidden'>
                    <img
                      src='https://img.freepik.com/free-photo/business-people-doing-teamwork-startup-presentation-anlayzing-research-data-information-documents-planning-report-project-with-notes-paperwork-files-office-with-big-windows_482257-49771.jpg?t=st=1742664704~exp=1742668304~hmac=b2c3a671eead2d806d89d1224dd343e6cfe48af532779b94ce8481a0074537a7&w=2000'
                      alt='Office location'
                      className='w-full h-full object-cover'
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
                <div className='bg-white rounded-lg shadow-md'>
                  <div className='p-6'>
                    <h3 className='font-bold text-xl mb-6'>
                      Send Us a Message
                    </h3>

                    {isSuccess ? (
                      <div className='bg-green-50 border border-green-200 rounded-md p-4 text-center'>
                        <CheckCircle className='h-12 w-12 text-green-500 mx-auto mb-3' />
                        <h4 className='text-lg font-medium text-green-800 mb-1'>
                          Message Sent!
                        </h4>
                        <p className='text-green-600'>
                          Thank you for contacting us. We'll get back to you
                          shortly.
                        </p>
                      </div>
                    ) : (
                      <>
                        {error && (
                          <div className='bg-red-50 border border-red-200 rounded-md p-4 mb-4 text-center'>
                            <AlertCircle className='h-12 w-12 text-red-500 mx-auto mb-3' />
                            <h4 className='text-lg font-medium text-red-800 mb-1'>
                              Error
                            </h4>
                            <p className='text-red-600'>{error}</p>
                          </div>
                        )}
                        <form className='space-y-4' onSubmit={handleSubmit}>
                          <div className='grid grid-cols-2 gap-4'>
                            <div className='space-y-2'>
                              <label
                                htmlFor='first_name'
                                className='text-sm font-medium'
                              >
                                First Name
                              </label>
                              <input
                                id='first_name'
                                name='first_name'
                                value={formData.first_name}
                                onChange={handleChange}
                                required
                                className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary'
                              />
                            </div>
                            <div className='space-y-2'>
                              <label
                                htmlFor='last_name'
                                className='text-sm font-medium'
                              >
                                Last Name
                              </label>
                              <input
                                id='last_name'
                                name='last_name'
                                value={formData.last_name}
                                onChange={handleChange}
                                required
                                className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary'
                              />
                            </div>
                          </div>
                          <div className='space-y-2'>
                            <label
                              htmlFor='email'
                              className='text-sm font-medium'
                            >
                              Email
                            </label>
                            <input
                              id='email'
                              name='email'
                              type='email'
                              value={formData.email}
                              onChange={handleChange}
                              required
                              className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary'
                            />
                          </div>
                          <div className='space-y-2'>
                            <label
                              htmlFor='phone'
                              className='text-sm font-medium'
                            >
                              Phone
                            </label>
                            <input
                              id='phone'
                              name='phone'
                              value={formData.phone}
                              onChange={handleChange}
                              required
                              className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary'
                            />
                          </div>
                          <div className='space-y-2'>
                            <label
                              htmlFor='service'
                              className='text-sm font-medium'
                            >
                              Service Interested In
                            </label>
                            <select
                              id='service'
                              name='service'
                              value={formData.service}
                              onChange={handleChange}
                              required
                              className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary'
                            >
                              <option value=''>Select a service</option>
                              <option value='language'>
                                German Language Course
                              </option>
                              <option value='nursing'>
                                Nursing Work Contract
                              </option>
                              <option value='ausbildung'>
                                Ausbildung Training
                              </option>
                              <option value='study'>Study Pathway</option>
                              <option value='job'>Job Seeker Pathway</option>
                              <option value='other'>Other</option>
                            </select>
                          </div>
                          <div className='space-y-2'>
                            <label
                              htmlFor='message'
                              className='text-sm font-medium'
                            >
                              Message
                            </label>
                            <textarea
                              id='message'
                              name='message'
                              rows={4}
                              value={formData.message}
                              onChange={handleChange}
                              required
                              className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary'
                            ></textarea>
                          </div>
                          <button
                            type='submit'
                            disabled={isSubmitting}
                            className='w-full bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-70'
                          >
                            {isSubmitting ? (
                              'Sending...'
                            ) : (
                              <>
                                <Send className='h-4 w-4' />
                                Send Message
                              </>
                            )}
                          </button>
                        </form>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className='py-16 bg-gray-50'>
          <div className='container mx-auto px-4'>
            <div className='max-w-3xl mx-auto text-center mb-12'>
              <h2 className='text-3xl font-bold mb-4'>Visit Our Offices</h2>
              <p className='text-gray-600'>
                We have offices in Lagos and Port Harcourt to serve you better
              </p>
            </div>

            <div className='grid md:grid-cols-2 gap-8'>
              <div className='bg-white rounded-lg shadow-md overflow-hidden'>
                <div className='p-4 bg-primary text-white'>
                  <h3 className='font-bold'>Lagos Office</h3>
                </div>
                <div className='h-64'>
                  <iframe
                    src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.7286767086897!2d3.5638!3d6.4355!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMjYnMDcuOCJOIDPCsDMzJzQ5LjciRQ!5e0!3m2!1sen!2sng!4v1616603763408!5m2!1sen!2sng'
                    width='100%'
                    height='100%'
                    style={{ border: 0 }}
                    allowFullScreen=''
                    loading='lazy'
                    title='Lagos Office Map'
                  ></iframe>
                </div>
                <div className='p-4'>
                  <p className='text-gray-600'>
                    8 Bayo Adetuna Street off Sangotedo. Lagos.
                  </p>
                </div>
              </div>

              <div className='bg-white rounded-lg shadow-md overflow-hidden'>
                <div className='p-4 bg-primary text-white'>
                  <h3 className='font-bold'>Port Harcourt Office</h3>
                </div>
                <div className='h-64'>
                  <iframe
                    src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3975.5741!2d7.0498!3d4.8156!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNMKwNDgnNTYuMiJOIDfCsDAyJzU5LjMiRQ!5e0!3m2!1sen!2sng!4v1616603763408!5m2!1sen!2sng'
                    width='100%'
                    height='100%'
                    style={{ border: 0 }}
                    allowFullScreen=''
                    loading='lazy'
                    title='Port Harcourt Office Map'
                  ></iframe>
                </div>
                <div className='p-4'>
                  <p className='text-gray-600'>
                    No 70 Eliogbolo Road, Rumuodumaya, Port Harcourt
                  </p>
                </div>
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

export default ContactUs;
