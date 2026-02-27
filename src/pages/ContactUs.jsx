/** @format */

'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  MessageSquare,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'General Inquiry',
    message: '',
  });
  const [status, setStatus] = useState();
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch(
        'https://aoca-resources-backend.onrender.com/contact',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        },
      );

      if (response.ok) {
        setStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: 'General Inquiry',
          message: '',
        });
      } else {
        const data = await response.json();
        throw new Error(data.message || 'Failed to send message');
      }
    } catch (error) {
      setStatus('error');
      setErrorMessage(
        error.message || 'Something went wrong. Please try again later.',
      );
    }
  };

  return (
    <div className='min-h-screen bg-white'>
      {/* Hero Section */}
      <section className='relative pt-48 pb-32 bg-luxury-black text-white overflow-hidden'>
        <div className='absolute inset-0 z-0'>
          <img
            src='https://images.unsplash.com/photo-1534536281715-e28d76689b4d?auto=format&fit=crop&q=80&w=2000'
            alt='Contact Hero'
            className='w-full h-full object-cover opacity-30'
          />
          <div className='absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-luxury-black' />
        </div>

        <div className='container mx-auto px-6 relative z-10'>
          <div className='max-w-3xl'>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className='text-emerald-400 font-bold uppercase tracking-[0.4em] text-sm block mb-6'
            >
              Get in Touch
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className='text-5xl md:text-8xl font-serif font-bold mb-8'
            >
              Let's Start a <br /> Conversation
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className='text-xl text-white/60 font-light leading-relaxed'
            >
              Whether you're looking for career guidance, language training, or
              partnership opportunities, our elite team is here to help.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className='py-32'>
        <div className='container mx-auto px-6'>
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-20'>
            {/* Contact Info */}
            <div className='space-y-12'>
              <div>
                <h3 className='text-2xl font-serif font-bold text-luxury-black mb-8'>
                  Our Offices
                </h3>
                <div className='space-y-8'>
                  <div className='flex gap-6'>
                    <div className='w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center shrink-0'>
                      <MapPin className='h-6 w-6 text-emerald-600' />
                    </div>
                    <div>
                      <h4 className='font-serif font-bold text-luxury-black mb-2'>
                        Lagos Headquarters
                      </h4>
                      <p className='text-gray-500 font-light leading-relaxed'>
                        8 Bayo Adetuna Street off Sangotedo, Lagos, Nigeria.
                      </p>
                    </div>
                  </div>
                  <div className='flex gap-6'>
                    <div className='w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center shrink-0'>
                      <MapPin className='h-6 w-6 text-emerald-600' />
                    </div>
                    <div>
                      <h4 className='font-serif font-bold text-luxury-black mb-2'>
                        Port Harcourt Office
                      </h4>
                      <p className='text-gray-500 font-light leading-relaxed'>
                        Regional Consultancy Hub, Port Harcourt, Nigeria.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className='text-2xl font-serif font-bold text-luxury-black mb-8'>
                  Direct Contact
                </h3>
                <div className='space-y-6'>
                  <a
                    href='tel:+2348038865466'
                    className='flex items-center gap-4 group'
                  >
                    <div className='w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-all'>
                      <Phone className='h-4 w-4' />
                    </div>
                    <span className='text-gray-600 font-light'>
                      +234 803 886 5466
                    </span>
                  </a>
                  <a
                    href='https://wa.me/2348038865466'
                    className='flex items-center gap-4 group'
                  >
                    <div className='w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center group-hover:bg-green-500 group-hover:text-white transition-all'>
                      <FaWhatsapp size={16} />
                    </div>
                    <span className='text-gray-600 font-light'>
                      WhatsApp Support
                    </span>
                  </a>
                  <a
                    href='mailto:info@aocaresourcesltd.com'
                    className='flex items-center gap-4 group'
                  >
                    <div className='w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center group-hover:bg-luxury-black group-hover:text-white transition-all'>
                      <Mail className='h-4 w-4' />
                    </div>
                    <span className='text-gray-600 font-light'>
                      info@aocaresourcesltd.com
                    </span>
                  </a>
                </div>
              </div>

              <div className='p-10 rounded-[2.5rem] bg-luxury-cream border border-gray-100'>
                <h3 className='text-xl font-serif font-bold text-luxury-black mb-6'>
                  Business Hours
                </h3>
                <div className='space-y-4'>
                  <div className='flex justify-between text-sm'>
                    <span className='text-gray-400'>Mon - Fri</span>
                    <span className='font-bold text-luxury-black'>
                      9:00 AM - 6:00 PM
                    </span>
                  </div>
                  <div className='flex justify-between text-sm'>
                    <span className='text-gray-400'>Saturday</span>
                    <span className='font-bold text-luxury-black'>
                      10:00 AM - 2:00 PM
                    </span>
                  </div>
                  <div className='flex justify-between text-sm'>
                    <span className='text-gray-400'>Sunday</span>
                    <span className='font-bold text-emerald-600 uppercase tracking-widest'>
                      Closed
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className='lg:col-span-2'>
              <div className='bg-white p-8 md:p-16 rounded-[3rem] shadow-2xl shadow-gray-200/50 border border-gray-100'>
                <h2 className='text-3xl md:text-4xl font-serif font-bold text-luxury-black mb-8'>
                  Send a Message
                </h2>

                {status === 'success' ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className='text-center py-20'
                  >
                    <div className='w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-8'>
                      <CheckCircle2 className='h-10 w-10 text-emerald-600' />
                    </div>
                    <h3 className='text-2xl font-serif font-bold text-luxury-black mb-4'>
                      Message Sent!
                    </h3>
                    <p className='text-gray-500 font-light mb-8'>
                      Thank you for reaching out. Our team will get back to you
                      shortly.
                    </p>
                    <button
                      onClick={() => setStatus('idle')}
                      className='px-10 py-4 bg-luxury-black text-white rounded-full font-bold uppercase tracking-widest text-xs hover:bg-emerald-600 transition-all'
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className='space-y-8'>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                      <div className='space-y-2'>
                        <label className='text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400 ml-4'>
                          Full Name
                        </label>
                        <input
                          required
                          type='text'
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          placeholder='John Doe'
                          className='w-full px-8 py-5 rounded-2xl bg-gray-50 border border-gray-100 focus:outline-none focus:border-emerald-500 transition-colors'
                        />
                      </div>
                      <div className='space-y-2'>
                        <label className='text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400 ml-4'>
                          Email Address
                        </label>
                        <input
                          required
                          type='email'
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          placeholder='john@example.com'
                          className='w-full px-8 py-5 rounded-2xl bg-gray-50 border border-gray-100 focus:outline-none focus:border-emerald-500 transition-colors'
                        />
                      </div>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                      <div className='space-y-2'>
                        <label className='text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400 ml-4'>
                          Phone Number
                        </label>
                        <input
                          type='tel'
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          placeholder='+234 ...'
                          className='w-full px-8 py-5 rounded-2xl bg-gray-50 border border-gray-100 focus:outline-none focus:border-emerald-500 transition-colors'
                        />
                      </div>
                      <div className='space-y-2'>
                        <label className='text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400 ml-4'>
                          Service of Interest
                        </label>
                        <select
                          value={formData.service}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              service: e.target.value,
                            })
                          }
                          className='w-full px-8 py-5 rounded-2xl bg-gray-50 border border-gray-100 focus:outline-none focus:border-emerald-500 transition-colors appearance-none'
                        >
                          <option>General Inquiry</option>
                          <option>Nursing Work Contract</option>
                          <option>Ausbildung Training</option>
                          <option>German Language Course</option>
                          <option>Professional Exam Prep</option>
                        </select>
                      </div>
                    </div>

                    <div className='space-y-2'>
                      <label className='text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400 ml-4'>
                        Your Message
                      </label>
                      <textarea
                        required
                        rows={6}
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        placeholder='How can we help you?'
                        className='w-full px-8 py-5 rounded-2xl bg-gray-50 border border-gray-100 focus:outline-none focus:border-emerald-500 transition-colors resize-none'
                      ></textarea>
                    </div>

                    {status === 'error' && (
                      <div className='flex items-center gap-3 p-4 rounded-xl bg-red-50 text-red-600 text-sm'>
                        <AlertCircle className='h-5 w-5 shrink-0' />
                        {errorMessage}
                      </div>
                    )}

                    <button
                      type='submit'
                      disabled={status === 'loading'}
                      className='w-full py-6 bg-luxury-black text-white rounded-2xl font-bold uppercase tracking-widest text-sm hover:bg-emerald-600 transition-all shadow-xl shadow-black/5 flex items-center justify-center gap-3 group disabled:opacity-50 disabled:cursor-not-allowed'
                    >
                      {status === 'loading' ? (
                        <>
                          <Loader2 className='h-5 w-5 animate-spin' />{' '}
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message{' '}
                          <Send className='h-5 w-5 group-hover:translate-x-1 transition-transform' />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className='h-[600px] w-full bg-gray-100 grayscale hover:grayscale-0 transition-all duration-1000'>
        <iframe
          src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.728257844033!2d3.6186413!3d6.4353457!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bf9046098059f%3A0x86810246028186!2s8%20Bayo%20Adetuna%20St%2C%20Sangotedo%2C%20Lekki%20106104%2C%20Lagos!5e0!3m2!1sen!2sng!4v1715500000000!5m2!1sen!2sng'
          width='100%'
          height='100%'
          style={{ border: 0 }}
          allowFullScreen
          loading='lazy'
          referrerPolicy='no-referrer-when-downgrade'
        ></iframe>
      </section>
    </div>
  );
}
