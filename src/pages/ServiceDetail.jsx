/** @format */

import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  Award,
  Users,
  BookOpen,
} from 'lucide-react';

const serviceData = {
  'exam-prep': {
    title: 'Professional Exam Prep',
    subtitle: 'IELTS, GMAT, SAT, GRE, GCSE, TOEFL',
    description:
      'Our elite preparation programs are designed to help you achieve the highest possible scores in international standardized tests. We combine expert instruction with personalized study plans.',
    features: [
      'Personalized study plans tailored to your strengths',
      'Weekly mock exams with detailed feedback',
      'Access to premium study materials and question banks',
      'Small group sessions for maximum interaction',
      'One-on-one coaching for specific problem areas',
    ],
    stats: [
      { label: 'Avg. Score Increase', value: '25%' },
      { label: 'Success Rate', value: '96%' },
      { label: 'Certified Tutors', value: '40+' },
    ],
    image:
      'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=1000',
  },
  german: {
    title: 'German Language Mastery',
    subtitle: 'Levels A1 to B2 (Goethe & TestDaF)',
    description:
      'Master the German language with our immersive training programs. Whether you are a beginner or looking to refine your professional communication, we have the right course for you.',
    features: [
      'Native-level instructors with teaching certifications',
      'Immersive learning environment focusing on conversation',
      'Specialized vocabulary for healthcare and tech professionals',
      'Preparation for Goethe-Zertifikat and TestDaF exams',
      'Flexible schedules for working professionals',
    ],
    stats: [
      { label: 'Pass Rate', value: '94%' },
      { label: 'Avg. Duration', value: '3 mo/lvl' },
      { label: 'Students Placed', value: '1.2K+' },
    ],
    image:
      'https://images.unsplash.com/photo-1527891751199-7225231a68dd?auto=format&fit=crop&q=80&w=1000',
  },
  programming: {
    title: 'Computer Programming',
    subtitle: 'Python, Web Tech, Software Engineering',
    description:
      'Our programming courses are designed for both beginners and experienced developers. We focus on practical, industry-relevant skills that are in high demand globally.',
    features: [
      'Project-based learning with real-world applications',
      'Mentorship from senior software engineers',
      'Curriculum focused on Python, JavaScript, and React',
      'Code review and pair programming sessions',
      'Portfolio building and interview preparation',
    ],
    stats: [
      { label: 'Job Placement', value: '88%' },
      { label: 'Avg. Salary Inc.', value: '40%' },
      { label: 'Projects Built', value: '10+' },
    ],
    image:
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=1000',
  },
  'data-analysis': {
    title: 'Data Analysis',
    subtitle: 'SQL, Tableau, Python for Data',
    description:
      'Master the art of data storytelling. Our data analysis program teaches you how to extract, clean, and visualize data to drive strategic business decisions.',
    features: [
      'Hands-on training with SQL and Python',
      'Advanced visualization with Tableau and Power BI',
      'Statistical analysis and predictive modeling',
      'Real-world business case studies',
      'Certification preparation for data professionals',
    ],
    stats: [
      { label: 'Industry Demand', value: 'High' },
      { label: 'Tools Mastered', value: '5+' },
      { label: 'Success Rate', value: '92%' },
    ],
    image:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000',
  },
  'cyber-security': {
    title: 'Cyber Security',
    subtitle: 'Network Security, Ethical Hacking',
    description:
      'Protect the digital frontier. Our cyber security program covers everything from network defense to ethical hacking, preparing you for a career in one of the most critical fields today.',
    features: [
      'Lab-based training with real security tools',
      'Network defense and incident response',
      'Ethical hacking and penetration testing',
      'Compliance and risk management',
      'Preparation for CompTIA Security+ and CEH',
    ],
    stats: [
      { label: 'Global Demand', value: 'Critical' },
      { label: 'Avg. Salary', value: '$85K+' },
      { label: 'Pass Rate', value: '90%' },
    ],
    image:
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000',
  },
  'project-management': {
    title: 'Project Management',
    subtitle: 'Agile, Scrum, PMP Preparation',
    description:
      'Lead with confidence. Our project management program equips you with the methodologies and leadership skills needed to manage complex projects from inception to completion.',
    features: [
      'Agile and Scrum methodologies',
      'PMP and CAPM exam preparation',
      'Risk management and resource allocation',
      'Leadership and stakeholder communication',
      'Hands-on experience with Jira and Trello',
    ],
    stats: [
      { label: 'Certification Rate', value: '95%' },
      { label: 'Avg. Project Size', value: '$1M+' },
      { label: 'Career Growth', value: 'Rapid' },
    ],
    image:
      'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=1000',
  },
};

