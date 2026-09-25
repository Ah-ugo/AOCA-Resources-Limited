import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, Award, Home, AlertCircle } from 'lucide-react';

const serviceData = {
  'german-visa': {
    title: 'German Visa Travel Consultancy',
    subtitle: 'Expert Guidance for Your Journey to Germany',
    description:
      'Your trusted partner for expert guidance and seamless visa support, helping you take the next step toward your journey to Germany.',
    features: [
      'Expert visa application guidance',
      'Document preparation and verification',
      'Appointment scheduling assistance',
      'Interview preparation support',
      'Post-arrival settlement guidance',
    ],
    stats: [
      { label: 'Success Rate', value: '95%' },
      { label: 'Visa Types', value: '10+' },
      { label: 'Years Experience', value: '8+' },
    ],
    image:
      '/image1.png',
  },
  'german-language': {
    title: 'German Language & Exam Prep (A1-B2)',
    subtitle: 'Levels A1 to B2 for Adults and Kids',
    description:
      'Certified German courses from A1 to B2 designed for both adults and kids. Build confidence to speak, study, and work in Germany with our Goethe-certified instructors.',
    features: [
      'Certified Goethe instructors',
      'Small class sizes for personalized attention',
      'Conversational practice with native speakers',
      'Exam preparation for Goethe certificates',
      'Flexible schedules for adults and kids',
    ],
    stats: [
      { label: 'Pass Rate', value: '94%' },
      { label: 'Students Taught', value: '2K+' },
      { label: 'Course Levels', value: '6' },
    ],
    image:
      '/image3.png',
  },
  'french-language': {
    title: 'French Language & Exam Prep (A1-C1)',
    subtitle: 'Levels A1 to C1 for Adults and Kids',
    description:
      'Join our French Language & Exam Preparatory Classes from A1 to C1, designed for both adults and kids. Start your journey to fluency today with native-speaking instructors.',
    features: [
      'Native French-speaking instructors',
      'DELF and DALF exam preparation',
      'Interactive learning methods',
      'Cultural immersion activities',
      'Flexible scheduling for all ages',
    ],
    stats: [
      { label: 'Proficiency Levels', value: '6' },
      { label: 'Students Enrolled', value: '1.5K+' },
      { label: 'Exam Pass Rate', value: '92%' },
    ],
    image:
      '/image7.png',
  },
  'ielts-exam': {
    title: 'IELTS & Exam Preparatory Classes',
    subtitle: 'IELTS, GMAT, SAT, GRE, GCSE, TOEFL',
    description:
      'Ready to achieve your study, work, or migration goals? Join our IELTS & Exam Preparatory Classes and build the confidence, skills, and strategies you need to succeed!',
    features: [
      'Personalized study plans',
      'Weekly mock exams with feedback',
      'Access to premium study materials',
      'Small group sessions',
      'One-on-one coaching available',
    ],
    stats: [
      { label: 'Avg. Score Increase', value: '25%' },
      { label: 'Success Rate', value: '96%' },
      { label: 'Certified Tutors', value: '40+' },
    ],
    image:
      '/image2.png',
  },
   'corporate-training': {
    title: 'Corporate & Staff Professional Training',
    subtitle: 'Data Analysis, Project Management, Programming, HSE 1-3',
    description:
      "Professional training for corporate bodies and staff on Data Analysis, Project Management, Computer Programming, and HSE Level 1-3. Boost your team's skills with industry-relevant curricula.",
    features: [
      'Data Analysis training',
      'Project Management certification prep',
      'Computer Programming bootcamps',
      'HSE Level 1, 2, and 3 certification',
      'First Aid Courses',
      'Fire Prevention and Protection',
      'Permit To Work (PTW)',
      'Other Related HSE Courses',
    ],
    stats: [
      { label: 'Corporate Clients', value: '50+' },
      { label: 'Staff Trained', value: '1K+' },
      { label: 'Certifications', value: '15+' },
    ],
    image:
      '/image4.png',
  },
  'ict-programs': {
    title: 'Basic & Advanced Professional ICT Programs',
    subtitle: 'Practical Digital Skills for Career Growth',
    description:
      'Gain practical, industry-relevant digital skills designed to boost your career, productivity, and professional opportunities. From basic computer literacy to advanced certifications.',
    features: [
      'Basic computer literacy training',
      'Advanced software proficiency',
      'Industry-recognized certifications',
      'Hands-on practical projects',
      'Career placement support',
    ],
    stats: [
      { label: 'Programs Offered', value: '20+' },
      { label: 'Career Growth', value: '40%' },
      { label: 'Certification Rate', value: '90%' },
    ],
    image:
      '/image3.png',
  },
  'kids-tech': {
    title: 'Kids & Teens Tech Programs',
    subtitle: 'Certified Tech Courses for Kids and Teens',
    description:
      'Join our certified tech courses designed for kids and teens to build confidence in technology. Courses include programming, web development, scratch, and Python.',
    features: [
      'Fun and engaging curriculum',
      'Scratch programming for beginners',
      'Python programming for teens',
      'Web development fundamentals',
      'Certificates upon completion',
    ],
    stats: [
      { label: 'Students Enrolled', value: '500+' },
      { label: 'Courses Available', value: '8+' },
      { label: 'Age Range', value: '6-17' },
    ],
    image:
      '/image6-kids.png',
  },
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
      '/image5.png',
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
      '/image9.png',
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
      '/image10.png',
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
      '/image3.png',
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
      '/study-group.jpg',
  },
};

