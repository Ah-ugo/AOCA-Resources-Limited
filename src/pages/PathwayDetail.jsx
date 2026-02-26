/** @format */

import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  MapPin,
  ShieldCheck,
  Plane,
  Building2,
  GraduationCap,
} from 'lucide-react';

const pathwayData = {
  nursing: {
    title: 'Nursing Work Contract',
    subtitle: 'Direct Placement in German Healthcare',
    description:
      'A specialized pathway for qualified nurses to secure direct employment contracts with leading German hospitals and care facilities. We handle everything from language training to recognition and relocation.',
    steps: [
      {
        title: 'Language Proficiency',
        desc: 'Achieve B1/B2 German level through our intensive training.',
      },
      {
        title: 'Document Recognition',
        desc: 'We manage the official recognition of your nursing credentials.',
      },
      {
        title: 'Interview & Contract',
        desc: 'Direct interviews with German employers and contract signing.',
      },
      {
        title: 'Visa & Relocation',
        desc: 'Full support for your work visa and initial settling in Germany.',
      },
    ],
    requirements: [
      'Bachelor of Nursing or equivalent',
      'Valid nursing license in your home country',
      'Commitment to intensive German language learning',
      'Minimum 1 year of clinical experience preferred',
    ],
    image:
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1000',
  },
  ausbildung: {
    title: 'Ausbildung Training',
    subtitle: 'Vocational Excellence in Germany',
    description:
      'The dual vocational training system in Germany combines theoretical learning with practical work experience. This pathway is ideal for young professionals looking to build a career in high-demand sectors.',
    steps: [
      {
        title: 'Program Selection',
        desc: 'Choose from over 300 vocational training programs.',
      },
      {
        title: 'Language Prep',
        desc: 'Reach B1 level German to qualify for the program.',
      },
      {
        title: 'Employer Matching',
        desc: 'We connect you with German companies offering Ausbildung.',
      },
      {
        title: 'Contract & Visa',
        desc: 'Secure your training contract and vocational visa.',
      },
    ],
    requirements: [
      'High school certificate (WAEC/NECO)',
      'Age between 18 and 30 preferred',
      'Strong motivation for vocational learning',
      'B1 level German proficiency',
    ],
    image:
      'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=1000',
  },
  study: {
    title: 'Study Pathway',
    subtitle: 'Academic Excellence in Germany',
    description:
      "Germany is home to some of the world's most prestigious universities. Our study pathway helps you secure admission to top-tier institutions, many of which offer tuition-free education.",
    steps: [
      {
        title: 'University Selection',
        desc: 'Find the perfect program and university for your career goals.',
      },
      {
        title: 'Admission Support',
        desc: 'We guide you through the application process and document preparation.',
      },
      {
        title: 'Visa Processing',
        desc: 'Full support for your student visa application.',
      },
      {
        title: 'Enrollment',
        desc: 'Finalize your enrollment and prepare for your academic journey.',
      },
    ],
    requirements: [
      "High school or Bachelor's degree with strong grades",
      'Proof of English or German language proficiency',
      'Financial proof (Blocked account)',
      'Valid passport and health insurance',
    ],
    image:
      'https://images.unsplash.com/photo-1523050853063-bd80e27433fb?auto=format&fit=crop&q=80&w=1000',
  },
  'job-seeker': {
    title: 'Opportunity/Job Seeker',
    subtitle: 'Direct Career Entry in Germany',
    description:
      'The Job Seeker visa allows qualified professionals to come to Germany for up to six months to look for a job. We help you prepare your profile and connect with potential employers.',
    steps: [
      {
        title: 'Eligibility Check',
        desc: 'Verify your qualifications and experience for the job seeker visa.',
      },
      {
        title: 'Profile Optimization',
        desc: 'Tailor your CV and cover letter for the German job market.',
      },
      {
        title: 'Visa Application',
        desc: 'Secure your job seeker visa with our expert guidance.',
      },
      {
        title: 'Job Search Support',
        desc: 'Access our network of employers and recruitment partners.',
      },
    ],
    requirements: [
      'Recognized university degree or vocational qualification',
      'Minimum 5 years of relevant work experience',
      'Proof of sufficient funds for the stay',
      'Basic German or strong English skills',
    ],
    image:
      'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=1000',
  },
};

