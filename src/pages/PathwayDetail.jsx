/** @format */
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  MapPin,
  Phone,
  ShieldCheck,
  Plane,
  Home,
  GraduationCap,
  Stethoscope,
  Briefcase,
  Route as RouteIcon,
  CheckCircle2,
  Languages,
  Gavel,
  Handshake,
  BadgeCheck,
  FileDown,
  MessageCircle,
  Compass,
} from 'lucide-react';

// ---------------------------------------------------------------------------
// Pathway dossier data. Every pathway carries the same shape so the layout
// below can render any of them consistently — mirroring the "Sovereign
// Pathway Dossier" structure used across the site.
// ---------------------------------------------------------------------------
const pathwayData = {
  nursing: {
    icon: Stethoscope,
    tagLabel: 'Sovereign Pathway Dossier • AufenthG §16d / §18a',
    title: 'Nursing Work Contract',
    subtitle:
      'Direct Placement in German Healthcare (Kliniken & Universitätsspitäler)',
    description:
      'A specialized institutional pathway engineered for Nigerian Registered Nurses (RN/RM, B.N.Sc) to secure direct permanent contracts with premier German state hospital networks. We govern the complete transition: linguistic mastery, official professional license recognition (Anerkennung), chancery visa clearances, and tailored settlement in Germany.',
    heroImage:
      '/study-group.jpg',
    heroBadge: 'Klinikum Charité & Vivantes Partner Hubs',
    heroCaption:
      'Direct bilateral hospital sponsorship contracts with accredited German municipal foundations.',
    cohortLabel: 'Cohort 14',
    cohortValue: '18 Hospital Slots Open',
    fastFacts: [
      {
        label: 'Base Remuneration',
        value: '€3,200 – €4,500',
        sub: 'Gross / month (TVöD-P)',
      },
      {
        label: 'Language Standard',
        value: 'B1 & B2 Pflege',
        sub: 'Goethe / telc Certified',
      },
      {
        label: 'Consular Timeline',
        value: '6 – 9 Months',
        sub: 'Enrollment to Landing',
      },
      {
        label: 'Placement Zones',
        value: 'NRW, Bayern, Berlin',
        sub: 'Direct State Clinicians',
      },
    ],
    steps: [
      {
        title: 'Language Proficiency (Goethe / telc B1 & B2 Pflege)',
        window: 'Months 1 – 5',
        desc: 'Achieve B1 general and B2 medical German through our rigorous immersive syllabus at our Flagship Campus (70 Eligbolo Rd, Rumudumaya, Port Harcourt) or live consular virtual laboratories. Focuses heavily on German nursing taxonomy, clinical documentation, and patient communication protocols.',
        tags: [
          'Daily Audio Drills',
          'Fachsprache Pflege',
          'Mock Goethe Testing',
        ],
      },
      {
        title: 'Document Recognition & Defizitbescheid Legal Filing',
        window: 'Concurrent Month 3',
        desc: 'Our legal team submits your Nigerian nursing qualification dossiers (NMCN transcript, curriculum breakdown, and clinical hours) to the respective German State Health Authority (Landesprüfungsamt). We secure the official Defizitbescheid or full recognition approval guaranteeing eligibility to practice.',
        tags: ['ZAB & LPA Filing', 'Sworn German Translations'],
      },
      {
        title: 'Interview Mastery & Permanent Employer Contract',
        window: 'Months 5 – 6',
        desc: 'We coordinate direct digital interview sessions with hospital HR directors and Chief Nursing Officers in Bavaria, Berlin, or North Rhine-Westphalia. You receive a legally binding, open-ended German employment contract (Arbeitsvertrag) providing standard Tarifvertrag benefits, pension, and state healthcare.',
        tags: [
          'Bilateral Contract Signing',
          'Relocation Bonus (€2,000–€3,000)',
        ],
      },
      {
        title: 'Consular Visa Approval & Executive Relocation',
        window: 'Months 7 – 9',
        desc: 'Direct submission of your work visa application under AufenthG §16d (recognition measure) or §18a (skilled worker) at the German Consulate General Lagos or Embassy Abuja with expedited fast-track federal approval (§81a). Includes Frankfurt/Munich airport reception, interim housing, and civil registration (Anmeldung).',
        tags: ['§81a Fast-Track Visa', 'Housing Sourced & Ready'],
      },
    ],
    requirements: [
      {
        title: 'Academic Credential',
        desc: 'Bachelor of Nursing Science (B.N.Sc) or Registered Nurse / Registered Midwife (RN/RM) diploma from an accredited Nigerian institution.',
      },
      {
        title: 'Active NMCN License',
        desc: 'Currently validated nursing license issued by the Nursing and Midwifery Council of Nigeria with clear standing and verifiable pin.',
      },
      {
        title: 'Bedside Experience',
        desc: 'Minimum of 12 months clinical bedside practice post-licensure (ICU, general surgery, pediatric, or acute care ward backgrounds highly prioritized).',
      },
      {
        title: 'Linguistic Dedication',
        desc: 'Preparedness to undertake full-time German instruction from A1 to B2 through AOCA’s Goethe-aligned intensive clinical academy.',
      },
      {
        title: 'Statutory Clearances & Health Clearance',
        desc: 'Valid Nigerian international passport (minimum 2 years validity), clean police character certificate, and medical clearance confirming fitness for shift-based healthcare delivery.',
        wide: true,
      },
    ],
    compensation: {
      heading: 'Salary Progression & Shift Allowances (TVöD-P)',
      note: 'German healthcare salaries are mandated by public collective agreements, providing structured annual increments and guaranteed shift bonuses.',
      phases: [
        {
          label: 'Phase 1: Adaptation',
          value: '€2,600 – €2,900',
          desc: 'During clinical orientation (pre-Anerkennung, approx. 3-6 mos).',
        },
        {
          label: 'Phase 2: Full Nurse',
          value: '€3,400 – €4,200',
          desc: 'Upon receiving official German license as Pflegefachkraft.',
          highlight: true,
        },
        {
          label: 'Phase 3: Specialized',
          value: '€4,200 – €5,200+',
          desc: 'Intensive care (ICU), anesthesia, or senior ward lead roles.',
        },
      ],
    },
  },

  ausbildung: {
    icon: GraduationCap,
    tagLabel: 'Sovereign Pathway Dossier • AufenthG §16a',
    title: 'Ausbildung Dual Training',
    subtitle: 'Earn-While-You-Learn Vocational Contracts Across Germany',
    description:
      'The dual vocational training system pairs classroom theory with paid, on-site work experience inside a real German company. This pathway is built for young Nigerian professionals ready to enter high-demand trades — IT, logistics, hospitality, mechatronics, and care — without a blocked account.',
    heroImage:
      '/image8.png',
    heroBadge: 'Handwerkskammer & IHK Registered Employers',
    heroCaption:
      'Direct dual-training contracts with chambers-registered German companies.',
    cohortLabel: 'Cohort 9',
    cohortValue: '24 Employer Slots Open',
    fastFacts: [
      {
        label: 'Monthly Stipend',
        value: '€1,000 – €1,400',
        sub: 'Paid Training Wage',
      },
      {
        label: 'Language Standard',
        value: 'B1 General',
        sub: 'Goethe / telc Certified',
      },
      {
        label: 'Consular Timeline',
        value: '5 – 8 Months',
        sub: 'Enrollment to Landing',
      },
      {
        label: 'Trade Sectors',
        value: 'IT, Care, Logistics',
        sub: 'Chamber-Registered Employers',
      },
    ],
    steps: [
      {
        title: 'Language Proficiency (Goethe / telc B1)',
        window: 'Months 1 – 4',
        desc: 'Reach B1 general German through our immersive syllabus, with workplace vocabulary drills tailored to the trade you intend to pursue.',
        tags: [
          'Daily Audio Drills',
          'Trade Vocabulary Labs',
          'Mock Goethe Testing',
        ],
      },
      {
        title: 'Program Selection & Employer Matching',
        window: 'Concurrent Month 2',
        desc: 'We map your profile against over 300 vocational programs and connect you directly with chambers-registered German employers actively hiring trainees.',
        tags: ['Employer Interviews', 'Trade Portfolio Review'],
      },
      {
        title: 'Training Contract Signing',
        window: 'Months 4 – 5',
        desc: 'Sign a legally binding Ausbildungsvertrag with your matched employer, setting out your paid monthly stipend, working hours, and college attendance schedule.',
        tags: ['Bilateral Contract Signing', 'Chamber Registration'],
      },
      {
        title: 'Consular Visa Approval & Relocation',
        window: 'Months 6 – 8',
        desc: 'Submission of your vocational training visa under AufenthG §16a at the German Consulate, with airport reception, interim housing, and Anmeldung support on arrival.',
        tags: ['§16a Visa Filing', 'Housing Sourced & Ready'],
      },
    ],
    requirements: [
      {
        title: 'Academic Credential',
        desc: 'Senior secondary certificate (WAEC/NECO) or equivalent, with satisfactory grades in core subjects.',
      },
      {
        title: 'Age Bracket',
        desc: 'Candidates between 18 and 30 years old are strongly preferred by German training employers.',
      },
      {
        title: 'Trade Aptitude',
        desc: 'Demonstrated interest or foundational exposure to the chosen trade (IT, logistics, hospitality, mechatronics, or care).',
      },
      {
        title: 'Linguistic Dedication',
        desc: 'Preparedness to undertake full-time German instruction from A1 to B1 through AOCA’s Goethe-aligned academy.',
      },
      {
        title: 'Statutory Clearances & Health Clearance',
        desc: 'Valid Nigerian international passport (minimum 2 years validity), clean police character certificate, and medical clearance confirming fitness for shift-based work.',
        wide: true,
      },
    ],
    compensation: {
      heading: 'Training Stipend Progression',
      note: 'Ausbildung wages rise each training year and are set by sector-wide collective agreements.',
      phases: [
        {
          label: 'Year 1',
          value: '€1,000 – €1,100',
          desc: 'Foundational training year, part classroom, part workplace.',
        },
        {
          label: 'Year 2',
          value: '€1,100 – €1,250',
          desc: 'Increased workplace hours and responsibility.',
          highlight: true,
        },
        {
          label: 'Year 3 / Qualified',
          value: '€1,250 – €1,400+',
          desc: 'Final training year, transitioning to a full employment contract.',
        },
      ],
    },
  },

  study: {
    icon: RouteIcon,
    tagLabel: 'Sovereign Pathway Dossier • Student Visa §16b',
    title: 'Tuition-Free Study',
    subtitle: 'Academic Admission at Public German Universities',
    description:
      'Germany hosts some of the world’s most prestigious public universities, most of which charge little to no tuition. This pathway takes Nigerian graduates from degree evaluation through to a confirmed university admission letter and a stamped student visa.',
    heroImage:
      '/image3.png',
    heroBadge: 'ZAB-Evaluated, Uni-Assist Partner Institutions',
    heroCaption:
      'Direct application routing to tuition-free public universities across Germany.',
    cohortLabel: 'Winter Intake',
    cohortValue: '30 Application Slots Open',
    fastFacts: [
      {
        label: 'Tuition Cost',
        value: '€0 – €350',
        sub: 'Semester Contribution Fee Only',
      },
      {
        label: 'Language Standard',
        value: 'B2 / C1',
        sub: 'TestDaF or Goethe Certified',
      },
      {
        label: 'Consular Timeline',
        value: '8 – 12 Months',
        sub: 'Enrollment to Landing',
      },
      {
        label: 'Blocked Account',
        value: '€11,904 / yr',
        sub: 'Proof of Financial Means',
      },
    ],
    steps: [
      {
        title: 'Language & Academic Preparation',
        window: 'Months 1 – 6',
        desc: 'Progress through our German academy to B2/C1 while we assess your transcripts against your target degree program’s admission requirements.',
        tags: ['Daily Audio Drills', 'TestDaF Mock Exams'],
      },
      {
        title: 'Degree Evaluation & Application Filing',
        window: 'Concurrent Month 4',
        desc: 'Our team files your transcripts for ZAB/Uni-Assist evaluation and submits applications to matched tuition-free public universities on your behalf.',
        tags: ['Uni-Assist Filing', 'Sworn German Translations'],
      },
      {
        title: 'Admission Offer & Blocked Account Setup',
        window: 'Months 7 – 9',
        desc: 'Once an admission letter is secured, we guide you through opening a blocked account to satisfy financial proof requirements for your visa file.',
        tags: ['Admission Letter Secured', 'Blocked Account Guidance'],
      },
      {
        title: 'Consular Visa Approval & Relocation',
        window: 'Months 10 – 12',
        desc: 'Direct submission of your student visa application at the German Consulate, with mock embassy interviews, airport reception, and Anmeldung support on arrival.',
        tags: ['Student Visa Filing', 'Housing Sourced & Ready'],
      },
    ],
    requirements: [
      {
        title: 'Academic Credential',
        desc: 'Relevant Bachelor’s or Master’s-track qualification with strong, verifiable grades from an accredited institution.',
      },
      {
        title: 'Language Proficiency',
        desc: 'Proof of German (B2/C1, TestDaF) or English proficiency depending on the program’s language of instruction.',
      },
      {
        title: 'Financial Proof',
        desc: 'Ability to fund a blocked account covering the mandated annual living-cost threshold set by German authorities.',
      },
      {
        title: 'Linguistic Dedication',
        desc: 'Preparedness to undertake structured German instruction through AOCA’s Goethe-aligned academy where required.',
      },
      {
        title: 'Statutory Clearances & Health Clearance',
        desc: 'Valid Nigerian international passport (minimum 2 years validity), clean police character certificate, and travel health insurance.',
        wide: true,
      },
    ],
    compensation: null,
  },

  'job-seeker': {
    icon: Briefcase,
    tagLabel: 'Sovereign Pathway Dossier • Chancenkarte §20a',
    title: 'Chancenkarte / Job Seeker',
    subtitle: 'Points-Based Direct Career Entry into Germany',
    description:
      'The Opportunity Card (Chancenkarte) allows qualified Nigerian professionals to enter Germany for up to a year to search for skilled work directly on the ground. We prepare your points-tested profile, your CV, and connect you with recruitment partners before you land.',
    heroImage:
      '/image4.png',
    heroBadge: 'ZAV-Aligned Recruitment Network',
    heroCaption:
      'Direct connections to German employers and recruitment partners across sectors.',
    cohortLabel: 'Cohort 6',
    cohortValue: '15 Profile Slots Open',
    fastFacts: [
      {
        label: 'Points Threshold',
        value: '6 of 14 Points',
        sub: 'Chancenkarte Criteria',
      },
      {
        label: 'Language Standard',
        value: 'B1 / Strong English',
        sub: 'Goethe / telc Certified',
      },
      {
        label: 'Consular Timeline',
        value: '5 – 7 Months',
        sub: 'Enrollment to Landing',
      },
      {
        label: 'Stay Duration',
        value: 'Up to 12 Months',
        sub: 'On-Ground Job Search',
      },
    ],
    steps: [
      {
        title: 'Eligibility & Points Assessment',
        window: 'Month 1',
        desc: 'We score your qualifications, work experience, age, and language ability against the Chancenkarte points matrix to confirm eligibility before filing.',
        tags: ['Points Matrix Scoring', 'Degree Recognition Check'],
      },
      {
        title: 'Profile Optimization & Employer Network',
        window: 'Months 2 – 3',
        desc: 'Your CV and cover letter are rebuilt for the German job market, and routed through our recruitment partners actively hiring in your sector.',
        tags: ['German-Format CV', 'Recruiter Introductions'],
      },
      {
        title: 'Language Certification',
        window: 'Concurrent Month 3',
        desc: 'Candidates without strong English complete our B1 German syllabus to strengthen both the points score and on-ground job search prospects.',
        tags: ['Daily Audio Drills', 'Mock Goethe Testing'],
      },
      {
        title: 'Consular Visa Approval & Relocation',
        window: 'Months 5 – 7',
        desc: 'Direct submission of your Opportunity Card application at the German Consulate, with proof of funds guidance, airport reception, and Anmeldung support on arrival.',
        tags: ['§20a Visa Filing', 'Housing Sourced & Ready'],
      },
    ],
    requirements: [
      {
        title: 'Academic Credential',
        desc: 'Recognized university degree or a completed vocational qualification relevant to your target sector.',
      },
      {
        title: 'Work Experience',
        desc: 'Minimum five years of relevant professional experience, or two years for graduates of recognized universities.',
      },
      {
        title: 'Financial Proof',
        desc: 'Sufficient funds to cover living costs for the duration of your job search stay, per current federal thresholds.',
      },
      {
        title: 'Linguistic Dedication',
        desc: 'Basic German (A1/B1) or demonstrably strong English communication ability for interviews and workplace integration.',
      },
      {
        title: 'Statutory Clearances & Health Clearance',
        desc: 'Valid Nigerian international passport (minimum 2 years validity), clean police character certificate, and travel health insurance.',
        wide: true,
      },
    ],
    compensation: null,
  },
};