export default function ServiceDetail() {
  const { id } = useParams();
  const service = serviceData[id] || serviceData['exam-prep'];

  const [form, setForm] = useState({ name: '', email: '' });
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch(
        'https://aoca-resources-backend.onrender.com/contact',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...form, service: location.pathname }),
        },
      );

      if (response.ok) {
        setStatus('success');
        setSubmitted(true);
      } else {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.message || 'Failed to send message. Please try again.');
      }
    } catch (error) {
      setStatus('error');
      setErrorMessage(
        error.message || 'Something went wrong. Please try again later.',
      );
    }
  };

  return (
    <main className="w-full bg-surface overflow-x-hidden">
      {/* Breadcrumb — full width, padded clear of the floating navbar */}
      <section className="w-full pt-28 lg:pt-32 pb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2">
            <Link
              to="/"
              className="font-label-md text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1.5 text-sm"
            >
              <Home className="h-4 w-4" />
              Home
            </Link>
            <span className="text-on-surface-variant/40 text-sm">/</span>
            <span className="font-label-md text-on-surface-variant text-sm">
              Services
            </span>
            <span className="text-on-surface-variant/40 text-sm">/</span>
            <span className="font-label-md text-primary font-semibold text-sm">
              {service.title}
            </span>
          </nav>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-primary font-label-caps font-bold uppercase tracking-widest text-xs mt-6 hover:translate-x-[-4px] transition-transform"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Link>
        </div>
      </section>

      {/* Hero — full width band, constrained content inside */}
      <section className="w-full pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-secondary font-label-caps text-sm block mb-4">
                Service Detail
              </span>
              <h1 className="font-display-hero text-4xl md:text-6xl text-on-surface font-bold mb-6 leading-tight">
                {service.title}
              </h1>
              <p className="font-headline-md text-on-surface-variant mb-8">
                {service.subtitle}
              </p>
              <p className="font-body-lg text-on-surface-variant leading-relaxed mb-12">
                {service.description}
              </p>

              <div className="grid grid-cols-3 gap-8">
                {service.stats.map((stat, i) => (
                  <div key={i}>
                    <h3 className="font-headline-md text-primary mb-1">
                      {stat.value}
                    </h3>
                    <p className="text-xs font-label-caps text-on-surface-variant">
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
              className="relative"
            >
              <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 bg-primary p-10 rounded-3xl text-white hidden md:block max-w-xs shadow-xl">
                <Award className="h-10 w-10 text-secondary-fixed mb-4" />
                <p className="font-headline-md text-lg text-white italic">
                  "The gold standard in professional training and development."
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features + enquiry — full width band, constrained content inside */}
      <section className="w-full pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-12">
              <h2 className="font-headline-lg text-on-surface font-bold">
                Key Features & Benefits
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {service.features.map((feature, i) => (
                  <div key={i} className="flex gap-4">
                    <CheckCircle2 className="h-6 w-6 text-primary shrink-0" />
                    <p className="font-body-md text-on-surface-variant">
                      {feature}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-surface-container-lowest p-10 rounded-2xl shadow-xl border border-outline-variant/30 h-fit">
              <h3 className="font-headline-md text-on-surface font-bold mb-6">
                Ready to Start?
              </h3>
              <p className="font-body-md text-on-surface-variant mb-8 leading-relaxed">
                Join our next cohort and take the first step towards your
                international career.
              </p>
               <form className="space-y-4" onSubmit={handleSubmit}>
                 <input
                   type="text"
                   placeholder="Full Name"
                   required
                   value={form.name}
                   onChange={(e) => setForm({ ...form, name: e.target.value })}
                   className="w-full px-6 py-4 rounded-xl bg-surface-container-low border border-outline-variant/30 focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
                 />
                 <input
                   type="email"
                   placeholder="Email Address"
                   required
                   value={form.email}
                   onChange={(e) => setForm({ ...form, email: e.target.value })}
                   className="w-full px-6 py-4 rounded-xl bg-surface-container-low border border-outline-variant/30 focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
                 />
                 <button
                   type="submit"
                   disabled={status === 'loading'}
                   className="w-full py-5 bg-primary text-on-primary rounded-full font-label-caps font-bold uppercase tracking-widest text-sm hover:bg-primary-container transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                 >
                   {status === 'loading' ? 'Sending...' : 'Enquire Now'}
                 </button>
               </form>
               {status === 'error' && (
                 <div className="mt-4 p-4 bg-red-50 text-red-700 border border-red-200 rounded-xl text-sm flex items-center gap-2">
                   <AlertCircle className="h-5 w-5 shrink-0" />
                   {errorMessage}
                 </div>
               )}
               {submitted && status === 'success' && (
                 <div className="mt-4 p-4 bg-emerald-50 text-emerald-900 border border-emerald-200 rounded-xl text-sm flex items-center gap-2">
                   <CheckCircle2 className="h-5 w-5 text-emerald-700 shrink-0" />
                   <span>
                     Thanks! Our admissions team will reach out to you shortly.
                   </span>
                 </div>
               )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