export default function PathwayDetail() {
  const { id } = useParams();
  const pathway = pathwayData[id] || pathwayData['nursing'];

  return (
    <div className='pt-32 pb-20 bg-white min-h-screen'>
      <div className='container mx-auto px-6'>
        <Link
          to='/'
          className='inline-flex items-center gap-2 text-emerald-600 font-bold uppercase tracking-widest text-xs mb-12 hover:translate-x-[-4px] transition-transform'
        >
          <ArrowLeft className='h-4 w-4' /> Back to Home
        </Link>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32'>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className='text-emerald-600 font-bold uppercase tracking-[0.3em] text-sm block mb-4'>
              Pathway Detail
            </span>
            <h1 className='text-5xl md:text-7xl font-serif font-bold text-luxury-black mb-6 leading-tight'>
              {pathway.title}
            </h1>
            <p className='text-2xl font-serif italic text-gray-400 mb-8'>
              {pathway.subtitle}
            </p>
            <p className='text-xl text-gray-600 font-light leading-relaxed mb-12'>
              {pathway.description}
            </p>

            <div className='flex flex-wrap gap-4'>
              <div className='px-6 py-3 bg-emerald-50 rounded-full flex items-center gap-2'>
                <ShieldCheck className='h-5 w-5 text-emerald-600' />
                <span className='text-sm font-bold text-emerald-700 uppercase tracking-widest'>
                  Fully Supported
                </span>
              </div>
              <div className='px-6 py-3 bg-blue-50 rounded-full flex items-center gap-2'>
                <Plane className='h-5 w-5 text-blue-600' />
                <span className='text-sm font-bold text-blue-700 uppercase tracking-widest'>
                  Relocation Ready
                </span>
              </div>
            </div>
          </motion.div>

          <div className='relative'>
            <div className='aspect-square rounded-[3rem] overflow-hidden shadow-2xl'>
              <img
                src={pathway.image}
                alt={pathway.title}
                className='w-full h-full object-cover'
              />
            </div>
            <div className='absolute top-10 -right-10 w-48 h-48 bg-emerald-600 rounded-full flex items-center justify-center text-white text-center p-6 shadow-xl'>
              <div>
                <span className='text-4xl font-serif font-bold block mb-1'>
                  100%
                </span>
                <span className='text-[10px] uppercase tracking-widest font-bold opacity-80'>
                  Placement Guarantee
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-20'>
          <div className='lg:col-span-2 space-y-20'>
            <section>
              <h2 className='text-4xl font-serif font-bold text-luxury-black mb-12'>
                The Roadmap
              </h2>
              <div className='space-y-12'>
                {pathway.steps.map((step, i) => (
                  <div key={i} className='flex gap-8 group'>
                    <div className='w-16 h-16 rounded-2xl bg-luxury-cream flex items-center justify-center text-2xl font-serif font-bold text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-500 shrink-0'>
                      {i + 1}
                    </div>
                    <div>
                      <h3 className='text-2xl font-serif font-bold text-luxury-black mb-2'>
                        {step.title}
                      </h3>
                      <p className='text-lg text-gray-500 font-light leading-relaxed'>
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className='bg-luxury-cream p-12 rounded-[3rem]'>
              <h2 className='text-3xl font-serif font-bold text-luxury-black mb-8'>
                Requirements
              </h2>
              <ul className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                {pathway.requirements.map((req, i) => (
                  <li key={i} className='flex items-center gap-4'>
                    <div className='w-2 h-2 rounded-full bg-emerald-500' />
                    <span className='text-lg text-gray-600 font-light'>
                      {req}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <aside className='space-y-8'>
            <div className='bg-luxury-black p-10 rounded-[2.5rem] text-white'>
              <h3 className='text-2xl font-serif font-bold mb-6'>
                Expert Guidance
              </h3>
              <p className='text-white/60 font-light mb-8 leading-relaxed'>
                Speak with our senior consultants to map out your specific
                journey.
              </p>
              <button className='w-full py-5 bg-emerald-600 text-white rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-emerald-500 transition-all'>
                Book Consultation
              </button>
            </div>

            <div className='p-10 rounded-[2.5rem] border border-gray-100 shadow-sm'>
              <h4 className='text-lg font-serif font-bold text-luxury-black mb-6'>
                Related Pathways
              </h4>
              <div className='space-y-4'>
                {['Study Pathway', 'Job Seeker', 'Vocational Training'].map(
                  (p) => (
                    <Link
                      key={p}
                      to='#'
                      className='flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition-colors group'
                    >
                      <span className='font-medium text-gray-600 group-hover:text-emerald-600'>
                        {p}
                      </span>
                      <ArrowLeft className='h-4 w-4 rotate-180 text-gray-300 group-hover:text-emerald-600 transition-colors' />
                    </Link>
                  ),
                )}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
