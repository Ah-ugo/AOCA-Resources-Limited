/** @format */

'use client';

import { motion } from 'framer-motion';
import {
  Globe,
  GraduationCap,
  Languages,
  CheckCircle,
  Users,
  Target,
  Award,
  ArrowRight,
} from 'lucide-react';
import { Link } from 'react-router-dom';

function AboutUs() {
  const stats = [
    { label: 'Successful Visas', value: '98%' },
    { label: 'Language Students', value: '5,000+' },
    { label: 'Years of Experience', value: '15+' },
    { label: 'Global Partners', value: '120+' },
  ];

  const services = [
    {
      title: 'Language Training',
      icon: Languages,
      desc: 'Intensive German language courses from A1 to B2 level, taught by certified instructors.',
      features: [
        'Native-level fluency',
        'Exam preparation',
        'Cultural integration',
      ],
    },
    {
      title: 'Visa Consultancy',
      icon: Globe,
      desc: 'Expert guidance through the complex German visa application process for various pathways.',
      features: [
        'Document verification',
        'Interview coaching',
        'Application tracking',
      ],
    },
    {
      title: 'Recruitment Services',
      icon: GraduationCap,
      desc: 'Connecting talented professionals with top employers and institutions in Germany.',
      features: ['Job placement', 'Contract negotiation', 'Relocation support'],
    },
  ];

  return (
    <div className='min-h-screen bg-white'>
      {/* Hero Section */}
      <section className='relative h-[60vh] flex items-center justify-center overflow-hidden bg-luxury-black pt-20'>
        <div className='absolute inset-0 z-0'>
          <img
            src='https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=2000'
            alt='About Hero'
            className='w-full h-full object-cover opacity-40'
          />
          <div className='absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-luxury-black' />
        </div>

        <div className='container mx-auto px-6 relative z-10 text-center'>
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className='text-emerald-400 font-bold uppercase tracking-[0.4em] text-sm block mb-6'
          >
            Our Legacy
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className='text-5xl md:text-8xl font-serif font-bold text-white mb-8'
          >
            A Bridge to <br /> Global Excellence
          </motion.h1>
        </div>
      </section>

      {/* Our Story Section */}
      <section className='py-32'>
        <div className='container mx-auto px-6'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-20 items-center'>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className='relative'
            >
              <div className='aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl'>
                <img
                  src='https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=1000'
                  alt='Founder'
                  className='w-full h-full object-cover'
                />
              </div>
              <div className='absolute -bottom-10 -right-10 w-64 h-64 bg-emerald-600 rounded-[2rem] p-8 text-white hidden md:flex flex-col justify-center shadow-2xl'>
                <p className='text-sm uppercase tracking-widest font-bold opacity-80 mb-2'>
                  Established
                </p>
                <span className='text-5xl font-serif font-bold'>2008</span>
                <p className='text-xs mt-4 opacity-70'>
                  Over a decade of transforming lives through global education.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className='space-y-8'
            >
              <span className='text-emerald-600 font-bold uppercase tracking-[0.3em] text-sm block'>
                The AOCA Story
              </span>
              <h2 className='text-4xl md:text-6xl font-serif font-bold text-luxury-black'>
                Empowering Ambitions Across Borders
              </h2>
              <p className='text-xl text-gray-500 font-light leading-relaxed'>
                Founded in 2008, AOCA Resources Limited emerged from a vision to
                create seamless pathways for Nigerian professionals to access
                global opportunities. We specialize in bridging the gap between
                talent and international demand, particularly in the German
                market.
              </p>
              <p className='text-lg text-gray-500 font-light leading-relaxed'>
                Our journey began with a focus on language training and has
                since evolved into a comprehensive consultancy firm offering
                end-to-end support for vocational training, professional
                recruitment, and academic excellence.
              </p>

              <div className='grid grid-cols-2 gap-8 pt-8'>
                {stats.map((stat, i) => (
                  <div key={i} className='space-y-2'>
                    <h4 className='text-3xl md:text-4xl font-serif font-bold text-emerald-600'>
                      {stat.value}
                    </h4>
                    <p className='text-xs uppercase tracking-widest text-gray-400 font-bold'>
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What We Offer Section */}
      <section className='py-32 bg-luxury-cream'>
        <div className='container mx-auto px-6'>
          <div className='text-center max-w-3xl mx-auto mb-20'>
            <span className='text-emerald-600 font-bold uppercase tracking-[0.3em] text-sm block mb-4'>
              Our Expertise
            </span>
            <h2 className='text-4xl md:text-6xl font-serif font-bold text-luxury-black'>
              Comprehensive Solutions
            </h2>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {services.map((service, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className='bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100'
              >
                <div className='w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-8'>
                  <service.icon className='h-8 w-8 text-emerald-600' />
                </div>
                <h3 className='text-2xl font-serif font-bold text-luxury-black mb-4'>
                  {service.title}
                </h3>
                <p className='text-gray-500 font-light mb-8 leading-relaxed'>
                  {service.desc}
                </p>
                <ul className='space-y-4'>
                  {service.features.map((feature, j) => (
                    <li
                      key={j}
                      className='flex items-center gap-3 text-sm text-gray-600'
                    >
                      <CheckCircle className='h-4 w-4 text-emerald-500' />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className='py-32'>
        <div className='container mx-auto px-6'>
          <div className='flex flex-col md:flex-row justify-between items-end mb-20 gap-8'>
            <div className='max-w-2xl'>
              <span className='text-emerald-600 font-bold uppercase tracking-[0.3em] text-sm block mb-4'>
                Our Leadership
              </span>
              <h2 className='text-4xl md:text-6xl font-serif font-bold text-luxury-black'>
                The Minds Behind AOCA
              </h2>
            </div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className='group'
            >
              <div className='aspect-[3/4] rounded-[2.5rem] overflow-hidden mb-6 relative'>
                <img
                  src='/ukaegbu.jpeg'
                  alt='Obinna Ukaegbu'
                  className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-110'
                />
                <div className='absolute inset-0 bg-gradient-to-t from-luxury-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500' />
              </div>
              <h3 className='text-2xl font-serif font-bold text-luxury-black'>
                Obinna Ukaegbu
              </h3>
              <p className='text-emerald-600 font-bold uppercase tracking-widest text-xs mt-2'>
                Managing Director / CEO
              </p>
            </motion.div>

            {/* Placeholder for more team members */}
            <div className='aspect-[3/4] rounded-[2.5rem] border-2 border-dashed border-gray-200 flex items-center justify-center p-12 text-center'>
              <div>
                <Users className='h-12 w-12 text-gray-300 mx-auto mb-4' />
                <p className='text-gray-400 font-light'>
                  Join our growing team of global experts.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='py-32 bg-luxury-black text-white'>
        <div className='container mx-auto px-6 text-center'>
          <h2 className='text-4xl md:text-6xl font-serif font-bold mb-8'>
            Ready to Start Your Journey?
          </h2>
          <p className='text-xl text-white/60 font-light mb-12 max-w-2xl mx-auto'>
            Join the elite group of professionals who have successfully
            navigated their way to international success with AOCA.
          </p>
          <div className='flex flex-wrap justify-center gap-6'>
            <Link
              to='/register'
              className='px-12 py-5 bg-emerald-600 text-white rounded-full font-bold uppercase tracking-widest text-sm hover:bg-emerald-500 transition-all'
            >
              Register Now
            </Link>
            <Link
              to='/contact'
              className='px-12 py-5 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-white/20 transition-all'
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutUs;