const relatedPathwaysFor = (currentId) =>
  Object.entries(pathwayData)
    .filter(([id]) => id !== currentId)
    .map(([id, p]) => ({
      id,
      title: p.title,
      sub: p.fastFacts[0].value + ' · ' + p.fastFacts[0].label,
    }))
    .slice(0, 3);

export default function PathwayDetail() {
  const { id } = useParams();
  const activeId = pathwayData[id] ? id : 'nursing';
  const pathway = pathwayData[activeId];
  const Icon = pathway.icon;
  const related = relatedPathwaysFor(activeId);

  return (
    <main className="w-full bg-surface overflow-x-hidden">
      {/* Breadcrumb + pathway switcher — full width, padded clear of the floating navbar */}
      <section className="w-full pt-28 lg:pt-32 pb-6 border-b border-outline-variant/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-3">
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
                Pathways
              </span>
              <span className="text-on-surface-variant/40 text-sm">/</span>
              <span className="font-label-md text-primary font-semibold text-sm">
                {pathway.title}
              </span>
            </nav>
            <div className="inline-flex items-center gap-2 self-start md:self-auto bg-surface-container-high text-on-surface-variant px-3 py-1 rounded-full shadow-sm">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="font-label-caps text-[11px] uppercase tracking-wider text-primary font-bold">
                2025/2026 Consular Intake Active
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 overflow-x-auto py-2 no-scrollbar">
            {Object.entries(pathwayData).map(([pid, p]) => {
              const PIcon = p.icon;
              const active = pid === activeId;
              return (
                <Link
                  key={pid}
                  to={`/pathways/${pid}`}
                  className={`group flex items-center gap-2 px-5 py-2.5 rounded-full shrink-0 transition-all ${
                    active
                      ? 'bg-primary text-on-primary shadow-md'
                      : 'bg-surface-container-lowest hover:bg-surface-container text-on-surface shadow-sm'
                  }`}
                >
                  <PIcon
                    className={`h-[19px] w-[19px] ${active ? 'text-secondary-fixed' : 'text-on-surface-variant group-hover:text-primary'}`}
                  />
                  <span className="font-label-md font-medium whitespace-nowrap text-sm">
                    {p.title}
                  </span>
                  {active && (
                    <span className="bg-secondary-fixed text-on-secondary-fixed px-2 py-0.5 rounded-full font-label-caps text-[10px] uppercase font-extrabold tracking-tight">
                      Active
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Hero dossier — full width gradient band, constrained card inside */}
      <section className="w-full py-10 lg:py-14 bg-gradient-to-b from-surface-container-low via-surface to-surface-container-low border-b border-outline-variant/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="bg-surface-container-lowest rounded-xl shadow-xl overflow-hidden p-6 sm:p-8 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-7 flex flex-col gap-5"
              >
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="font-label-caps text-[11px] uppercase text-secondary bg-surface-container px-3 py-1 rounded-full font-bold">
                    {pathway.tagLabel}
                  </span>
                  <div className="flex items-center gap-1.5 bg-tertiary/10 text-tertiary px-3 py-1 rounded-full font-label-caps text-[11px] uppercase font-bold">
                    <ShieldCheck className="h-4 w-4" />
                    Fully Supported
                  </div>
                  <div className="flex items-center gap-1.5 bg-primary/10 text-primary px-3 py-1 rounded-full font-label-caps text-[11px] uppercase font-bold">
                    <Plane className="h-4 w-4" />
                    Relocation Ready
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <h1 className="font-display-hero text-4xl sm:text-5xl lg:text-display-hero text-primary tracking-tight">
                    {pathway.title}
                  </h1>
                  <p className="font-headline-sm text-headline-sm text-secondary font-medium">
                    {pathway.subtitle}
                  </p>
                </div>

                <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
                  {pathway.description}
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
                  {pathway.fastFacts.map((f, i) => (
                    <div
                      key={i}
                      className="bg-surface-container-low p-4 rounded-lg flex flex-col gap-1"
                    >
                      <span className="font-label-caps text-[11px] uppercase text-secondary font-bold">
                        {f.label}
                      </span>
                      <span className="font-title-md text-title-md text-primary font-bold">
                        {f.value}
                      </span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">
                        {f.sub}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-4 pt-3">
                  <a
                    href="#eligibility"
                    className="inline-flex items-center justify-center gap-2 bg-primary text-on-primary font-label-md font-semibold px-6 py-3.5 rounded-full shadow-md hover:bg-primary-container transition-all text-sm"
                  >
                    <BadgeCheck className="h-[19px] w-[19px]" />
                    Check Eligibility
                  </a>
                  <a
                    href="#roadmap"
                    className="inline-flex items-center justify-center gap-2 bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md font-medium px-6 py-3.5 rounded-full transition-all text-sm"
                  >
                    Inspect the Roadmap
                    <ArrowUpRight className="h-[18px] w-[18px]" />
                  </a>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="lg:col-span-5 relative"
              >
                <div className="relative rounded-xl overflow-hidden shadow-2xl bg-surface-container">
                  <img
                    alt={pathway.title}
                    className="w-full h-[420px] lg:h-[480px] object-cover object-center"
                    src={pathway.heroImage}
                  />
                  <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-primary/95 via-primary/70 to-transparent flex flex-col text-on-primary">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="h-5 w-5 text-secondary-fixed" />
                      <span className="font-label-caps text-[11px] uppercase font-bold tracking-wider text-secondary-fixed">
                        {pathway.heroBadge}
                      </span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-primary/90 mt-1">
                      {pathway.heroCaption}
                    </p>
                  </div>
                </div>

                <div className="absolute -top-4 -left-4 sm:-top-6 sm:-left-6 bg-surface-container-lowest/95 backdrop-blur-md p-4 rounded-xl shadow-xl flex items-center gap-3.5 max-w-[240px]">
                  <div className="w-12 h-12 rounded-full bg-secondary text-on-secondary flex items-center justify-center shrink-0 shadow-md">
                    <Icon className="h-[26px] w-[26px]" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-title-md text-title-md text-primary font-bold leading-none">
                      100% Guaranteed
                    </span>
                    <span className="font-label-caps text-[11px] uppercase text-secondary font-bold tracking-wide mt-1">
                      Placement Support
                    </span>
                  </div>
                </div>

                <div className="absolute -bottom-4 right-4 bg-surface-container-lowest/95 backdrop-blur-md px-4 py-2.5 rounded-full shadow-lg flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                  <span className="font-body-sm text-body-sm text-on-surface font-medium">
                    {pathway.cohortLabel}:{' '}
                    <strong className="text-primary">
                      {pathway.cohortValue}
                    </strong>
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap + eligibility (left) vs sidebar (right) — full width band, constrained grid inside */}
      <section className="w-full py-16 bg-surface border-b border-outline-variant/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-8 flex flex-col gap-16">
              {/* Roadmap */}
              <div className="flex flex-col gap-8 scroll-mt-28" id="roadmap">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <RouteIcon className="h-[22px] w-[22px] text-secondary" />
                    <span className="font-label-caps text-[11px] uppercase text-secondary font-bold tracking-widest">
                      End-to-End Migration Protocol
                    </span>
                  </div>
                  <h2 className="font-headline-lg text-headline-lg text-primary tracking-tight">
                    The Sovereign Roadmap
                  </h2>
                  <p className="font-body-md text-on-surface-variant max-w-2xl">
                    A frictionless, legally audited migration protocol designed
                    specifically for Nigerian candidates navigating the{' '}
                    {pathway.title.toLowerCase()} pathway.
                  </p>
                </div>

                <div className="flex flex-col gap-6">
                  {pathway.steps.map((step, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.05 }}
                      className="bg-surface-container-lowest p-6 sm:p-8 rounded-xl shadow-md flex flex-col sm:flex-row gap-6"
                    >
                      <div className="flex flex-col items-center sm:items-start shrink-0">
                        <span className="font-headline-lg text-headline-lg text-secondary-container bg-surface-container px-4 py-2 rounded-lg font-bold">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className="font-label-caps text-[11px] text-on-surface-variant uppercase font-bold mt-2">
                          Stage {i + 1}
                        </span>
                      </div>
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between flex-wrap gap-2">
                          <h3 className="font-title-md text-title-md text-primary font-bold">
                            {step.title}
                          </h3>
                          <span className="font-label-caps text-[11px] text-primary bg-primary-fixed/40 px-2.5 py-0.5 rounded-full font-bold">
                            {step.window}
                          </span>
                        </div>
                        <p className="font-body-md text-on-surface-variant">
                          {step.desc}
                        </p>
                        <div className="flex flex-wrap gap-2 pt-2">
                          {step.tags.map((tag, j) => (
                            <span
                              key={j}
                              className="font-body-sm text-body-sm bg-surface-container-low text-on-surface-variant px-3 py-1 rounded-full flex items-center gap-1.5"
                            >
                              <CheckCircle2 className="h-4 w-4 text-primary" />
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Eligibility */}
              <div
                className="bg-surface-container-lowest p-6 sm:p-8 lg:p-10 rounded-xl shadow-md flex flex-col gap-8 scroll-mt-28"
                id="eligibility"
              >
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <BadgeCheck className="h-[22px] w-[22px] text-secondary" />
                    <span className="font-label-caps text-[11px] uppercase text-secondary font-bold tracking-widest">
                      Candidate Prerequisite Framework
                    </span>
                  </div>
                  <h2 className="font-headline-lg text-headline-lg text-primary tracking-tight">
                    Eligibility & Criteria
                  </h2>
                  <p className="font-body-md text-on-surface-variant">
                    Verify your standing against the primary criteria for this
                    pathway before you begin:
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {pathway.requirements.map((req, i) => (
                    <div
                      key={i}
                      className={`bg-surface-container-low p-5 rounded-lg flex items-start gap-4 ${req.wide ? 'md:col-span-2' : ''}`}
                    >
                      <div className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center shrink-0">
                        <CheckCircle2 className="h-[18px] w-[18px]" />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-title-md text-title-md text-primary font-semibold">
                          {req.title}
                        </span>
                        <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                          {req.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-surface-container p-6 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <Gavel className="h-7 w-7 text-primary" />
                    <div className="flex flex-col">
                      <span className="font-title-md text-title-md text-on-surface font-semibold">
                        Unsure where you stand?
                      </span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">
                        Our legal team reviews your documents against current
                        German requirements.
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="w-full sm:w-auto shrink-0 bg-primary text-on-primary hover:bg-primary-container px-5 py-2.5 rounded-full font-label-md font-semibold transition-all text-sm"
                  >
                    Upload Documents for Audit
                  </button>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-4 flex flex-col gap-8 lg:sticky lg:top-28">
              <div className="bg-primary text-on-primary p-7 rounded-xl shadow-xl flex flex-col gap-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-secondary text-on-secondary flex items-center justify-center shrink-0">
                    <Languages className="h-[22px] w-[22px]" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-title-md text-title-md font-bold text-on-primary">
                      Consular Guidance
                    </span>
                    <span className="font-label-caps text-[11px] text-secondary-fixed uppercase font-bold tracking-widest">
                      Migration Desk
                    </span>
                  </div>
                </div>
                <p className="font-body-sm text-body-sm text-on-primary/90">
                  Speak with our senior counselors to calculate your exact
                  timeline and reserve an open intake slot for this pathway.
                </p>
                <button
                  type="button"
                  className="w-full bg-secondary text-on-secondary font-label-md font-bold py-3.5 px-4 rounded-lg shadow-md hover:bg-secondary-fixed hover:text-on-secondary-fixed transition-all flex items-center justify-center gap-2 text-sm"
                >
                  <Handshake className="h-[19px] w-[19px]" />
                  Book Free Diagnostic Session
                </button>
                <div className="flex flex-col gap-2 pt-2 border-t border-on-primary/10">
                  <span className="font-label-caps text-[11px] uppercase text-secondary-fixed tracking-wider font-bold">
                    Direct Dispatch:
                  </span>
                  <a
                    href="tel:+2348161910975"
                    className="font-title-md text-title-md text-on-primary font-semibold hover:text-secondary-fixed transition-colors flex items-center gap-2"
                  >
                    <Phone className="h-[18px] w-[18px]" />
                    +234 816 191 0975
                  </a>
                  <a
                    href="tel:+2348038865466"
                    className="font-title-md text-title-md text-on-primary font-semibold hover:text-secondary-fixed transition-colors flex items-center gap-2"
                  >
                    <Phone className="h-[18px] w-[18px]" />
                    +234 803 886 5466
                  </a>
                </div>
                <div className="flex items-center gap-2 text-on-primary/70 font-body-sm text-body-sm text-[12px]">
                  <MapPin className="h-4 w-4" />
                  Flagship: 70 Eligbolo Rd, Rumudumaya, PHC
                </div>
              </div>

              <div className="bg-surface-container-lowest p-6 rounded-xl shadow-md flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <Compass className="h-5 w-5 text-primary" />
                  <span className="font-label-caps text-[11px] uppercase text-secondary font-bold tracking-widest">
                    Alternative Tracks
                  </span>
                </div>
                <h3 className="font-title-md text-title-md text-primary font-bold">
                  Related Pathways to Germany
                </h3>
                <div className="flex flex-col gap-3">
                  {related.map((r) => (
                    <Link
                      key={r.id}
                      to={`/pathways/${r.id}`}
                      className="p-3.5 rounded-lg bg-surface-container-low hover:bg-surface-container transition-colors flex items-center justify-between group"
                    >
                      <div className="flex flex-col">
                        <span className="font-label-md font-semibold text-primary group-hover:text-primary-container text-sm">
                          {r.title}
                        </span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant text-[12px]">
                          {r.sub}
                        </span>
                      </div>
                      <ArrowRight className="h-[18px] w-[18px] text-on-surface-variant group-hover:text-primary transition-colors" />
                    </Link>
                  ))}
                </div>
              </div>

              <div className="bg-surface-container p-6 rounded-xl flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-surface-container-lowest text-primary flex items-center justify-center shrink-0 shadow-sm">
                    <FileDown className="h-5 w-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-label-md font-bold text-primary text-sm">
                      Placement Dossier
                    </span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant text-[12px]">
                       Official 2025–2026 PDF Edition
                    </span>
                  </div>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Includes partner lists, the full syllabus, and chancery
                  document checklists for this pathway.
                </p>
                <button
                  type="button"
                  className="w-full bg-surface-container-lowest hover:bg-surface-container-high text-primary font-label-md font-semibold py-2.5 px-4 rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2 text-sm"
                >
                  <FileDown className="h-[18px] w-[18px]" />
                  Download Official PDF Dossier
                </button>
              </div>

              <div className="flex flex-col gap-3 p-4 rounded-lg bg-surface-container-low">
                <span className="font-label-caps text-[10px] uppercase text-secondary font-bold tracking-widest">
                  Statutory & Academic Seals
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-body-sm text-primary font-semibold bg-surface-container-lowest px-2.5 py-1 rounded shadow-sm text-[12px]">
                    CAC RC: 7049182
                  </span>
                  <span className="font-body-sm text-primary font-semibold bg-surface-container-lowest px-2.5 py-1 rounded shadow-sm text-[12px]">
                    AufenthG Compliant
                  </span>
                  <span className="font-body-sm text-primary font-semibold bg-surface-container-lowest px-2.5 py-1 rounded shadow-sm text-[12px]">
                    Goethe Curricular Prep
                  </span>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Compensation — full-bleed primary band, matching the home page's ICT/HSE section */}
      {pathway.compensation && (
        <section className="w-full py-16 bg-primary text-on-primary border-b border-primary-container">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <span className="font-label-caps text-[11px] uppercase text-secondary-fixed font-bold tracking-widest">
                Public Sector Collective Agreement
              </span>
              <h3 className="font-headline-md text-headline-md text-white font-bold">
                {pathway.compensation.heading}
              </h3>
              <p className="font-body-md text-white/80 max-w-2xl">
                {pathway.compensation.note}
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {pathway.compensation.phases.map((phase, i) => (
                <div
                  key={i}
                  className={`p-5 rounded-xl flex flex-col gap-2 border border-white/10 ${
                    phase.highlight
                      ? 'bg-primary-container'
                      : 'bg-primary-container/60'
                  }`}
                >
                  <span
                    className={`font-label-caps text-[11px] uppercase font-bold ${
                      phase.highlight ? 'text-secondary-fixed' : 'text-white/80'
                    }`}
                  >
                    {phase.label}
                  </span>
                  <span className="font-headline-sm text-headline-sm text-white font-bold">
                    {phase.value}
                  </span>
                  <span className="font-body-sm text-body-sm text-white/80">
                    {phase.desc}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* WhatsApp strip — full width band */}
      <section className="w-full py-10 bg-surface-container-high">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="w-full bg-surface-container-lowest rounded-xl p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-full bg-primary text-secondary-fixed flex items-center justify-center shrink-0 shadow-md">
                <MessageCircle className="h-6 w-6" />
              </div>
              <div className="flex flex-col">
                <span className="font-title-md text-title-md text-primary font-bold">
                  Have Specific Questions About Your Profile?
                </span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  Immediate review via WhatsApp with our Admissions Director in
                  Port Harcourt.
                </span>
              </div>
            </div>
            <a
              href="https://wa.me/4915901149844"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary text-on-primary hover:bg-primary-container px-6 py-3 rounded-full font-label-md font-semibold transition-all shadow-md text-sm"
            >
              <MessageCircle className="h-[19px] w-[19px]" />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
