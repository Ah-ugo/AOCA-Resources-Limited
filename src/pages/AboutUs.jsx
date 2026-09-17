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
  MapPin,
  Phone,
  Clock,
  Mail,
  Rocket,
  Eye,
  Shield,
  Verified,
  Handshake,
  BookOpen,
  Briefcase,
  BarChart,
  Laptop,
  ShieldCheck,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TopBar from '../components/TopBar';

function AboutUs() {
  const stats = [
    { value: '1,250+', label: 'Visas & Placements' },
    { value: '98.4%', label: 'First-Attempt Goethe Pass' },
    { value: '3', label: 'Centres', suffix: 'Port Harcourt, Lagos & Abuja' },
    { value: '100%', label: 'Anerkennung Guarantees' },
  ];

  const services = [
    {
      title: 'German Visa Travel Consultancy',
      icon: Globe,
      desc: 'Expert guidance through the German visa application process — document verification, embassy coaching, and application tracking for all visa categories.',
      features: [
        'Document verification',
        'Embassy interview coaching',
        'Application tracking & updates',
      ],
      highlight: false,
    },
    {
      title: 'German Language & Exam Prep (A1–B2)',
      icon: BookOpen,
      desc: 'Intensive German language courses from A1 to B2 level, taught by certified instructors with Goethe exam preparation for adults and kids.',
      features: [
        'Goethe-Institut aligned',
        'Exam preparation',
        'Cultural integration',
      ],
      highlight: false,
    },
    {
      title: 'French Language & Exam Prep (A1–C1) ★ Special Emphasis',
      icon: Languages,
      desc: 'Expert French language instruction from A1 to C1 for adults and kids. DELF/DALF preparatory classes with certified instructors — fully immersive and exam-focused.',
      features: [
        'DELF/DALF exam prep',
        'Native-fluency instructors',
        'Adults & children classes',
      ],
      highlight: true,
    },
    {
      title: 'IELTS Exam Preparatory Classes ★ Special Emphasis',
      icon: Award,
      desc: 'Comprehensive IELTS exam preparation covering all four modules: Listening, Reading, Writing, and Speaking. Expert instructors, mock tests, and band-score strategies.',
      features: [
        'Listening & Speaking drills',
        'Academic & General Training',
        'Mock test sessions',
      ],
      highlight: true,
    },
    {
      title: 'Corporate Bodies / Staff Training',
      icon: Briefcase,
      desc: 'Professional development programs for corporate bodies and staff teams across Data Analysis, Project Management, ICT, and HSE.',
      features: [
        'Custom in-house programs',
        'Nationwide delivery',
        'Certified completion',
      ],
      highlight: false,
    },
    {
      title: 'Data Analysis Training ★ Special Emphasis',
      icon: BarChart,
      desc: 'Master Excel for Data Analysis, SQL Databases, Power BI, Tableau, and foundational Python analytics. Available for individuals and corporate staff teams.',
      features: [
        'Excel & Power BI',
        'SQL & Python analytics',
        'Business Intelligence',
      ],
      highlight: true,
    },
    {
      title: 'Project Management Training ★ Special Emphasis',
      icon: Briefcase,
      desc: 'Industry-aligned Project Management Professional methodologies, Agile frameworks, Scrum sprint cycles, and PMP certification preparation for corporate staff.',
      features: [
        'PMP certification prep',
        'Agile & Scrum',
        'Resource tracking',
      ],
      highlight: true,
    },
    {
      title: 'ICT Training (Basic & Advanced) ★ Special Emphasis',
      icon: Laptop,
      desc: 'Professional ICT certification programs from basic computer literacy to advanced tracks including Python programming, Web Development, Software Engineering, and Computer Programming.',
      features: [
        'Basic to Advanced',
        'Certificate on completion',
        'Hands-on lab sessions',
      ],
      highlight: true,
    },
    {
      title: 'Cyber Security Training ★ Special Emphasis',
      icon: Shield,
      desc: 'Network security fundamentals, ethical hacking essentials, cyber defense tactics, risk mitigation, and security architecture training with hands-on lab drills.',
      features: [
        'Ethical hacking',
        'Network defense',
        'Risk mitigation',
      ],
      highlight: true,
    },
    {
      title: 'HSE Level 1–3 Training ★ Special Emphasis',
      icon: ShieldCheck,
      desc: 'General and Advanced Health, Safety & Environment (HSE) Level 1, 2 & 3 Certification. Essential for oil & gas, maritime, construction, and global corporate safety roles.',
      features: [
        'HSE Level 1, 2 & 3',
        'Internationally recognised',
        'Corporate & individual',
      ],
      highlight: true,
    },
    {
      title: 'Kids & Children Tech Programs',
      icon: Users,
      desc: 'Tech programs for kids and children above — Scratch coding, Python robotics, elementary German language modules, and STEM bootcamps for ages 6–16.',
      features: [
        'Ages 6–16',
        'Scratch & Python robotics',
        'After-school & holiday bootcamps',
      ],
      highlight: false,
    },
  ];

  const leaders = [
    {
      name: 'Barr. Emeka O. Adeleke',
      role: 'Consular Director',
      creds: 'LL.M (Goethe Univ. Frankfurt), DAAD Scholar',
      desc: 'Specializing in AufenthG (German Residence Act), Section 16b university migration, and Chancenkarte scoring audits.',
      icon: 'account_balance',
      border: 'border-primary',
    },
    {
      name: 'Frau Chioma N. Richter',
      role: 'Head of German Academy',
      creds: 'Goethe C2 Großes Sprachdiplom Certified',
      desc: 'Former Goethe exam evaluator leading our Port Harcourt immersive phonetic labs, with 98.4% first-time pass rates.',
      icon: 'school',
      border: 'border-secondary',
    },
    {
      name: 'Engr. Tari Victor',
      role: 'Director of ICT & Systems',
      creds: 'B.Eng (UNIPORT), AWS Certified Architect',
      desc: 'Oversees the Port Harcourt dual-screen lab, delivering high-impact curricula aligned with the Munich and Berlin tech markets.',
      icon: 'code',
      border: 'border-primary',
    },
    {
      name: 'Matron Blessing Nwosu',
      role: 'Anerkennung Clinical Lead',
      creds: 'RN, RM, telc Deutsch B2 Pflege Specialist',
      desc: 'Coordinating state licensing recognition (Approbation) and direct hospital placements across North Rhine-Westphalia.',
      icon: 'local_hospital',
      border: 'border-secondary',
    },
  ];

  const accreditations = [
    {
      icon: 'fact_check',
      title: 'CAC RC-7049182',
      desc: 'Duly registered under the Companies and Allied Matters Act, Federal Republic of Nigeria.',
    },
    {
      icon: 'balance',
      title: 'AufenthG Compliance',
      desc: 'Full adherence to Sections 16, 17, 18a, 18b & 20 of the German Skilled Immigration Act.',
    },
    {
      icon: 'translate',
      title: 'Goethe Alignment',
      desc: 'Curricular synchronization with the Common European Framework of Reference for Languages (CEFR).',
    },
    {
      icon: 'handshake',
      title: 'ZAV Protocol Registry',
      desc: 'Direct cooperation with the German Federal Employment Agency (Bundesagentur für Arbeit).',
    },
  ];

  return (
    <div className="min-h-screen bg-surface">
      {/* Hero with ambient backdrops */}
      <section className="relative py-12  md:py-20 overflow-hidden">
        <div className="absolute -top-24 -left-20 w-96 h-96 rounded-full bg-primary-container/10 blur-3xl pointer-events-none"></div>
        <div className="absolute top-1/2 -right-20 w-80 h-80 rounded-full bg-secondary-container/20 blur-3xl pointer-events-none"></div>
        <div className="max-w-7xl mt-26 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-7 flex flex-col items-start">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-container-high text-primary mb-6 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-secondary"></span>
                <span className="font-label-caps text-label-caps uppercase tracking-wider text-primary font-bold">
                  Consular-Grade Relocation & Education
                </span>
              </div>
              <h1 className="font-display-hero text-headline-lg md:text-display-hero text-on-surface tracking-tight leading-tight mb-6">
                Bridging{' '}
                <span className="text-primary italic font-headline-lg md:text-display-hero">
                  Nigerian Talent
                </span>{' '}
                to European Excellence & Sovereign Relocation.
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mb-8 leading-relaxed">
                Founded on unyielding principles of academic pedigree, statutory
                integrity, and clinical immersion at our Port Harcourt flagship
                center. We engineer vetted, life-elevating corridors directly
                into Germany's premier hospitals, technical universities, and
                industrial hubs.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  to="/register"
                  className="px-7 py-3.5 rounded-full bg-primary-container hover:bg-primary text-on-primary font-label-md text-label-md font-semibold transition-all duration-200 shadow-md flex items-center gap-3"
                >
                  <span>Book Sovereign Campus Tour</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href="#facility-showcase"
                  className="px-6 py-3.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md font-semibold transition-all duration-200 flex items-center gap-2"
                >
                  <MapPin className="h-4 w-4 text-secondary" />
                  <span>Inspect Port Harcourt Facility</span>
                </a>
              </div>
              <div className="mt-8 pt-6 border-t border-outline-variant/30 flex items-center gap-3 text-on-surface-variant">
                <Verified className="h-5 w-5 text-secondary" />
                <span className="font-body-sm text-body-sm font-medium">
                  Headquartered at 70 Eligbolo Rd, Rumudumaya, Port Harcourt •
                  CAC Registered RC-7049182
                </span>
              </div>
            </div>
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-xl bg-surface-container-low">
                 <img
                  alt="AOCA Resources Port Harcourt Corporate Admissions and Consular Reception"
                  className="w-full h-[460px] object-cover object-center"
                  src="/ukaegbu.jpeg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent flex flex-col justify-end p-6 text-on-primary">
                  <span className="font-label-caps text-label-caps text-secondary-fixed uppercase tracking-widest mb-1">
                    Port Harcourt Campus
                  </span>
                  <p className="font-title-md text-title-md font-semibold text-on-primary">
                    Executive Admissions Suite & Consular Boardroom
                  </p>
                  <p className="font-body-sm text-body-sm text-surface-variant/90">
                    Rumudumaya, Obio/Akpor LGA, Rivers State
                  </p>
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 bg-surface-container-lowest/95 backdrop-blur-md p-4 rounded-xl shadow-lg border border-outline-variant/30 hidden sm:flex items-center gap-3 max-w-xs">
                <div className="w-10 h-10 rounded-xl bg-primary-container text-on-primary flex items-center justify-center shrink-0">
                  <Verified className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-label-caps text-label-caps text-on-surface font-bold uppercase">
                    100% AufenthG Standard
                  </p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant leading-tight">
                    Federal Skilled Immigration Protocol Compliant
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Strip */}
      <section className="py-10 bg-surface-container-low shadow-inner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col bg-surface-container-lowest p-6 rounded-xl shadow-sm"
              >
                <div className="flex items-baseline gap-1">
                  <span className="font-headline-lg text-headline-lg font-bold text-primary">
                    {stat.value}
                  </span>
                  {stat.suffix && (
                    <span className="font-headline-sm text-headline-sm text-secondary font-bold">
                      {stat.suffix}
                    </span>
                  )}
                </div>
                <span className="font-label-caps text-label-caps uppercase text-on-surface-variant mt-1 font-semibold tracking-wider">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission, Vision, and Institutional Mandate */}
      <section className="py-16 md:py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14">
            <span className="font-label-caps text-label-caps uppercase tracking-widest text-secondary font-bold">
              The African Power House Ethos
            </span>
            <h2 className="font-headline-lg text-headline-lg text-on-surface mt-2 font-bold tracking-tight">
              A Sovereign Bridge Crafted for West Africa's Brightest Minds.
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-4 leading-relaxed">
              AOCA Resources Limited was conceived to replace informal,
              predatory relocation channels with institutional certainty. We
              believe every African doctor, engineer, tech innovator, and
              matriculated scholar deserves pristine diplomatic representation
              and rigorous preparation.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className={`p-6 rounded-2xl shadow-sm flex flex-col justify-between ${service.highlight ? 'bg-secondary/5 border-2 border-secondary shadow-md' : 'bg-surface-container-lowest border border-outline-variant/30'}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${service.highlight ? 'bg-secondary text-secondary-fixed' : 'bg-primary/10 text-primary'}`}>
                      <service.icon className="h-6 w-6" />
                    </div>
                    {service.highlight && (
                      <span className="font-label-caps text-[9px] bg-secondary text-secondary-fixed px-2 py-0.5 rounded font-bold uppercase tracking-wider">Special Emphasis</span>
                    )}
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold mb-2">
                    {service.title}
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed mb-4">
                    {service.desc}
                  </p>
                  <ul className="space-y-2 font-body-sm text-body-sm text-on-surface-variant">
                    {service.features.map((feature, j) => (
                      <li key={j} className="flex items-start gap-2.5">
                        <CheckCircle className="h-4 w-4 text-secondary shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="pt-5 mt-5 border-t border-outline-variant/20 flex items-center text-primary font-label-md text-label-md font-semibold">
                  <span>Learn More</span>
                  <ArrowRight className="h-4 w-4 ml-1" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Facility Showcase */}
      <section
        className="py-16 md:py-24 bg-surface-container-low"
        id="facility-showcase"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="font-label-caps text-label-caps uppercase tracking-widest text-secondary font-bold">
                Physical Infrastructure
              </span>
              <h2 className="font-headline-lg text-headline-lg text-on-surface mt-2 font-bold tracking-tight">
                Inside Port Harcourt's Premier German Academy & ICT Facility.
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant mt-2 max-w-2xl">
                We invite prospective students, parents, and healthcare sponsors
                to witness our live classrooms, language immersion whiteboards,
                and high-performance developer setups.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-label-md text-label-md text-primary font-semibold">
                70 Eligbolo Rd, Rumudumaya
              </span>
              <span className="w-2 h-2 rounded-full bg-primary-container"></span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Card 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-5 bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between"
            >
              <div className="relative h-80 overflow-hidden bg-surface-container">
                 <img
                  alt="Live German Language Grammar Instruction"
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                  src="/image3.png"
                />
                <div className="absolute top-4 left-4 bg-primary-container/90 backdrop-blur-md text-on-primary px-3 py-1 rounded-full text-xs font-label-caps uppercase tracking-wider">
                  Live Pedagogy
                </div>
              </div>
              <div className="p-6">
                <span className="font-label-caps text-label-caps uppercase tracking-wider text-secondary font-bold">
                  A1 - B2 Goethe Curriculum
                </span>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold mt-1">
                  Reflexive Verbs & Medical Syntax
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-2 leading-relaxed">
                  Real-time daily classroom sessions in Port Harcourt led by
                  certified Goethe-format linguists.
                </p>
                <div className="mt-4 pt-4 border-t border-surface-variant/40 flex items-center justify-between text-xs text-on-surface-variant">
                  <span>Classroom: Hall 2A (Port Harcourt)</span>
                  <span className="text-primary font-semibold">
                    15 Students per Cohort Max
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Card 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-7 bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between"
            >
              <div className="relative h-80 overflow-hidden bg-surface-container">
                 <img
                  alt="Dual Monitor ICT Software & Systems Training Center"
                  className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
                  src="/image8.png"
                />
                <div className="absolute top-4 left-4 bg-secondary-container/95 text-on-secondary-container px-3 py-1 rounded-full text-xs font-label-caps uppercase tracking-wider font-bold">
                  Tech Acceleration
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <span className="font-label-caps text-label-caps uppercase tracking-wider text-secondary font-bold">
                    European Workstation Standard
                  </span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-surface-container-high text-primary">
                    Dell High-Spec Workstations
                  </span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold mt-1">
                  State-of-the-Art Dual-Monitor ICT & Cloud Lab
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-2 leading-relaxed">
                  Equipped for Fullstack Engineering, Linux System
                  Administration, and Digital Nursing Documentation suites
                  required by German clinical networks.
                </p>
                <div className="mt-4 pt-4 border-t border-surface-variant/40 grid grid-cols-3 gap-2 text-xs text-on-surface-variant text-center">
                  <div className="bg-surface-container-low p-2 rounded">
                    24/7 Redundant Power
                  </div>
                  <div className="bg-surface-container-low p-2 rounded">
                    Gigabit Fiber Uplink
                  </div>
                  <div className="bg-surface-container-low p-2 rounded">
                    Chancenkarte Certified
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Card 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-8 bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm flex flex-col md:flex-row"
            >
              <div className="md:w-1/2 relative h-64 md:h-auto bg-surface-container overflow-hidden">
                 <img
                  alt="Executive Admissions & Sovereign Advisory Office"
                  className="w-full h-full object-cover object-center"
                  src="/study-group.jpg"
                />
              </div>
              <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between">
                <div>
                  <span className="font-label-caps text-label-caps uppercase tracking-wider text-secondary font-bold">
                    Consular Desk
                  </span>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold mt-1">
                    Executive Advisory Chambers
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-3 leading-relaxed">
                    A serene, high-discretion setting designed for families,
                    nurses, and postgraduates. Discuss block account setup
                    (Sperrkonto), Defizitbescheid evaluation, and embassy
                    dossiers in complete confidentiality.
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                    <Handshake className="h-5 w-5" />
                  </div>
                  <span className="font-body-sm text-body-sm font-semibold text-on-surface">
                    Private Consular Sessions Daily
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Card 4 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-4 bg-primary-container rounded-2xl p-6 md:p-8 text-on-primary flex flex-col justify-between shadow-sm"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-surface-container-lowest/10 flex items-center justify-center mb-4">
                  <Rocket className="h-5 w-5 text-secondary-fixed" />
                </div>
                <span className="font-label-caps text-label-caps uppercase tracking-widest text-secondary-fixed font-bold">
                  Youth & Foundation
                </span>
                <h3 className="font-headline-sm text-headline-sm text-on-primary font-semibold mt-1">
                  Kids & Teens STEM Lab
                </h3>
                <p className="font-body-sm text-body-sm text-on-primary-container mt-3 leading-relaxed">
                  Early bilingual exposure: Scratch, Python robotics, and
                  elementary German language modules preparing the next
                  generation of Nigerian polymaths for global secondary
                  programs.
                </p>
              </div>
              <div className="mt-6">
                <Link
                  to="/services/kids-tech"
                  className="inline-flex items-center gap-2 text-secondary-fixed font-label-md text-label-md font-semibold hover:underline"
                >
                  <span>Explore STEM Curricula</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Executive Directorate & Faculty */}
      <section className="py-16 md:py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="font-label-caps text-label-caps uppercase tracking-widest text-secondary font-bold">
              Academic & Legal Leadership
            </span>
            <h2 className="font-headline-lg text-headline-lg text-on-surface mt-2 font-bold tracking-tight">
              Executive Directorate & Certified Faculty.
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-3">
              Our team unites German bar-certified migration jurists,
              Goethe-certified examiners, and seasoned clinical administrators.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {leaders.map((leader, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`bg-surface-container-lowest rounded-2xl p-6 shadow-sm flex flex-col items-start border-b-2 ${leader.border}`}
              >
                <div className="w-16 h-16 rounded-full bg-surface-container-high flex items-center justify-center mb-5 text-primary">
                  <span className="material-symbols-outlined text-[32px]">
                    {leader.icon}
                  </span>
                </div>
                <span className="font-label-caps text-label-caps text-secondary font-bold uppercase tracking-wider">
                  {leader.role}
                </span>
                <h3 className="font-title-md text-title-md text-on-surface font-semibold mt-1">
                  {leader.name}
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                  {leader.creds}
                </p>
                <p className="font-body-sm text-body-sm text-on-surface-variant/80 mt-4 leading-relaxed">
                  {leader.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Statutory Accreditations */}
      <section className="py-14 bg-surface-container-low">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-surface-container-lowest rounded-3xl p-8 sm:p-12 shadow-md">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5">
                <span className="font-label-caps text-label-caps uppercase tracking-widest text-secondary font-bold">
                  Uncompromising Credibility
                </span>
                <h2 className="font-headline-md text-headline-md text-on-surface font-bold mt-2">
                  Institutional Accreditation & Statutory Governance.
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant mt-4 leading-relaxed">
                  AOCA Resources operates strictly within sovereign legal
                  instruments. We do not participate in unverified visa lottery
                  gimmicks or grey-market schemes.
                </p>
              </div>
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {accreditations.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="p-5 rounded-xl bg-surface-container-low flex items-start gap-4"
                  >
                    <span className="material-symbols-outlined text-primary text-[28px] shrink-0 mt-1">
                      {item.icon}
                    </span>
                    <div>
                      <h4 className="font-title-md text-title-md font-semibold text-on-surface">
                        {item.title}
                      </h4>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Physical Presence */}
      <section className="py-16 md:py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-6 flex flex-col justify-between">
              <div>
                <span className="font-label-caps text-label-caps uppercase tracking-widest text-secondary font-bold">
                  Physical Presence in the Garden City
                </span>
                <h2 className="font-headline-lg text-headline-lg text-on-surface mt-2 font-bold tracking-tight">
                  Rooted in Port Harcourt, Revered in Germany.
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant mt-4 leading-relaxed">
                  We welcome prospective candidates to experience our vibrant
                  learning environment in Rumudumaya. Step into our admissions
                  suites, tour our ICT laboratories, and audit our ongoing
                  Goethe grammar classes.
                </p>
                <div className="mt-8 space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-title-md text-title-md text-on-surface font-semibold">
                        Flagship Campus Address
                      </p>
                      <p className="font-body-md text-body-md text-on-surface-variant">
                        70 Eligbolo Rd, Rumudumaya, Port Harcourt, Rivers State,
                        Nigeria
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-title-md text-title-md text-on-surface font-semibold">
                        Admissions & Consultation Hotlines
                      </p>
                      <p className="font-body-md text-body-md text-on-surface-variant">
                        +234 816 191 0975 • +234 803 886 5466
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-title-md text-title-md text-on-surface font-semibold">
                        Walk-in Consultation Hours
                      </p>
                      <p className="font-body-md text-body-md text-on-surface-variant">
                        Monday – Saturday: 8:00 AM – 5:30 PM (WAT)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-8 pt-6 border-t border-outline-variant/30 flex items-center gap-4">
                <span className="font-label-caps text-label-caps uppercase text-on-surface-variant font-bold">
                  Liaison Chambers:
                </span>
                <span className="text-xs bg-surface-container-high px-3 py-1 rounded-full text-on-surface font-medium">
                  Victoria Island, Lagos
                </span>
                <span className="text-xs bg-surface-container-high px-3 py-1 rounded-full text-on-surface font-medium">
                  Central Area, Abuja
                </span>
              </div>
            </div>
            <div className="lg:col-span-6">
              <div className="bg-surface-container-low rounded-3xl p-6 md:p-8 h-full flex flex-col justify-between shadow-sm">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-label-caps text-label-caps uppercase tracking-wider text-primary font-bold">
                      Location • Rumudumaya Hub
                    </span>
                    <span className="flex items-center gap-1 text-xs text-primary font-semibold">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      Open Today
                    </span>
                  </div>
                  <div
                     className="w-full h-72 rounded-2xl bg-cover bg-center shadow-inner overflow-hidden mb-6"
                     style={{
                       backgroundImage:
                         "url('/image4.png')",
                     }}
                   ></div>
                </div>
                <div className="bg-surface-container-lowest p-5 rounded-xl flex items-center justify-between gap-4">
                  <div>
                    <p className="font-title-md text-title-md font-semibold text-on-surface">
                      Visiting by Car or Transit?
                    </p>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Directly accessible via the Rumokoro - Airport artery.
                      Dedicated parking available.
                    </p>
                  </div>
                  <a
                    href="tel:+2348161910975"
                    className="px-4 py-2.5 rounded-full bg-primary-container hover:bg-primary text-on-primary font-label-md text-body-sm font-semibold shrink-0 transition-colors"
                  >
                    Call Front Desk
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-14 md:py-20 bg-primary-container text-on-primary relative overflow-hidden">
        <div className="absolute -right-16 -bottom-16 w-96 h-96 rounded-full bg-secondary/20 blur-3xl pointer-events-none"></div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="font-label-caps text-label-caps uppercase tracking-widest text-secondary-fixed font-bold">
            Initiate Your European Trajectory
          </span>
          <h2 className="font-headline-lg text-headline-lg md:text-display-hero text-on-primary font-bold mt-3 mb-6 tracking-tight">
            Your Sovereign Relocation Begins with Truth and Preparation.
          </h2>
          <p className="font-body-lg text-body-lg text-on-primary-container max-w-2xl mx-auto mb-10 leading-relaxed">
            Whether you are a Registered Nurse aiming for B2 telc clinical
            certification, an engineer exploring the Chancenkarte, or a graduate
            seeking university entry, our faculty is ready to welcome you.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/register"
              className="px-8 py-4 rounded-full bg-secondary-fixed hover:bg-secondary-fixed-dim text-on-secondary-fixed font-label-md text-label-md font-bold transition-all duration-200 shadow-lg"
            >
              Schedule Free Diagnostic Assessment
            </Link>
            <Link
              to="/contact"
              className="px-8 py-4 rounded-xl bg-surface-container-lowest/10 hover:bg-surface-container-lowest/20 text-on-primary font-label-md text-label-md font-semibold transition-all duration-200"
            >
              Speak with a Relocation Advisor
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutUs;
