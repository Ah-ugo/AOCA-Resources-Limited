/** @format */

'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  MessageSquare,
  Verified,
  Calendar,
  BadgeCheck,
  Globe,
  Shield,
  Navigation,
  Flag,
  HelpCircle,
  ChevronDown,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import PageLayout from '../components/PageLayout';

const STUDY_MODES = [
  'Physical Campus (Port Harcourt)',
  'Live Online Zoom Cohort',
  'Weekend Executive Class',
];

const FAQ_ITEMS = [
  {
    q: 'Can I inspect classrooms before paying tuition?',
    a: 'Yes, absolutely. We welcome candidates Monday to Saturday to inspect our multimedia German studios, meet faculty, and observe an ongoing session.',
  },
  {
    q: 'Are Goethe exam preparation books included?',
    a: 'All registered students receive complete Cornelsen or Hueber German curriculum textbooks, audio modules, and Goethe-Zertifikat mock exercise test packs.',
  },
  {
    q: 'How quickly can I begin the A1 cohort?',
    a: 'New physical and virtual morning/evening batches commence every 1st and 3rd Monday of each calendar month.',
  },
];

const INITIAL_FORM_DATA = {
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  service: '',
  study_mode: STUDY_MODES[0].toLowerCase().replace(/\s+/g, '-'),
  message: '',
};