export default function ServiceDetail() {
  const { id } = useParams();
  const service = serviceData[id] || serviceData['exam-prep'];

  return (
    <div className='pt-32 pb-20 bg-luxury-cream min-h-screen'>
      <div className='container mx-auto px-6'>
        <Link
          to='/'
          className='inline-flex items-center gap-2 text-emerald-600 font-bold uppercase tracking-widest text-xs mb-12 hover:translate-x-[-4px] transition-transform'
        >
          <ArrowLeft className='h-4 w-4' /> Back to Home
        </Link>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32'>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className='text-emerald-600 font-bold uppercase tracking-[0.3em] text-sm block mb-4'>
              Service Detail
            </span>
            <h1 className='text-5xl md:text-7xl font-serif font-bold text-luxury-black mb-6 leading-tight'>
              {service.title}
            </h1>
            <p className='text-2xl font-serif italic text-gray-400 mb-8'>
              {service.subtitle}
            </p>
            <p className='text-xl text-gray-600 font-light leading-relaxed mb-12'>
              {service.description}
            </p>

            <div className='grid grid-cols-3 gap-8'>
              {service.stats.map((stat, i) => (
                <div key={i}>
                  <h3 className='text-3xl font-serif font-bold text-emerald-600 mb-1'>
                    {stat.value}
                  </h3>
                  <p className='text-xs uppercase tracking-widest text-gray-400 font-bold'>
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className='relative'
          >
            <div className='aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl'>
              <img
                src={service.image}
                alt={service.title}
                className='w-full h-full object-cover'
              />
            </div>
            <div className='absolute -bottom-10 -left-10 bg-luxury-black p-10 rounded-[2rem] text-white hidden md:block max-w-xs'>
              <Award className='h-10 w-10 text-emerald-500 mb-4' />
              <p className='text-lg font-serif italic'>
                "The gold standard in professional training and development."
              </p>
            </div>
          </motion.div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12'>
          <div className='lg:col-span-2 space-y-12'>
            <h2 className='text-4xl font-serif font-bold text-luxury-black'>
              Key Features & Benefits
            </h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
              {service.features.map((feature, i) => (
                <div key={i} className='flex gap-4'>
                  <CheckCircle2 className='h-6 w-6 text-emerald-600 shrink-0' />
                  <p className='text-lg text-gray-600 font-light'>{feature}</p>
                </div>
              ))}
            </div>
          </div>

          <div className='bg-white p-10 rounded-[2.5rem] shadow-xl border border-gray-100 h-fit'>
            <h3 className='text-2xl font-serif font-bold text-luxury-black mb-6'>
              Ready to Start?
            </h3>
            <p className='text-gray-500 font-light mb-8 leading-relaxed'>
              Join our next cohort and take the first step towards your
              international career.
            </p>
            <form className='space-y-4'>
              <input
                type='text'
                placeholder='Full Name'
                className='w-full px-6 py-4 rounded-xl bg-gray-50 border border-gray-100 focus:outline-none focus:border-emerald-500 transition-colors'
              />
              <input
                type='email'
                placeholder='Email Address'
                className='w-full px-6 py-4 rounded-xl bg-gray-50 border border-gray-100 focus:outline-none focus:border-emerald-500 transition-colors'
              />
              <button className='w-full py-5 bg-emerald-600 text-white rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-emerald-500 transition-all'>
                Enquire Now
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