export default function Contact() {
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

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
        setShowSuccess(true);
        setFormData(INITIAL_FORM_DATA);
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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setShowSuccess(false);
    setStatus('idle');
    setFormData(INITIAL_FORM_DATA);
  };

  return (
    <>
      {/* Top Sovereign Header / Hero */}
      <section className="relative overflow-hidden bg-primary text-on-primary py-space-xl lg:py-24 px-margin-mobile md:px-margin-tablet lg:px-margin">
        <div className="absolute inset-0 pointer-events-none opacity-10 bg-[radial-gradient(#fed488_1px,transparent_1px)] [background-size:24px_24px]"></div>
        <div className="max-w-7xl mx-auto mt-26 relative z-10">
          <div className="flex flex-col items-start max-w-3xl space-y-space-md">
            <div className="inline-flex items-center gap-space-xs px-space-md py-space-xs rounded-full bg-primary-container text-secondary-fixed text-label-caps font-label-caps uppercase tracking-widest shadow-sm">
              <span className="inline-block w-2 h-2 rounded-full bg-secondary-container animate-pulse"></span>
              <span>Direct Admissions & Sovereign Inquiries</span>
            </div>
            <h1 className="font-headline-lg text-headline-lg lg:text-display-hero text-on-primary tracking-tight">
              Connect with Our Port Harcourt Campus & Diplomatic Advisors.
            </h1>
            <p className="font-body-lg text-body-lg text-primary-fixed/85 max-w-2xl leading-relaxed">
              Whether you want to visit our live classrooms at Rumudumaya,
              schedule a diagnostic German language test, or initiate your
              Nursing or Opportunity Card migration dossier, our admissions team
              is on ground to guide you.
            </p>
            <div className="pt-space-sm flex flex-wrap items-center gap-space-md text-label-md font-label-md">
              <div className="flex items-center gap-space-xs text-secondary-fixed bg-surface-container-lowest/10 px-space-md py-space-xs rounded-lg backdrop-blur-sm">
                <Verified className="h-4 w-4" />
                <span>Accredited Consular Protocols</span>
              </div>
              <div className="flex items-center gap-space-xs text-secondary-fixed bg-surface-container-lowest/10 px-space-md py-space-xs rounded-lg backdrop-blur-sm">
                <Calendar className="h-4 w-4" />
                <span>Same-Day Response Assurance</span>
              </div>
              <div className="flex items-center gap-space-xs text-secondary-fixed bg-surface-container-lowest/10 px-space-md py-space-xs rounded-lg backdrop-blur-sm">
                <BadgeCheck className="h-4 w-4" />
                <span>Verified Institution</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Multi-Campus Hubs Grid */}
      <section className="w-full py-space-xl px-margin-mobile md:px-margin-tablet lg:px-margin bg-surface">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-lg">
            <div>
              <span className="font-label-caps text-label-caps text-secondary uppercase tracking-widest">
                Physical & Transnational Infrastructure
              </span>
              <h2 className="font-headline-md text-headline-md text-primary mt-space-xs">
                Our Admissions Hubs & International Offices
              </h2>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant max-w-sm mt-space-xs md:mt-0">
              Walk in during designated hours for direct profile evaluation,
              certified transcripts review, or classroom audits.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-space-lg items-stretch">
            {/* Hub Card 1: Port Harcourt Main Campus */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col bg-surface-container-lowest rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl group relative"
            >
              <div className="absolute top-4 left-4 z-20">
                <span className="px-space-sm py-space-xs rounded bg-primary text-secondary-fixed font-label-caps text-label-caps tracking-wider uppercase shadow-sm">
                  Headquarters & Training Campus
                </span>
              </div>
              <div className="relative h-60 w-full overflow-hidden bg-surface-container">
                 <img
                  alt="Port Harcourt Computer & ICT Training Lab"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  src="/image8.png"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-3 left-4 right-4 text-on-primary">
                  <span className="font-label-caps text-label-caps text-secondary-container">
                    RIVERS STATE, NIGERIA
                  </span>
                  <h3 className="font-headline-sm text-headline-sm text-on-primary">
                    Port Harcourt Main Campus
                  </h3>
                </div>
              </div>
              <div className="p-space-lg flex-1 flex flex-col justify-between space-y-space-md">
                <div className="space-y-space-md">
                  <div className="flex items-start gap-space-sm text-on-surface">
                    <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <span className="font-label-md text-label-md font-semibold text-on-surface block">
                        Campus Address
                      </span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">
                        70 Eligbolo Rd, Rumudumaya, Port Harcourt, Rivers State,
                        Nigeria
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start gap-space-sm text-on-surface">
                    <Phone className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <span className="font-label-md text-label-md font-semibold text-on-surface block">
                        Direct Call Desks
                      </span>
                      <div className="flex flex-col gap-0.5 mt-1 font-body-sm text-body-sm text-on-surface">
                        <a
                          href="tel:+2348161910975"
                          className="hover:text-primary transition-colors font-medium"
                        >
                          +234 816 191 0975
                        </a>
                        <a
                          href="tel:+2348038865466"
                          className="hover:text-primary transition-colors font-medium"
                        >
                          +234 803 886 5466
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-space-sm text-on-surface">
                    <Clock className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <span className="font-label-md text-label-md font-semibold text-on-surface block">
                        Instructional Hours
                      </span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">
                        Mon – Fri: 8:00 AM – 5:30 PM
                        <br />
                        Sat: 9:00 AM – 4:00 PM
                      </span>
                    </div>
                  </div>
                  <div className="p-space-sm bg-surface-container-low rounded-lg text-body-sm text-on-surface-variant">
                    <strong className="text-primary font-semibold block mb-1">
                      Campus Infrastructure:
                    </strong>
                    German language lecture halls, dedicated computer
                    workstations, continuous power backup, student lounge.
                  </div>
                </div>
                <div className="pt-space-sm flex flex-col sm:flex-row gap-space-xs">
                   <a
                     href="https://wa.me/4915901149844"
                     target="_blank"
                     rel="noopener noreferrer"
                     className="flex-1 inline-flex items-center justify-center gap-space-xs px-space-md py-space-sm rounded-lg bg-primary text-on-primary hover:bg-primary-container font-label-md text-label-md transition-all shadow-sm"
                   >
                    <MessageCircle className="h-4 w-4 text-secondary-fixed" />
                    <span>WhatsApp Desk</span>
                  </a>
                  <a
                    href="#booking-form"
                    className="inline-flex items-center justify-center px-space-md py-space-sm rounded-lg bg-surface-container text-on-surface hover:bg-surface-container-high font-label-md text-label-md transition-all"
                  >
                    <span>Book Visit</span>
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Hub Card 2: Lagos & Abuja Desks */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="flex flex-col bg-surface-container-lowest rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl group"
            >
              <div className="relative h-60 w-full overflow-hidden bg-surface-container">
                 <img
                  alt="AOCA Resources Executive Admissions Lounge"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  src="/study-group.jpg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-3 left-4 right-4 text-on-primary">
                  <span className="font-label-caps text-label-caps text-secondary-container">
                    METROPOLITAN HUBS
                  </span>
                  <h3 className="font-headline-sm text-headline-sm text-on-primary">
                    Lagos & Abuja Desks
                  </h3>
                </div>
              </div>
              <div className="p-space-lg flex-1 flex flex-col justify-between space-y-space-md">
                <div className="space-y-space-md">
                  <div className="flex items-start gap-space-sm text-on-surface">
                    <MapPin className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                    <div>
                      <span className="font-label-md text-label-md font-semibold text-on-surface block">
                        Lagos Liaison
                      </span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">
                        Plot 14, Admiralty Way, Lekki Phase 1, Lagos, Nigeria
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start gap-space-sm text-on-surface">
                    <MapPin className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                    <div>
                      <span className="font-label-md text-label-md font-semibold text-on-surface block">
                        Abuja Consular Suite
                      </span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">
                        Grand Pavilion, 3rd Floor, Maitama District, Abuja FCT
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start gap-space-sm text-on-surface">
                    <Clock className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                    <div>
                      <span className="font-label-md text-label-md font-semibold text-on-surface block">
                        Consultation Calendar
                      </span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">
                        Mon – Fri: 9:00 AM – 5:00 PM
                        <br />
                        (Exclusively by pre-booked appointment)
                      </span>
                    </div>
                  </div>
                  <div className="p-space-sm bg-surface-container-low rounded-lg text-body-sm text-on-surface-variant">
                    <strong className="text-on-surface font-semibold block mb-1">
                      Executive Advisory:
                    </strong>
                    Private evaluations for doctors, registered nurses, and
                    executive Chancenkarte candidates.
                  </div>
                </div>
                <div className="pt-space-sm">
                  <a
                    href="#booking-form"
                    className="w-full inline-flex items-center justify-center gap-space-xs px-space-md py-space-sm rounded-lg bg-surface-container text-on-surface hover:bg-surface-container-high font-label-md text-label-md transition-all"
                  >
                    <Calendar className="h-4 w-4" />
                    <span>Request Liaison Meeting</span>
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Hub Card 3: Germany International Office */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col bg-surface-container-lowest rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl group"
            >
              <div className="relative h-60 w-full overflow-hidden bg-surface-container">
                 <img
                  alt="German Healthcare and Hospital Placement Liaison"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  src="/image6-kids.png"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-3 left-4 right-4 text-on-primary">
                  <span className="font-label-caps text-label-caps text-secondary-container">
                    EUROPEAN ON-GROUND LIAISON
                  </span>
                  <h3 className="font-headline-sm text-headline-sm text-on-primary">
                    Frankfurt am Main
                  </h3>
                </div>
              </div>
              <div className="p-space-lg flex-1 flex flex-col justify-between space-y-space-md">
                <div className="space-y-space-md">
                  <div className="flex items-start gap-space-sm text-on-surface">
                    <Globe className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <span className="font-label-md text-label-md font-semibold text-on-surface block">
                        Federal Republic of Germany
                      </span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">
                        Mainzer Landstraße 49, 60329 Frankfurt am Main, Germany
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start gap-space-sm text-on-surface">
                    <Shield className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <span className="font-label-md text-label-md font-semibold text-on-surface block">
                        In-Country Reception Services
                      </span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">
                        Employer matching, Anerkennung hospital integration, and
                        airport pickup reception.
                      </span>
                    </div>
                  </div>
                   <div className="flex items-start gap-space-sm text-on-surface">
                      <Mail className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <span className="font-label-md text-label-md font-semibold text-on-surface block">
                          Gmail Address
                        </span>
                        <a href="mailto:aocaresourcesltd@gmail.com" className="font-body-sm text-body-sm text-secondary hover:underline font-semibold">
                          aocaresourcesltd@gmail.com
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-space-sm text-on-surface">
                      <Mail className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <span className="font-label-md text-label-md font-semibold text-on-surface block">
                          Official Email
                        </span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">
                          info@aocaresourcesltd.com
                        </span>
                      </div>
                    </div>
                    <div className="flex items-start gap-space-sm text-on-surface">
                      <Phone className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <span className="font-label-md text-label-md font-semibold text-on-surface block">
                          German Desk Phone
                        </span>
                        <a href="tel:+4915901149844" className="font-body-sm text-body-sm text-secondary hover:underline font-semibold">
                          +49 159 0114984
                        </a>
                      </div>
                    </div>
                   <div className="p-space-sm bg-surface-container-low rounded-lg text-body-sm text-on-surface-variant">
                    <strong className="text-primary font-semibold block mb-1">
                      German Labor Compliance:
                    </strong>
                    Facilitating direct contracts with clinic syndicates and
                    registered German employers under Aufenthaltsgesetz.
                  </div>
                </div>
                <div className="pt-space-sm">
                  <a
                    href="mailto:germany@aocaresourcesltd.com"
                    className="w-full inline-flex items-center justify-center gap-space-xs px-space-md py-space-sm rounded-lg bg-surface-container text-on-surface hover:bg-surface-container-high font-label-md text-label-md transition-all"
                  >
                    <MessageSquare className="h-4 w-4" />
                    <span>Contact European Desk</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Interactive Section: Split Consultation Form + Map & Quick Guidance */}
      <section
        className="w-full py-space-xl px-margin-mobile md:px-margin-tablet lg:px-margin bg-surface-container-low"
        id="booking-form"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
            {/* Left Column: Campus Geography & FAQ */}
            <div className="lg:col-span-5 flex flex-col space-y-space-lg">
              <div>
                <span className="font-label-caps text-label-caps text-secondary uppercase tracking-wider">
                  Campus Coordinates & Access
                </span>
                <h2 className="font-headline-md text-headline-md text-primary mt-space-xs">
                  Find Us in Rumudumaya
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant mt-space-xs">
                  Easily accessible from Port Harcourt international airport
                  road and Rumuokoro flyover interchange.
                </p>
              </div>

              {/* Map Card */}
              <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-md space-y-space-md">
                 <div
                   className="w-full h-56 rounded-lg bg-cover bg-center relative overflow-hidden flex items-end p-4 shadow-sm"
                   style={{
                     backgroundImage:
                       "url('/image10.png')",
                   }}
                 >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                  <div className="relative z-10 text-white flex items-center justify-between w-full">
                    <div>
                      <div className="flex items-center gap-1.5 font-label-md text-label-md font-semibold text-secondary-container">
                        <MapPin className="h-4 w-4" />
                        <span>Eligbolo Rd, Rumudumaya</span>
                      </div>
                      <span className="font-body-sm text-body-sm text-white/80 block">
                        Lat: 4.8672° N | Long: 7.0068° E
                      </span>
                    </div>
                    <a
                      href="https://maps.google.com/?q=70+Eligbolo+Rd+Rumudumaya+Port+Harcourt"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-space-sm py-1 bg-surface-container-lowest text-primary rounded font-label-caps text-label-caps uppercase hover:bg-secondary-container transition-colors shadow-sm"
                    >
                      View Map
                    </a>
                  </div>
                </div>

                <div className="space-y-space-xs text-body-sm text-on-surface-variant pt-space-xs">
                  <div className="flex items-start gap-space-xs">
                    <Navigation className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span>
                      <strong>From Rumuokoro Junction:</strong> Drive 4 minutes
                      toward Rumudumaya. Turn right into Eligbolo Road. The AOCA
                      administrative building is on your right.
                    </span>
                  </div>
                  <div className="flex items-start gap-space-xs">
                    <Flag className="h-4 w-4 text-secondary shrink-0 mt-0.5" />
                    <span>
                      <strong>Landmarks:</strong> Close to Eligbolo Roundabout
                      and adjacent to top commercial banking institutions.
                    </span>
                  </div>
                </div>
              </div>

              {/* FAQ Accordion */}
              <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-md space-y-space-sm">
                <h3 className="font-title-md text-title-md text-primary font-semibold flex items-center gap-space-xs">
                  <HelpCircle className="h-5 w-5 text-secondary" />
                  <span>Admissions & Visit FAQ</span>
                </h3>
                <div className="divide-y-0 space-y-2 mt-2">
                  {FAQ_ITEMS.map((item, i) => {
                    const isOpen = openFaqIndex === i;
                    return (
                      <div
                        key={item.q}
                        className="bg-surface-container-low rounded-lg p-space-sm"
                      >
                        <button
                          className="w-full flex items-center justify-between text-left font-label-md text-label-md font-semibold text-on-surface"
                          onClick={() => setOpenFaqIndex(isOpen ? -1 : i)}
                          aria-expanded={isOpen}
                          type="button"
                        >
                          <span>{item.q}</span>
                          <ChevronDown
                            className={`h-4 w-4 text-primary shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                          />
                        </button>
                        {isOpen && (
                          <div className="font-body-sm text-body-sm text-on-surface-variant mt-2">
                            {item.a}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Column: Official Inquiry & Booking Form */}
            <div className="lg:col-span-7 bg-surface-container-lowest p-space-lg md:p-space-xl rounded-xl shadow-lg relative">
              <div className="mb-space-md">
                <span className="font-label-caps text-label-caps text-secondary uppercase tracking-widest">
                  Formal Consular Assessment
                </span>
                <h2 className="font-headline-md text-headline-md text-primary mt-space-xs">
                  Official Inquiry & Diagnostic Session
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                  Submit your candidate background below. A dedicated Port
                  Harcourt consular advisor will review your eligibility and
                  respond within 3 operating hours.
                </p>
              </div>

              {showSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute inset-0 z-30 bg-surface-container-lowest/95 backdrop-blur-md rounded-xl p-space-xl flex flex-col items-center justify-center text-center space-y-space-md"
                >
                  <div className="w-16 h-16 rounded-full bg-primary-fixed flex items-center justify-center text-primary shadow-sm">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h3 className="font-headline-md text-headline-md text-primary">
                    Inquiry Dossier Registered
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant max-w-md">
                    Thank you for contacting AOCA Resources Limited. An academic
                    counselor from our Port Harcourt Desk has been assigned to
                    your profile and will phone or WhatsApp you within 3
                    business hours.
                  </p>
                  <div className="pt-space-sm flex gap-space-sm">
                    <a
                      href="https://wa.me/4915901149844"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-space-md py-space-sm bg-primary text-on-primary rounded-lg font-label-md text-label-md inline-flex items-center gap-2"
                    >
                      <MessageCircle className="h-4 w-4 text-secondary-fixed" />
                      <span>Open Instant WhatsApp Session</span>
                    </a>
                    <button
                      onClick={resetForm}
                      className="px-space-md py-space-sm bg-surface-container text-on-surface rounded-lg font-label-md text-label-md"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                </motion.div>
              ) : (
                <form
                  className="space-y-space-md"
                  id="contactForm"
                  onSubmit={handleSubmit}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                    <div className="flex flex-col space-y-1">
                      <label
                        className="font-label-md text-label-md font-semibold text-on-surface"
                        htmlFor="firstName"
                      >
                        First Name <span className="text-red-600">*</span>
                      </label>
                      <input
                        className="w-full px-space-md py-space-sm bg-surface rounded-lg text-body-md text-on-surface focus:outline-none focus:bg-surface-container-lowest shadow-sm placeholder:text-outline"
                        id="firstName"
                        placeholder="e.g. Samuel"
                        required
                        value={formData.first_name}
                        onChange={handleChange}
                        name="first_name"
                      />
                    </div>
                    <div className="flex flex-col space-y-1">
                      <label
                        className="font-label-md text-label-md font-semibold text-on-surface"
                        htmlFor="lastName"
                      >
                        Last Name <span className="text-red-600">*</span>
                      </label>
                      <input
                        className="w-full px-space-md py-space-sm bg-surface rounded-lg text-body-md text-on-surface focus:outline-none focus:bg-surface-container-lowest shadow-sm placeholder:text-outline"
                        id="lastName"
                        placeholder="e.g. Okafor"
                        required
                        value={formData.last_name}
                        onChange={handleChange}
                        name="last_name"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                    <div className="flex flex-col space-y-1">
                      <label
                        className="font-label-md text-label-md font-semibold text-on-surface"
                        htmlFor="phoneNumber"
                      >
                        Phone / WhatsApp Number{' '}
                        <span className="text-red-600">*</span>
                      </label>
                      <input
                        className="w-full px-space-md py-space-sm bg-surface rounded-lg text-body-md text-on-surface focus:outline-none focus:bg-surface-container-lowest shadow-sm placeholder:text-outline"
                        id="phoneNumber"
                        placeholder="+234 816 191 0975"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        name="phone"
                      />
                    </div>
                    <div className="flex flex-col space-y-1">
                      <label
                        className="font-label-md text-label-md font-semibold text-on-surface"
                        htmlFor="emailAddress"
                      >
                        Official Email Address{' '}
                        <span className="text-red-600">*</span>
                      </label>
                      <input
                        className="w-full px-space-md py-space-sm bg-surface rounded-lg text-body-md text-on-surface focus:outline-none focus:bg-surface-container-lowest shadow-sm placeholder:text-outline"
                        id="emailAddress"
                        placeholder="samuel.okafor@example.com"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        name="email"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col space-y-1">
                    <label
                      className="font-label-md text-label-md font-semibold text-on-surface"
                      htmlFor="programTrack"
                    >
                      Select Relocation or Academic Track{' '}
                      <span className="text-red-600">*</span>
                    </label>
                    <select
                      className="w-full px-space-md py-space-sm bg-surface rounded-lg text-body-md text-on-surface focus:outline-none focus:bg-surface-container-lowest shadow-sm"
                      id="programTrack"
                      required
                      value={formData.service}
                      onChange={handleChange}
                      name="service"
                    >
                      <option value="">
                        Select an institutional pathway...
                      </option>
                      <option value="german-a1-c2">
                        German Language Mastery (A1, A2, B1, B2, C1)
                      </option>
                      <option value="nursing-healthcare">
                        Healthcare & Nursing Fast-Track Placement (Direct
                        Hospital Contracts)
                      </option>
                      <option value="chancenkarte">
                        Opportunity Card (Chancenkarte) Legal Migration
                      </option>
                      <option value="ausbildung">
                        Dual Vocational Training (Ausbildung Stipend Pathway)
                      </option>
                      <option value="university">
                        German University Placement (Tuition-Free BSc / MSc)
                      </option>
                      <option value="tech-placement">
                        Software Engineering & Tech Placement (EU Blue Card)
                      </option>
                      <option value="hse-courses">
                        General HSE Level 1, 2, 3 Certification
                      </option>
                    </select>
                  </div>

                  <div className="flex flex-col space-y-2">
                    <label className="font-label-md text-label-md font-semibold text-on-surface">
                      Preferred Mode of Instruction / Advisory
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {STUDY_MODES.map((mode) => {
                        const value = mode.toLowerCase().replace(/\s+/g, '-');
                        return (
                          <label
                            key={mode}
                            className={`flex items-center gap-space-xs p-space-sm rounded-lg cursor-pointer border transition-colors ${
                              formData.study_mode === value
                                ? 'bg-primary-fixed border-primary'
                                : 'bg-surface border-transparent hover:bg-surface-container-low'
                            }`}
                          >
                            <input
                              type="radio"
                              name="study_mode"
                              value={value}
                              checked={formData.study_mode === value}
                              onChange={handleChange}
                              className="text-primary focus:ring-0"
                            />
                            <span className="font-body-sm text-body-sm text-on-surface">
                              {mode}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex flex-col space-y-1">
                    <label
                      className="font-label-md text-label-md font-semibold text-on-surface"
                      htmlFor="messageText"
                    >
                      Candidate Profile Details & Questions
                    </label>
                    <textarea
                      className="w-full px-space-md py-space-sm bg-surface rounded-lg text-body-md text-on-surface focus:outline-none focus:bg-surface-container-lowest shadow-sm placeholder:text-outline"
                      id="messageText"
                      placeholder="State your highest academic qualification, clinical experience (if healthcare), current German proficiency, and questions regarding visas, tuition, or campus visits..."
                      rows="4"
                      value={formData.message}
                      onChange={handleChange}
                      name="message"
                    ></textarea>
                  </div>

                  {status === 'error' && (
                    <div className="flex items-center gap-3 p-space-md rounded-xl bg-error-container text-on-error-container font-body-sm text-body-sm">
                      <AlertCircle className="h-5 w-5 shrink-0" />
                      {errorMessage}
                    </div>
                  )}

                  <div className="pt-space-xs space-y-space-sm">
                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="w-full inline-flex items-center justify-center gap-space-sm px-space-xl py-space-md bg-primary hover:bg-primary-container text-on-primary rounded-lg font-label-md text-body-md font-semibold tracking-wide transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {status === 'loading' ? (
                        <>
                          <Loader2 className="h-5 w-5 animate-spin" />
                          <span>Submitting...</span>
                        </>
                      ) : (
                        <>
                          <Send className="h-5 w-5 text-secondary-fixed" />
                          <span>
                            Submit Official Inquiry / Book Diagnostic Session
                          </span>
                        </>
                      )}
                    </button>
                    <div className="flex items-center gap-space-xs text-body-sm text-on-surface-variant">
                      <Verified className="h-4 w-4 text-primary" />
                      <span>
                        NDPR & EU GDPR Compliant. Your credentials and passport
                        data are strictly protected.
                      </span>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Emergency & Director Hotline Float Banner */}
      <section className="w-full bg-primary-container text-on-primary py-space-lg px-margin-mobile md:px-margin-tablet lg:px-margin">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-space-md">
          <div className="flex items-center gap-space-md">
            <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center shrink-0 shadow-sm">
              <MessageCircle className="h-6 w-6 text-secondary-container" />
            </div>
            <div className="flex flex-col">
              <span className="font-label-caps text-label-caps text-secondary-container uppercase tracking-widest">
                Urgent Guidance Desk
              </span>
              <span className="font-title-md text-title-md text-on-primary font-semibold">
                Need Immediate Relocation or Language Clarity?
              </span>
              <span className="font-body-sm text-body-sm text-primary-fixed/85">
                Speak directly with our Chief Admissions Officer for fast-track
                intake.
              </span>
            </div>
          </div>
          <div className="flex items-center gap-space-sm shrink-0">
            <a
              href="https://wa.me/4915901149844?text=Hello%20AOCA%20Admissions%20Director,%20I%20need%20urgent%20guidance%20on%20German%20migration%20and%20language%20classes."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-space-xs px-space-lg py-space-sm rounded-lg bg-secondary text-on-secondary font-label-md text-label-md font-semibold hover:bg-secondary-container hover:text-on-secondary-container transition-all shadow-md"
            >
               <MessageCircle className="h-5 w-5" />
               <span>WhatsApp Admissions Director: </span>
               <span className="font-semibold underline hover:text-secondary-fixed transition-colors">+49 159 0114984</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
