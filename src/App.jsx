/** @format */
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  Pause,
  CheckCircle2,
  MapPin,
  Phone,
  ArrowUpRight,
  Quote,
  Menu,
  X,
  ChevronDown,
  Globe,
  GraduationCap,
  FileText,
  Laptop,
  BookOpen,
  Code,
  BarChart,
  Shield,
  ShieldCheck,
  Briefcase,
  Award,
  Mail,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Plane,
  BriefcaseBusiness,
  Languages,
  Users,
  Home,
  Video,
  Eye,
  Maximize,
  Images,
  Volume2,
  VolumeX,
  AlertCircle,
} from 'lucide-react';
import { submitAdmissionInquiry } from './services/admission-service';
import { Routes, Route, Link, Navigate } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import TopBar from './components/TopBar';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
// import Login from './pages/Login';
// import Register from './pages/Register';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import FAQ from './pages/FAQ';
// import NotFound from './pages/NotFound';
import Careers from './pages/Careers';
import CareerDetail from './pages/CareerDetail';
import JobApplication from './pages/JobApplication';
import Login from './pages/Login';
import Register from './pages/Register';
import PathwayDetail from './pages/PathwayDetail';
import ServiceDetail from './pages/ServiceDetail';
import NotFound from './pages/NotFound';
import { AuthProvider } from './contexts/AuthContext';
import { authService } from './services/auth-service';
import ScrollToTop from './components/ScrollToTop';
import Layout from './components/PageLayout';
import { ProtectedRoute } from './routes/ProtectedRoute';

// User Dashboard Pages
import StudentDashboard from './pages/dashboard/StudentDashboard';
import CoursePlayer from './pages/dashboard/CoursePlayer';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import UsersList from './pages/admin/users/UsersList';
import BlogPosts from './pages/admin/blog/BlogPosts';
import CoursesList from './pages/admin/courses/CoursesList';
import LessonsList from './pages/admin/lessons/LessonsList';
import JobsList from './pages/admin/careers/JobsList';
import ApplicationsList from './pages/admin/careers/ApplicationsList';
import AdminLayout from './components/admin/AdminLayout';
import CategoriesList from './pages/admin/blog/CategoriesList';
import BlogForm from './pages/admin/blog/BlogForm';
import BlogsList from './pages/admin/blog/BlogsList';
import JobCategoriesList from './pages/admin/careers/CategoriesList';
import JobForm from './pages/admin/careers/JobForm';
import UserForm from './pages/admin/users/UserForm';
import UserDetail from './pages/admin/users/UserDetail';
import CourseForm from './pages/admin/courses/CourseForm';
import CourseDetail from './pages/admin/courses/CourseDetail';
import LessonForm from './pages/admin/lessons/LessonForm';
import LessonDetail from './pages/admin/lessons/LessonDetail';
import ClassesList from './pages/admin/lessons/ClassesList';
import ClassCreate from './pages/admin/lessons/ClassCreate';
import ClassPreview from './pages/admin/lessons/ClassPreview';
import ClassEdit from './pages/admin/lessons/ClassEdit';
import AdminContactSubmissions from './pages/admin/contact-forms/ContactMain';
import ApplicationDetails from './pages/admin/careers/ApplicationDetails';
import AdmissionLandingPage from './pages/admissionad';
import InstructorDashboard from './pages/instructor/Dashboard';
import Messages from './pages/instructor/Messages';
import AssessmentsList from './pages/instructor/AssessmentsList';
import InstructorStudents from './pages/instructor/Students';
import InstructorClasses from './pages/instructor/Classes';
import InstructorResources from './pages/instructor/Resources';
import InstructorSettings from './pages/instructor/Settings';
import InstructorLessons from './pages/instructor/Lessons';
import CertificateVerification from './pages/CertificateVerification';
import InstructorLayout from './components/instructor/InstructorLayout';
import AdmissionInquiries from './pages/admin/AdmissionInquiries';
import EnrollmentManagement from './pages/admin/EnrollmentManagement';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import Gallery from './pages/gallery';

function WelcomeModal({ onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: 'spring', damping: 20 }}
        className="bg-surface-container-lowest rounded-2xl overflow-hidden max-w-lg w-full border border-outline-variant/30 shadow-2xl"
      >
        <div className="relative">
          <img
            alt="AOCA Welcome"
            className="w-full h-56 object-cover"
            src="/image1.png"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <span className="font-label-caps text-[10px] bg-secondary text-secondary-fixed px-2 py-0.5 rounded font-bold uppercase">
              Welcome to AOCA
            </span>
            <h3 className="font-title-md text-lg font-bold text-white mt-1">
              Your Journey to Germany Starts Here
            </h3>
          </div>
        </div>
        <div className="p-6 flex flex-col gap-4">
          <p className="text-sm text-on-surface-variant leading-relaxed">
            Discover our comprehensive programs:{' '}
            <strong className="text-secondary font-semibold">
              French Language Classes A1–C1
            </strong>{' '}
            (Adults & Kids with exam prep),{' '}
            <strong className="text-secondary font-semibold">
              IELTS Exam Preparatory Classes
            </strong>
            ,{' '}
            <strong className="text-secondary font-semibold">
              Data Analysis Training
            </strong>{' '}
            for individuals and corporate staff,{' '}
            <strong className="text-secondary font-semibold">
              Project Management Training
            </strong>
            ,{' '}
            <strong className="text-secondary font-semibold">
              Professional ICT Training
            </strong>{' '}
            (Basic & Advanced),{' '}
            <strong className="text-secondary font-semibold">
              Cyber Security Training
            </strong>
            ,{' '}
            <strong className="text-secondary font-semibold">
              HSE Level 1–3 Courses
            </strong>
            , German Language A1–B2, German Visa Consultancy, Computer
            Programming, and Kids Tech Programs. Join 500+ professionals already
            placed in Germany.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to="/admissionAd"
              className="flex-1 text-center py-3 bg-primary text-on-primary rounded-full font-semibold text-sm hover:bg-primary-container transition-colors"
              onClick={onClose}
            >
              Start Your Application
            </Link>
            <button
              onClick={onClose}
              className="flex-1 py-3 border border-outline-variant/40 text-primary rounded-xl font-semibold text-sm hover:bg-surface-container transition-colors"
            >
              Explore Programs
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function HeroSection() {
  return (
    <section className="relative w-full bg-gradient-to-b from-surface-container-low via-surface to-surface-container-low py-14 lg:py-20 border-b border-outline-variant/30">
      <div className="max-w-7xl mt-28 mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 flex flex-col gap-6"
          >
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 w-fit">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
              <span className="font-label-caps text-[11px] uppercase tracking-wider font-bold">
                Build Your Skills. Learn a New Language. Prepare for Global
                Opportunities.
              </span>
            </div>
            <h1 className="font-display-hero text-3xl sm:text-5xl lg:text-5xl text-primary font-bold tracking-tight leading-tight">
              Language Training, Practical ICT Skills & International Career
              Pathways.
            </h1>
            <p className="font-body-lg text-base sm:text-lg text-on-surface-variant leading-relaxed">
              Welcome to{' '}
              <strong className="text-primary font-semibold">
                AOCA Resources Limited
              </strong>{' '}
              in Port Harcourt. We provide German and French language training,
              practical ICT and software development programmes, HSE
              certification, IELTS preparation, and structured guidance for
              students and professionals pursuing education, employment,
              healthcare, vocational training and relocation opportunities in
              Germany.
            </p>
            <div className="p-4 rounded-xl bg-surface-container-lowest border-l-4 border-secondary shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-secondary uppercase tracking-wider">
                    PORT HARCOURT MAIN TRAINING CAMPUS
                  </p>
                  <p className="text-sm font-semibold text-on-surface">
                    70 Eligbolo Rd, Rumudumaya, Port Harcourt, Rivers State
                  </p>
                </div>
              </div>
              <a
                href="tel:+2348161910975"
                className="px-4 py-2 rounded-full bg-primary text-on-primary text-xs font-bold hover:bg-primary-container shrink-0 self-start sm:self-auto transition-colors"
              >
                Call Admissions Desk
              </a>
            </div>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#video-showcase"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-primary text-on-primary rounded-full font-semibold text-sm hover:bg-primary-container shadow-md transition-all"
              >
                <Play className="h-5 w-5 text-secondary-fixed" />
                <span>Watch Video Tour & Classes</span>
              </a>
              <a
                href="#interactive-gallery"
                className="inline-flex items-center gap-2 px-5 py-3.5 bg-surface-container text-primary rounded-xl font-semibold text-sm hover:bg-surface-container-high border border-outline-variant/40 transition-colors"
              >
                <BookOpen className="h-4 w-4" />
                <span>View Interactive Classrooms</span>
              </a>
              <a
                href="tel:+2348038865466"
                className="inline-flex items-center gap-2 px-4 py-3.5 text-secondary hover:text-primary font-semibold text-sm transition-colors"
              >
                <Phone className="h-4 w-4" />
                <span>+234 803 886 5466</span>
              </a>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-outline-variant/30 text-left">
              <div>
                <div className="font-headline-sm text-2xl font-bold text-primary">
                  A1 – C2
                </div>
                <div className="text-[11px] text-on-surface-variant font-medium">
                  Goethe & French Prep
                </div>
              </div>
              <div>
                <div className="font-headline-sm text-2xl font-bold text-secondary">
                  100%
                </div>
                <div className="text-[11px] text-on-surface-variant font-medium">
                  Tuition-Free Admissions
                </div>
              </div>
              <div>
                <div className="font-headline-sm text-2xl font-bold text-primary">
                  Level 1–3
                </div>
                <div className="text-[11px] text-on-surface-variant font-medium">
                  Certified HSE Training
                </div>
              </div>
              <div>
                <div className="font-headline-sm text-2xl font-bold text-secondary">
                  €3,200+
                </div>
                <div className="text-[11px] text-on-surface-variant font-medium">
                  German Nurse Placements
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="lg:col-span-5 flex flex-col gap-4"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-outline-variant/40 bg-surface-container-lowest group">
              <div className="relative h-[330px] w-full overflow-hidden">
                <img
                  alt="Instructor-Led ICT & Tech Systems Training"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  src="/image2.png"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/30 to-transparent"></div>
                <div className="absolute top-3 left-3 bg-primary/90 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs font-semibold flex items-center gap-2 border border-white/20">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>Active Rumudumaya Lab</span>
                </div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="font-label-caps text-[10px] bg-secondary-fixed text-on-secondary-fixed px-2 py-0.5 rounded font-bold uppercase">
                    LIVE SESSION
                  </span>
                  <h3 className="font-title-md text-lg font-bold text-white leading-snug mt-1">
                    Instructor-Led ICT & Tech Systems Training
                  </h3>
                  <p className="text-xs text-white/80 mt-0.5">
                    Students building programming & software projects at 70
                    Eligbolo Rd.
                  </p>
                </div>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-primary text-white flex items-center justify-between gap-4 shadow-lg border border-secondary/30">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-secondary-container text-secondary flex items-center justify-center shrink-0">
                  <Shield className="h-5 w-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-secondary-fixed uppercase tracking-wider">
                    AUTHENTIC SYLLABUS
                  </span>
                  <span className="text-sm font-bold text-white">
                    "Your Path to Excellence"
                  </span>
                  <span className="text-xs text-white/70">
                    Language • Healthcare • Ausbildung • Tech
                  </span>
                </div>
              </div>
              <a
                href="#flyers-showcase"
                className="px-3 py-1.5 rounded-xl bg-secondary text-secondary-fixed text-xs font-bold hover:bg-secondary/80 shrink-0 uppercase transition-colors"
              >
                Flyers & Handbills
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

const videoData = [
  {
    title:
      'German B1 Grammar Seminar & ICT Coding Session at Rumudumaya Campus',
    desc: "Instructor explaining reflexive pronouns ('sich vorstellen', 'sich waschen') and syntax drills for Goethe exam readiness.",
    poster: '/image1.png',
    src: 'https://res.cloudinary.com/dejeplzpv/video/upload/v1789516639/WhatsApp_Video_2026-09-13_at_16.13.36_n1kn5n.mp4',
    duration: '04:28',
    time: '01:52 / 04:28',
    category: 'language',
  },
  {
    title: 'Inside Our Port Harcourt Computer & ICT Training Lab',
    desc: 'Comprehensive lab walk-through showcasing Dell workstations, high-speed fiber internet, and student software projects.',
    poster: '/image2.png',
    src: 'https://res.cloudinary.com/dejeplzpv/video/upload/v1789517795/WhatsApp_Video_2026-09-13_at_16.13.39_rf6d4u.mp4',
    duration: '06:15',
    time: '02:40 / 06:15',
    category: 'tech',
  },
  {
    title: 'Anerkennung Nursing Roadmap & Hospital Placement Interview',
    desc: 'A step-by-step breakdown of nursing credentials validation, Defizitbescheid, and direct interviews with German hospitals.',
    poster: '/study-group.jpg',
    src: 'https://res.cloudinary.com/dejeplzpv/video/upload/v1789517795/WhatsApp_Video_2026-09-13_at_16.13.44_tvqsdu.mp4',
    duration: '05:40',
    time: '01:10 / 05:40',
    category: 'healthcare',
  },
  {
    title: 'Kids & Teens Summer Coding Camp Demonstration',
    desc: 'Young Nigerian students presenting foundational coding, algorithm diagrams, and interactive web games.',
    poster: '/image6-kids.png',
    src: 'https://res.cloudinary.com/dejeplzpv/video/upload/v1789517793/WhatsApp_Video_2026-09-13_at_16.13.43_qyedgt.mp4',
    duration: '03:55',
    time: '00:45 / 03:55',
    category: 'youth',
  },
];

function VideoShowcaseSection() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [active, setActive] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef(null);

  const filteredVideos =
    activeCategory === 'all'
      ? videoData
      : videoData.filter((v) => v.category === activeCategory);

  const currentVideo = filteredVideos[active] || videoData[0];

  const switchVideo = (index) => {
    setActive(index);
    setIsPlaying(true);
    setProgress(0);
  };

  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying, active]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      if (video.duration && isFinite(video.duration)) {
        setProgress((video.currentTime / video.duration) * 100);
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    return () => video.removeEventListener('timeupdate', handleTimeUpdate);
  }, [active, isPlaying]);

  const toggleVideoPlayback = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleAudio = () => {
    setIsMuted(!isMuted);
  };

  const scrubVideo = (e) => {
    const video = videoRef.current;
    if (!video || !isFinite(video.duration)) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const newTime = pos * video.duration;
    video.currentTime = newTime;
    setProgress(pos * 100);
  };

  const expandVideo = () => {
    const el = document.getElementById('mainVideoPlayer');
    if (!document.fullscreenElement) {
      el.requestFullscreen().catch(() =>
        alert('Fullscreen preview unavailable.'),
      );
    } else {
      document.exitFullscreen();
    }
  };

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    setActive(0);
    setProgress(0);
  };

  return (
    <section
      className="w-full py-16 lg:py-20 bg-primary text-white border-b border-primary-container"
      id="video-showcase"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col gap-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4"
        >
          <div className="flex flex-col gap-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-secondary-fixed text-xs font-bold uppercase tracking-widest">
              <Video className="h-4 w-4" />
              <span>VIDEO GALLERY</span>
            </div>
            <h2 className="font-headline-lg text-2xl sm:text-4xl font-bold text-white">
              Real Tours & Classroom Sessions
            </h2>
            <p className="text-white/80 text-sm sm:text-base leading-relaxed">
              Unscripted classroom dynamics, Goethe exam simulation drills,
              computer lab workstations, and nursing relocation interviews
              recorded directly at our campuses.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs bg-white/10 px-3 py-1.5 rounded-lg text-white/80 border border-white/15 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
              {videoData.length} Sessions Available
            </span>
          </div>
        </motion.div>

        <div className="flex flex-wrap items-center gap-2">
          {['all', 'language', 'tech', 'healthcare', 'youth'].map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                activeCategory === cat
                  ? 'bg-secondary text-secondary-fixed'
                  : 'bg-white/10 text-white/80 hover:bg-white/20'
              }`}
            >
              {cat === 'all' ? 'All Sessions' : cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-8 bg-black/40 rounded-2xl overflow-hidden border border-white/15 shadow-2xl flex flex-col"
          >
            <div
              className="relative w-full aspect-video bg-black group overflow-hidden"
              id="mainVideoPlayer"
            >
              <video
                key={active}
                ref={videoRef}
                poster={currentVideo.poster}
                className="w-full h-full object-cover"
                playsInline
                preload="metadata"
              >
                <source src={currentVideo.src} type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent"></div>
              <button
                className="absolute inset-0 m-auto w-20 h-20 rounded-full bg-secondary text-white flex items-center justify-center shadow-2xl hover:scale-110 hover:bg-secondary/90 transition-all border border-secondary-fixed/40 group/btn focus:outline-none"
                onClick={toggleVideoPlayback}
              >
                <Play
                  className={`h-8 w-8 text-secondary-fixed ml-1 ${isPlaying ? 'hidden' : 'block'}`}
                />
                <Pause
                  className={`h-8 w-8 text-secondary-fixed ml-1 ${isPlaying ? 'block' : 'hidden'}`}
                />
              </button>
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="bg-white/10 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider flex items-center gap-1 shadow border border-white/10">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/70"></span>
                  Recorded Class
                </span>
                <span
                  className="bg-black/70 backdrop-blur-md text-white/90 text-xs px-2.5 py-1 rounded-md border border-white/10 font-mono"
                  id="videoDurationBadge"
                >
                  {currentVideo.duration}
                </span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/95 to-transparent flex flex-col gap-2">
                <div
                  className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden cursor-pointer"
                  onClick={scrubVideo}
                >
                  <div
                    className="bg-secondary-fixed h-full transition-all duration-300"
                    id="videoProgress"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <div className="flex items-center justify-between text-xs text-white/90 pt-1">
                  <div className="flex items-center gap-3">
                    <button
                      className="hover:text-secondary-fixed transition-colors"
                      onClick={toggleVideoPlayback}
                    >
                      {isPlaying ? (
                        <Pause className="h-5 w-5" />
                      ) : (
                        <Play className="h-5 w-5" />
                      )}
                    </button>
                    <button
                      className="hover:text-secondary-fixed transition-colors"
                      onClick={toggleAudio}
                    >
                      {isMuted ? (
                        <VolumeX className="h-5 w-5" />
                      ) : (
                        <Volume2 className="h-5 w-5" />
                      )}
                    </button>
                    <span
                      className="font-mono text-[11px] text-white/75"
                      id="videoTimeCounter"
                    >
                      {currentVideo.time}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] text-secondary-fixed font-semibold uppercase hidden sm:inline">
                      Port Harcourt Rumudumaya Hall
                    </span>
                    <button
                      className="hover:text-secondary-fixed"
                      onClick={expandVideo}
                    >
                      <Maximize className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6 bg-primary-container/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex flex-col gap-1">
                <span className="text-[11px] font-bold text-secondary-fixed uppercase tracking-wider">
                  NOW PLAYING
                </span>
                <h3
                  className="font-title-md text-lg font-bold text-white"
                  id="currentVideoTitle"
                >
                  {currentVideo.title}
                </h3>
                <p className="text-xs text-white/70" id="currentVideoDesc">
                  {currentVideo.desc}
                </p>
              </div>
              <a
                href="tel:+2348161910975"
                className="px-5 py-2.5 rounded-full bg-secondary text-secondary-fixed font-bold text-xs hover:bg-secondary-container hover:text-on-secondary-fixed shrink-0 transition-colors self-start sm:self-auto uppercase"
              >
                Join Next Class
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-4 flex flex-col gap-3"
          >
            <div className="flex items-center justify-between pb-1 border-b border-white/10">
              <span className="text-xs font-bold text-secondary-fixed uppercase tracking-wider">
                SELECT SESSION
              </span>
              <span className="text-[11px] text-white/60">
                {filteredVideos.length} Session
                {filteredVideos.length !== 1 ? 's' : ''} Available
              </span>
            </div>
            {filteredVideos.map((video, i) => {
              const originalIndex = videoData.indexOf(video);
              return (
                <motion.div
                  key={originalIndex}
                  whileHover={{ scale: 1.02 }}
                  className={`cursor-pointer p-3 rounded-xl transition-all flex gap-3 group ${active === i ? 'bg-primary-container border-2 border-secondary' : 'bg-primary-container/40 border border-white/10 hover:border-secondary-fixed hover:bg-primary-container'}`}
                  onClick={() => switchVideo(i)}
                >
                  <div className="relative w-28 h-20 rounded-xl overflow-hidden shrink-0 bg-black">
                    <img
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      src={video.poster}
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <Play className="h-6 w-6 text-white group-hover:text-secondary-fixed" />
                    </div>
                    <span className="absolute bottom-1 right-1 bg-black/80 text-[10px] text-white px-1 rounded font-mono">
                      {video.duration}
                    </span>
                  </div>
                  <div className="flex flex-col justify-center">
                    <span className="text-[10px] font-bold text-secondary-fixed uppercase">
                      {video.category}
                    </span>
                    <h4 className="text-xs font-bold text-white line-clamp-2">
                      {video.title}
                    </h4>
                    <span className="text-[11px] text-white/60 mt-1 flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      {[2840, 3410, 4920, 1730][originalIndex]} views
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

const voices = [
  {
    name: 'Chioma Ezeh, RN',
    role: 'Charité Hospital, Berlin',
    quote:
      '"I started German A1 at Rumudumaya without a single word of Deutsch. Passing B2 Pflege under AOCA\'s faculty got me directly sponsored into Charité Berlin with relocation accommodation."',
    image: 'https://placehold.co/600x400/1a73e8/ffffff?text=Chioma+Ezeh',
    location: 'BERLIN, GERMANY',
    salary: 'Salary: €3,400/month',
    status: 'Hospital Anerkennung Completed',
  },
  {
    name: 'Emmanuel Briggs',
    role: 'IT Systems Specialist, Munich',
    quote:
      '"Combining Python programming at the AOCA computer laboratory with intensive B1 German qualified me for a dual Ausbildung contract in Bavaria without needing a blocked account."',
    image: 'https://placehold.co/600x400/34a853/ffffff?text=Emmanuel+Briggs',
    location: 'MUNICH, GERMANY',
    salary: 'Stipend: €1,250/month',
    status: 'Dual IT Vocational Contract',
  },
  {
    name: 'Blessing & Group Cohort',
    role: 'Goethe University Frankfurt',
    quote:
      '"Our entire study group got our German visas approved on the first attempt after completing APS documentation and embassy mock interviews with AOCA counselors."',
    image: 'https://placehold.co/600x400/ea4335/ffffff?text=Blessing+and+Group',
    location: 'FRANKFURT, GERMANY',
    salary: 'Tuition: €0.00 / Free Public Uni',
    status: 'German National Visa Stamped',
  },
  {
    name: 'Tari Tari-Cole',
    role: 'Port Logistics Safety Officer',
    quote:
      '"The HSE certification paired with Data Analysis courses gave my CV the precise European standard needed for fast-track Chancenkarte points assessment."',
    image: 'https://placehold.co/600x400/fbbc04/ffffff?text=Tari+Tari-Cole',
    location: 'HAMBURG, GERMANY',
    salary: 'Role: Industrial Safety Lead',
    status: 'HSE 1-3 & Chancenkarte',
  },
];

function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slideTestimonial = (direction) => {
    setCurrentIndex((prev) =>
      Math.max(0, Math.min(prev + direction, voices.length - 1)),
    );
  };

  return (
    <section
      className="w-full py-16 lg:py-20 bg-surface border-b border-outline-variant/30"
      id="testimonials-reel"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4"
        >
          <div className="flex flex-col gap-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-secondary font-label-caps text-xs font-bold uppercase tracking-wider">
              <Sparkles className="h-4 w-4" />
              <span>PROVEN SUCCESS VECTORS • NIGERIA TO GERMANY</span>
            </div>
            <h2 className="font-headline-lg text-2xl sm:text-3xl text-primary font-bold">
              Voices of Relocated Nigerians in Germany & Campuses
            </h2>
            <p className="text-on-surface-variant text-sm sm:text-base">
              Watch candid testimonial videos from candidates who began their
              German language and tech training in Port Harcourt and are now
              practicing in German clinical hospitals and tech firms.
            </p>
          </div>
          <div className="flex items-center gap-2 self-start md:self-auto">
            <button
              className="w-10 h-10 rounded-full border border-outline-variant/50 hover:border-primary hover:bg-primary hover:text-white flex items-center justify-center transition-all"
              onClick={() => slideTestimonial(-1)}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              className="w-10 h-10 rounded-full border border-outline-variant/50 hover:border-primary hover:bg-primary hover:text-white flex items-center justify-center transition-all"
              onClick={() => slideTestimonial(1)}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </motion.div>

        <div className="relative overflow-hidden py-2">
          <motion.div
            animate={{
              x: `-${currentIndex * (typeof window !== 'undefined' && window.innerWidth < 640 ? 334 : 404)}px`,
            }}
            transition={{ type: 'spring', damping: 25, stiffness: 120 }}
            className="flex gap-6"
          >
            {voices.map((voice, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -4 }}
                className="w-[310px] sm:w-[380px] shrink-0 bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm hover:shadow-md border border-outline-variant/30 flex flex-col"
              >
                <div className="relative h-56 bg-black group overflow-hidden">
                  <img
                    alt={voice.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    src={voice.image}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent"></div>
                  <span className="absolute top-3 left-3 bg-secondary text-secondary-fixed text-[10px] font-bold px-2 py-0.5 rounded font-label-caps uppercase">
                    {voice.location}
                  </span>
                  <button className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-white/90 text-primary flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                    <Play className="h-5 w-5 text-primary ml-0.5" />
                  </button>
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="text-[11px] font-bold text-secondary-fixed block">
                      {voice.salary}
                    </span>
                    <span className="text-xs font-semibold text-white/90">
                      {voice.status}
                    </span>
                  </div>
                </div>
                <div className="p-5 flex flex-col gap-2 flex-1 justify-between">
                  <p className="text-xs text-on-surface-variant italic leading-relaxed">
                    {voice.quote}
                  </p>
                  <div className="pt-3 border-t border-outline-variant/20 flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-primary">
                        {voice.name}
                      </h4>
                      <p className="text-[11px] text-on-surface-variant">
                        {voice.role}
                      </p>
                    </div>
                    <CheckCircle2 className="h-5 w-5 text-secondary" />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

const galleryItems = [
  {
    tag: 'TECH LAB',
    title: 'Instructor-Led ICT & Tech Systems Training',
    desc: 'Active Dell terminals and projection display at 70 Eligbolo Rd.',
    image: '/image1.png',
    category: 'labs',
  },
  {
    tag: 'YOUTH TECH',
    title: 'Kids & Teens Coding Workstations',
    desc: 'Building early computer fundamentals and logical reasoning.',
    image: '/image6-kids.png',
    category: 'labs',
  },
  {
    tag: 'GERMAN ACADEMY',
    title: 'German Grammar & Vocabulary Seminar',
    desc: 'Whiteboard drills on reflexive verbs for Goethe A1/A2 and B1 exams.',
    image: '/image3.png',
    category: 'language',
  },
  {
    tag: 'EXAM PREP',
    title: 'Adults & Nurses Language Lecture',
    desc: 'Nurses and candidates working through German phonetic materials.',
    image:
      'https://placehold.co/600x400/7b1fa2/ffffff?text=Nurses+Language+Lecture',
    category: 'language',
  },
  {
    tag: 'DATA ANALYSIS',
    title: 'Data Analysis & Python Coding Class',
    desc: 'Professional adult students practicing software development.',
    image: '/image4.png',
    category: 'labs',
  },
  {
    tag: 'OFFICIAL FLYER',
    title: 'German Language Training A1 - C2',
    desc: '"Join Our Certified German courses designed to help you speak with Confidence."',
    image: '/image5.png',
    category: 'handbills',
  },
  {
    tag: 'OFFICIAL FLYER',
    title: 'Learn French With Confidence!',
    desc: '"French Language & Exam Preparatory Classes from A1 to C1."',
    image: '/image7.png',
    category: 'handbills',
  },
  {
    tag: 'OFFICIAL FLYER',
    title: 'Web Development & Programming',
    desc: 'Python Programming & Software Development certification tracks.',
    image: '/image8.png',
    category: 'handbills',
  },
  {
    tag: 'OFFICIAL FLYER',
    title: 'General & Advanced HSE 1 - 3',
    desc: 'Health, Safety & Environment for Oil & Gas, Maritime and Construction.',
    image: '/image9.png',
    category: 'handbills',
  },
];

function GallerySection() {
  const [filter, setFilter] = useState('all');

  const filteredItems =
    filter === 'all'
      ? galleryItems
      : galleryItems.filter((item) => item.category === filter);

  const scrollGallery = (direction) => {
    const container = document.getElementById('galleryCarouselTrack');
    if (container) {
      const scrollAmount = 340 * direction;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section
      className="w-full py-16 lg:py-20 bg-surface-container-low border-b border-outline-variant/30"
      id="interactive-gallery"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4"
        >
          <div className="flex flex-col gap-2">
            <div className="inline-flex items-center gap-2 text-secondary font-label-caps text-xs font-bold uppercase tracking-wider">
              <Images className="h-4 w-4" />
              <span>VERIFIED PORT HARCOURT ARCHIVE</span>
            </div>
            <h2 className="font-headline-lg text-2xl sm:text-3xl text-primary font-bold">
              Interactive Campus Photo & Program Gallery
            </h2>
            <p className="text-on-surface-variant text-sm sm:text-base">
              Toggle categories to inspect real operational classrooms, computer
              stations, and official admission handbills.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2 bg-surface-container p-1 rounded-xl border border-outline-variant/30 text-xs font-semibold">
            <button
              className={`gallery-tab px-3 py-1.5 rounded-xl transition-all ${filter === 'all' ? 'bg-primary text-on-primary' : 'text-primary hover:bg-surface-container-high'}`}
              onClick={() => setFilter('all')}
            >
              All Media
            </button>
            <button
              className={`gallery-tab px-3 py-1.5 rounded-xl transition-all ${filter === 'labs' ? 'bg-primary text-on-primary' : 'text-primary hover:bg-surface-container-high'}`}
              onClick={() => setFilter('labs')}
            >
              Computer Labs
            </button>
            <button
              className={`gallery-tab px-3 py-1.5 rounded-xl transition-all ${filter === 'language' ? 'bg-primary text-on-primary' : 'text-primary hover:bg-surface-container-high'}`}
              onClick={() => setFilter('language')}
            >
              Language Rooms
            </button>
            <button
              className={`gallery-tab px-3 py-1.5 rounded-xl transition-all ${filter === 'handbills' ? 'bg-primary text-on-primary' : 'text-primary hover:bg-surface-container-high'}`}
              onClick={() => setFilter('handbills')}
            >
              Official Flyers
            </button>
          </div>
        </motion.div>

        <div className="relative">
          <motion.div
            layout
            className="flex gap-5 overflow-x-auto no-scrollbar scroll-smooth py-2"
            id="galleryCarouselTrack"
          >
            <AnimatePresence>
              {filteredItems.map((item) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="gallery-item w-[280px] sm:w-[320px] shrink-0 bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm border border-outline-variant/30 flex flex-col"
                  data-category={item.category}
                >
                  <div className="relative h-64 overflow-hidden bg-black/5">
                    <img
                      alt={item.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      src={item.image}
                    />
                    <span className="absolute top-2.5 left-2.5 bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded font-label-caps uppercase">
                      {item.tag}
                    </span>
                  </div>
                  <div className="p-4 flex flex-col gap-1">
                    <h4 className="font-title-md text-sm font-bold text-primary leading-tight">
                      {item.title}
                    </h4>
                    <p className="text-[12px] text-on-surface-variant">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
          <button
            className="absolute -left-3 sm:-left-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-surface-container-lowest shadow-lg border border-outline-variant/40 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all z-10"
            onClick={() => scrollGallery(-1)}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            className="absolute -right-3 sm:-right-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-surface-container-lowest shadow-lg border border-outline-variant/40 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all z-10"
            onClick={() => scrollGallery(1)}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}

const paths = [
  {
    title: 'German & French Language Training',
    items: [
      'German A1 – B2 Goethe exam prep for adults & kids',
      'French A1 – C1 DELF/DALF exam prep for adults & kids',
      'Standard or intensive fast-track pace',
    ],
  },
  {
    title: 'Healthcare & Nursing Placement',
    items: [
      'B2 certification pathway',
      'Direct hospital partnerships in Germany',
      'Recognition & documentation support',
    ],
  },
  {
    title: 'University Admission & Job Seeker Visas',
    items: [
      'C1 exam preparation',
      'Tuition-free public university guidance',
      'Student & job seeker visa coaching',
    ],
  },
  {
    title: 'Professional ICT & Tech Skills Training',
    items: [
      'Data analysis — Excel, SQL, Power BI, Tableau, Python',
      'Cyber Security — ethical hacking, network defense, risk mitigation',
      'Project Management — Agile, Scrum, PMP methodologies',
      'Basic & Advanced ICT certification tracks',
      'Computer Programming — Python, Web Development, Software Engineering',
      'Certificate on completion',
    ],
  },
  {
    title: 'Vocational Training (Ausbildung)',
    items: [
      'B1 certification pathway',
      'Paid training placement in Germany',
      'Employer matching included',
    ],
  },
  {
    title: 'Health, Safety & Environment (HSE)',
    items: [
      'HSE Level 1, 2 & 3',
      'First Aid Courses',
      'Fire Prevention and Protection',
      'Permit To Work (PTW)',
      'Other Related HSE Courses',
    ],
  },
  {
    title: 'IELTS & Exam Preparatory Classes',
    items: [
      'Intensive IELTS exam preparation for all bands',
      'Listening, Reading, Writing & Speaking drills',
      'Expert instructors & mock test sessions',
    ],
  },
  {
    title: 'Kids & Children Tech Programs',
    items: [
      'Scratch coding, Python robotics, elementary tech modules',
      'Bilingual STEM exposure',
      'Ages 6–16, after-school & holiday bootcamps',
    ],
  },
  {
    title: 'Corporate Bodies / Staff Training',
    items: [
      'Data Analysis for teams',
      'Project Management Professional (PMP)',
      'ICT & Cyber Security upskilling',
      'HSE Level 1–3 for workforce safety compliance',
    ],
  },
];

function PathToExcellenceSection() {
  return (
    <section
      className="w-full py-16 bg-surface max-w-7xl mx-auto px-4 sm:px-8"
      id="real-offerings"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10"
      >
        <div className="flex flex-col gap-1.5 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 text-secondary font-label-caps text-xs font-bold uppercase tracking-wider">
            <CheckCircle2 className="h-4 w-4" />
            <span>AOCA RESOURCES OFFICIAL CURRICULAR FRAMEWORK</span>
          </div>
          <h2 className="font-headline-lg text-2xl md:text-3xl text-primary font-bold">
            YOUR PATH TO EXCELLENCE
          </h2>
          <p className="font-body-md text-on-surface-variant">
            Official accredited programs offered directly at our Port Harcourt
            campus and international consular desks, verbatim from our
            registered syllabus:
          </p>
        </div>
        <div className="text-left md:text-right">
          <span className="font-label-caps text-[11px] text-secondary font-bold block">
            DIRECT STUDENT DESK
          </span>
          <span className="font-headline-sm text-lg font-bold text-primary">
            <a
              href="tel:+2348161910975"
              className="hover:text-secondary transition-colors"
            >
              +234 816 191 0975
            </a>
            <span className="text-on-surface-variant/50 mx-1">/</span>
            <a
              href="tel:+2348038865466"
              className="hover:text-secondary transition-colors"
            >
              +234 803 886 5466
            </a>
          </span>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paths.map((path, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="bg-surface-container-lowest p-6 rounded-xl shadow-sm hover:shadow-md transition-all border border-outline-variant/30 flex flex-col justify-between"
          >
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-900 flex items-center justify-center font-bold text-lg">
                  {path.title
                    .split(' ')
                    .map((w) => w[0])
                    .slice(0, 2)
                    .join('')}
                </span>
                <span className="font-label-caps text-[10px] bg-secondary-container text-on-secondary-container px-2.5 py-1 rounded font-bold uppercase">
                  {
                    [
                      'A1–C2 CERTIFIED',
                      'EARN €3,200+/MO',
                      'CHANCENKARTE',
                      'HANDS-ON LABS',
                      'EARN & LEARN',
                      'HSE LEVEL 1–3',
                      'IELTS & EXAM PREP',
                      'KIDS TECH AGES 6–16',
                      'CORPORATE TRAINING',
                    ][i]
                  }
                </span>
              </div>
              <h3 className="font-title-md text-xl text-primary font-bold">
                {path.title}
              </h3>
              <p className="text-sm text-on-surface-variant">
                {
                  [
                    '"Join Our Certified German & French courses designed to help you speak with Confidence." German A1–B2 Goethe exam prep and French A1–C1 DELF/DALF exam prep classes for adults and kids with certified instructors.',
                    'Direct German hospital placements for Nigerian registered nurses (RN, RM, BNSC). Comprehensive Anerkennung licensing, hospital employer sponsorship, and Defizitbescheid processing.',
                    'Admission into 100% tuition-free public universities across Germany for Bachelors and Masters. Opportunity Card (Chancenkarte) advisory and ZAB degree evaluation.',
                    'Professional ICT certifications in Port Harcourt: Data Analysis (Excel, SQL, Power BI, Tableau, Python), Cyber Security, Project Management (Agile/Scrum/PMP), Computer Programming, and Web Development. Basic to Advanced tracks.',
                    'Earn while you learn in Germany. Guaranteed monthly stipends (€1,000 – €1,400/mo) in IT, Mechatronics, Logistics, Care, Hospitality, and Business. No blocked account required.',
                    'General and Advanced Health, Safety & Environment (HSE) Level 1, 2 & 3 Certification. Essential for oil, gas, maritime, engineering, construction, and global corporate safety roles.',
                    'Intensive IELTS exam preparatory classes covering Listening, Reading, Writing, and Speaking. Expert instructors, mock test sessions, and band-score strategies for UK, Canada, Australia, and NZ.',
                    'Kids & Children Tech Programs: Scratch coding, Python robotics, and elementary technology modules for ages 6–16. After-school and holiday bootcamps preparing the next generation of Nigerian tech innovators.',
                    'Corporate Bodies / Staff Professional Training: Customized in-house and off-site programs on Data Analysis, Project Management, ICT, Cyber Security, and HSE Level 1–3. Available for teams and entire organisations.',
                  ][i]
                }
              </p>
              <ul className="text-xs space-y-2 text-on-surface font-medium pt-2 border-t border-outline-variant/20">
                {path.items.map((item, j) => (
                  <li
                    key={j}
                    className="flex items-center gap-2 rounded-lg border border-secondary/20 bg-secondary/5 px-2 py-1.5"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 text-secondary shrink-0" />
                    <span className="font-bold text-primary">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="pt-5 mt-4">
              <a
                href="#language-academy"
                className="w-full block py-2.5 bg-primary text-on-primary text-center rounded-full text-sm font-semibold hover:bg-primary-container transition-colors"
              >
                {
                  [
                    'Explore Language Classes →',
                    'Nurse Eligibility Audit →',
                    'Apply for Admission →',
                    'View ICT & Tech Syllabus →',
                    'Ausbildung Registration →',
                    'Enroll in HSE Today →',
                    'IELTS Prep Inquiry →',
                    'Kids Tech Enrollment →',
                    'Corporate Training Inquiry →',
                  ][i]
                }
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function IctsHseSection() {
  return (
    <section
      className="w-full py-16 bg-primary text-on-primary"
      id="ict-hse-tech"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col gap-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4"
        >
          <div className="flex flex-col gap-2 max-w-2xl">
            <span className="font-label-caps text-secondary-fixed text-xs font-bold uppercase tracking-widest">
              PRACTICAL SKILL ACQUISITION
            </span>
            <h2 className="font-headline-lg text-2xl md:text-3xl font-bold text-white">
              Basic and Advance Professional ICT Programs & HSE.
            </h2>
            <p className="font-body-md text-white/80">
              Conducted within our dedicated computer workstations at our
              Rumudumaya, Port Harcourt center. Designed to bridge the gap to
              global employment.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="tel:+2348161910975"
              className="px-4 py-2 rounded-xl bg-secondary text-secondary-fixed font-semibold text-sm hover:bg-secondary/80 transition-colors"
            >
              Call Direct: +234 816 191 0975
            </a>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: BarChart,
              title: 'Data Analysis Courses',
              desc: 'Master Excel for Data Analysis, SQL Databases, Power BI, Tableau, and foundational Python analytics for reporting and business intelligence. Available for individuals and corporate staff.',
              tag: 'INDIVIDUALS & CORPORATE • PHYSICAL & VIRTUAL',
            },
            {
              icon: Briefcase,
              title: 'Project Management Courses',
              desc: 'Industry-aligned Project Management Professional methodologies, Agile frameworks, Scrum sprint cycles, and resource tracking software. Tailored for corporate bodies and staff professional development.',
              tag: 'CORPORATE BODIES • EXECUTIVE SESSIONS',
            },
            {
              icon: Shield,
              title: 'Cyber Security Courses',
              desc: 'Network security fundamentals, ethical hacking essentials, cyber defense tactics, risk mitigation, and security architecture training. Hands-on lab drills at our Port Harcourt center.',
              tag: 'HANDS-ON LAB DRILLS',
            },
            {
              icon: ShieldCheck,
              title: 'HSE Level 1 - 3 Certification',
              desc: 'General and Advanced Health, Safety & Environment training with authentic certification. Level 1, 2 & 3 for Oil & Gas, Maritime, Construction, and global corporate safety roles.',
              tag: 'INDUSTRY CERTIFIED • LEVEL 1–3',
            },
          ].map((track, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-primary-container p-6 rounded-xl border border-white/10 flex flex-col justify-between hover:border-secondary-fixed/50 transition-colors"
            >
              <div className="flex flex-col gap-2">
                <track.icon className="h-8 w-8 text-secondary-fixed" />
                <h3 className="font-title-md text-lg font-bold text-white">
                  {track.title}
                </h3>
                <p className="text-xs text-white/80">{track.desc}</p>
              </div>
              <div className="pt-4 border-t border-white/10 mt-4">
                <span className="font-label-caps text-[10px] text-secondary-fixed font-bold uppercase">
                  {track.tag}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-surface-container-lowest text-on-surface p-6 sm:p-8 rounded-2xl shadow-xl flex flex-col lg:flex-row items-center gap-8"
        >
          <div className="w-full lg:w-1/2 grid grid-cols-2 gap-3">
            <img
              alt="Student at computer station"
              className="w-full h-44 object-cover rounded-xl shadow-sm"
              src="/image8.png"
            />
            <img
              alt="Classroom attendees taking notes"
              className="w-full h-44 object-cover rounded-xl shadow-sm"
              src="/study-group.jpg"
            />
          </div>
          <div className="w-full lg:w-1/2 flex flex-col gap-3">
            <span className="font-label-caps text-xs font-bold text-secondary uppercase">
              PORT HARCOURT RESIDENTS & RIVERS STATE
            </span>
            <h3 className="font-headline-sm text-2xl text-primary font-bold">
              Register Today at 70 Eligbolo Road, Rumudumaya
            </h3>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Every student is assigned an individual workstation with modern
              processing power, high-speed fiber internet, continuous power
              backup, and experienced instructors.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href="tel:+2348161910975"
                className="px-5 py-2.5 bg-primary text-on-primary rounded-full font-semibold text-sm hover:bg-primary-container transition-colors shadow"
              >
                Call +234 816 191 0975
              </a>
              <a
                href="#eligibility-calculator"
                className="px-5 py-2.5 bg-surface-container text-primary rounded-xl font-semibold text-sm hover:bg-surface-container-high transition-colors"
              >
                Inquire Online
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function LanguageAcademySection() {
  const levels = [
    { level: 'A1', name: 'Beginner Foundation', weeks: '6 - 8 WEEKS' },
    { level: 'A2', name: 'Elementary Fluency', weeks: '8 WEEKS' },
    {
      level: 'B1',
      name: 'Independent Relocation Level',
      weeks: '10 WEEKS',
      highlight: true,
    },
    {
      level: 'B2 - C2',
      name: 'Clinical & University Fluency',
      weeks: '12 WEEKS',
    },
  ];

  return (
    <section
      className="w-full py-16 bg-surface max-w-7xl mx-auto px-4 sm:px-8"
      id="language-academy"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10"
      >
        <div className="flex flex-col gap-2 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 text-secondary font-label-caps text-xs font-bold uppercase tracking-wider">
            <Languages className="h-4 w-4" />
            <span>IMMERSIVE LINGUISTIC RIGOR</span>
          </div>
          <h2 className="font-headline-lg text-2xl md:text-3xl text-primary font-bold">
            German & French Language Academy (CEFR A1 – C2).
            <span className="block text-secondary text-xl md:text-2xl mt-1">
              French Classes A1–C1 for Adults & Kids — Special Emphasis!
            </span>
          </h2>
          <p className="font-body-md text-on-surface-variant">
            Whether your dream is studying tuition-free at a German university,
            working as a certified Registered Nurse in Berlin, or mastering
            French for diplomacy and career advancement.
          </p>
        </div>
        <div className="flex flex-col text-left md:text-right">
          <span className="text-xs font-bold text-primary uppercase">
            Rolling Intakes Every Month
          </span>
          <span className="text-xs text-on-surface-variant">
            Classes for Adults, Nurses & Kids
          </span>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {levels.map((l, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className={`bg-surface-container-lowest p-6 rounded-xl border flex flex-col justify-between shadow-sm ${l.highlight ? 'border-2 border-secondary' : 'border-outline-variant/30'}`}
          >
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="font-headline-sm text-2xl font-bold text-primary">
                  {l.level}
                </span>
                <span
                  className={`text-[10px] font-label-caps px-2 py-0.5 rounded font-bold ${l.highlight ? 'bg-primary text-white' : 'bg-surface-container text-primary'}`}
                >
                  {l.weeks}
                </span>
              </div>
              <h4 className="font-title-md text-base font-bold text-on-surface">
                {l.name}
              </h4>
              <p className="text-xs text-on-surface-variant">
                {
                  [
                    'Alphabet, basic phonetic pronunciation, daily vocabulary, sentence construction. Essential for spousal reunion visas.',
                    'Past and future tenses, workplace communication, complex sentence clauses. Minimum threshold for selected technical vocational trades.',
                    'Mandatory benchmark for Registered Nursing migration, Dual Vocational (Ausbildung) contracts, and German residence permit processing.',
                    'Medical terminology (Fachsprachenprüfung / B2 Pflege), clinical patient interaction, university academic writing, and full diplomatic C1/C2 mastery.',
                  ][i]
                }
              </p>
            </div>
            <span className="text-xs text-secondary font-semibold pt-4 border-t border-outline-variant/20 flex items-center gap-1">
              {l.highlight ? (
                <CheckCircle2 className="h-4 w-4" />
              ) : (
                <CheckCircle2 className="h-4 w-4" />
              )}
              {
                [
                  'Goethe & DELF Prep Included',
                  'Auditory Lab Drills',
                  '100% Goethe Exam Mock Tests',
                  'telc Pflege & TestDaF Coaching',
                ][i]
              }
            </span>
          </motion.div>
        ))}
      </div>

      {/* French Language Special Emphasis */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-10 p-6 rounded-2xl bg-secondary/10 border-2 border-secondary shadow-lg"
      >
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-xl bg-secondary text-secondary-fixed flex items-center justify-center shrink-0">
              <Languages className="h-7 w-7" />
            </div>
            <div>
              <span className="font-label-caps text-[10px] bg-secondary text-secondary-fixed px-2.5 py-1 rounded font-bold uppercase tracking-wider">
                Special Emphasis
              </span>
              <h3 className="font-headline-sm text-xl text-primary font-bold mt-1.5">
                French Language Classes A1 – C1 — Adults & Kids
              </h3>
              <p className="text-sm text-on-surface-variant mt-1 leading-relaxed">
                Expert DELF/DALF-aligned French instruction for all ages. From
                complete beginners (A1) to advanced proficiency (C1), our
                certified French instructors deliver immersive, exam-focused
                classes for adults and children. Prepare for French diplomatic,
                academic, and career excellence.
              </p>
            </div>
          </div>
          <a
            href="#eligibility-calculator"
            className="px-6 py-3 bg-secondary text-secondary-fixed rounded-full font-semibold text-sm hover:bg-secondary-container hover:text-on-secondary-fixed transition-colors shrink-0"
          >
            Enroll in French Course →
          </a>
        </div>
      </motion.div>

      {/* IELTS Exam Prep Special Emphasis */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-6 p-6 rounded-2xl bg-primary/5 border-2 border-primary shadow-md"
      >
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-xl bg-primary text-on-primary flex items-center justify-center shrink-0">
              <Award className="h-7 w-7" />
            </div>
            <div>
              <span className="font-label-caps text-[10px] bg-primary text-on-primary px-2.5 py-1 rounded font-bold uppercase tracking-wider">
                Special Emphasis
              </span>
              <h3 className="font-headline-sm text-xl text-primary font-bold mt-1.5">
                IELTS Exam Preparatory Classes
              </h3>
              <p className="text-sm text-on-surface-variant mt-1 leading-relaxed">
                Comprehensive IELTS preparation covering Listening, Reading,
                Writing, and Speaking. Expert-led sessions with mock tests,
                band-score strategies, and personalised feedback. Ideal for UK,
                Canada, Australia, and New Zealand visa applicants.
              </p>
            </div>
          </div>
          <a
            href="#eligibility-calculator"
            className="px-6 py-3 bg-primary text-on-primary rounded-full font-semibold text-sm hover:bg-primary-container transition-colors shrink-0"
          >
            IELTS Prep Inquiry →
          </a>
        </div>
      </motion.div>
    </section>
  );
}

function EnrollFormSection() {
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    phone: '',
    email: '',
    program: 'german',
    location: 'port-harcourt',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    const payload = {
      first_name: form.first_name.trim(),
      last_name: form.last_name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      program: form.program,
      location: form.location,
      message: form.message.trim(),
    };

    try {
      await submitAdmissionInquiry(payload);

      setStatus('success');
      setSubmitted(true);
      setForm({
        first_name: '',
        last_name: '',
        phone: '',
        email: '',
        program: 'german',
        location: 'port-harcourt',
        message: '',
      });
    } catch (error) {
      const backendMsg =
        error?.detail ||
        error?.message ||
        'Failed to submit. Please try again.';
      setStatus('error');
      setErrorMessage(backendMsg);
    }
  };

  return (
    <section
      className="w-full py-16 bg-surface-container-low"
      id="eligibility-calculator"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-8">
        <div className="bg-surface-container-lowest rounded-2xl shadow-xl overflow-hidden border border-outline-variant/30">
          <div className="bg-primary p-6 sm:p-8 text-on-primary flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="font-label-caps text-secondary-fixed text-xs font-bold uppercase tracking-wider">
                AOCA RESOURCES LTD • OFFICIAL REGISTRATION
              </span>
              <span className="text-xs text-white/70">
                Port Harcourt & Nationwide
              </span>
            </div>
            <h2 className="font-headline-lg text-2xl sm:text-3xl font-bold text-white">
              Enroll in a Program / Request 1-on-1 Consultation
            </h2>
            <p className="text-sm text-white/80">
              Submit your preferred course below to connect immediately with our
              admissions counselors at 70 Eligbolo Rd, Rumudumaya, Port
              Harcourt.
            </p>
          </div>
          <form
            className="p-6 sm:p-8 flex flex-col gap-5"
            onSubmit={handleSubmit}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-primary uppercase">
                  First Name
                </label>
                <input
                  className="w-full bg-surface-container-low px-4 py-3 rounded-xl text-sm text-on-surface border border-outline-variant/40 focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
                  placeholder="e.g. Samuel"
                  required
                  value={form.first_name}
                  onChange={(e) =>
                    setForm({ ...form, first_name: e.target.value })
                  }
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-primary uppercase">
                  Last Name
                </label>
                <input
                  className="w-full bg-surface-container-low px-4 py-3 rounded-xl text-sm text-on-surface border border-outline-variant/40 focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
                  placeholder="e.g. Okafor"
                  required
                  value={form.last_name}
                  onChange={(e) =>
                    setForm({ ...form, last_name: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-primary uppercase">
                Phone Number
              </label>
              <input
                className="w-full bg-surface-container-low px-4 py-3 rounded-xl text-sm text-on-surface border border-outline-variant/40 focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
                placeholder="e.g. 08012345678"
                required
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-primary uppercase">
                  Personal Email Address
                </label>
                <input
                  className="w-full bg-surface-container-low px-4 py-3 rounded-xl text-sm text-on-surface border border-outline-variant/40 focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
                  placeholder="applicant@email.com"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-primary uppercase">
                  Select Preferred Program
                </label>
                <select
                  className="w-full bg-surface-container-low px-4 py-3 rounded-xl text-sm text-on-surface border border-outline-variant/40 focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
                  value={form.program}
                  onChange={(e) =>
                    setForm({ ...form, program: e.target.value })
                  }
                >
                  <option value="german">
                    German Language Training (A1 - C2)
                  </option>
                  <option value="french">
                    French Language Training (A1 - C1) — Adults & Kids
                  </option>
                  <option value="ielts">IELTS Exam Preparatory Classes</option>
                  <option value="nursing">
                    Healthcare & Nursing Relocation to Germany
                  </option>
                  <option value="ausbildung">
                    Vocational Training (Ausbildung) in Germany
                  </option>
                  <option value="chancenkarte">
                    University Admission & Job Seeker / Chancenkarte
                  </option>
                  <option value="ict">
                    Professional ICT & Data Analysis Courses
                  </option>
                  <option value="cybersecurity">Cyber Security Training</option>
                  <option value="project-management">
                    Project Management Professional Training
                  </option>
                  <option value="programming">
                    Python Programming & Web Development
                  </option>
                  <option value="hse">
                    Health, Safety & Environment (HSE Level 1 - 3)
                  </option>
                  <option value="kids-tech">
                    Kids & Teens Certified Tech Course
                  </option>
                  <option value="corporate">
                    Corporate Bodies / Staff Professional Training
                  </option>
                </select>
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-primary uppercase">
                Location / Learning Mode
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  {
                    value: 'port-harcourt',
                    label: 'Physical in Port Harcourt',
                  },
                  { value: 'online', label: 'Live Online Zoom Cohort' },
                  { value: 'weekend', label: 'Weekend Executive Class' },
                ].map((opt) => (
                  <label
                    key={opt.value}
                    className="flex items-center gap-2 p-3 bg-surface-container-low rounded-xl border border-outline-variant/30 cursor-pointer text-xs font-medium"
                  >
                    <input
                      type="radio"
                      name="location"
                      value={opt.value}
                      checked={form.location === opt.value}
                      onChange={(e) =>
                        setForm({ ...form, location: e.target.value })
                      }
                    />
                    <span>{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-primary uppercase">
                Additional Message (Optional)
              </label>
              <textarea
                className="w-full bg-surface-container-low px-4 py-3 rounded-xl text-sm text-on-surface border border-outline-variant/40 focus:outline-none focus:ring-2 focus:ring-primary transition-colors resize-none"
                placeholder="Tell us about your goals or any questions..."
                rows="3"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              />
            </div>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-on-surface-variant flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-secondary" />
                <span>
                  Head Office: 70 Eligbolo Rd, Rumudumaya, Port Harcourt.
                </span>
              </div>
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full sm:w-auto px-8 py-3.5 bg-primary text-on-primary rounded-full font-semibold text-sm hover:bg-primary-container shadow transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'loading'
                  ? 'Submitting...'
                  : 'Submit Application Now'}
              </button>
            </div>
            {status === 'error' && (
              <div className="p-4 bg-red-50 text-red-700 border border-red-200 rounded-xl text-sm flex items-center gap-2">
                <AlertCircle className="h-5 w-5 shrink-0" />
                {errorMessage}
              </div>
            )}
            {submitted && status === 'success' && (
              <div className="p-4 bg-emerald-50 text-emerald-900 border border-emerald-200 rounded-xl text-sm flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-700" />
                <span>
                  Your request has been received! Our admissions team will
                  call/WhatsApp you at +234 816 191 0975 shortly.
                </span>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

function HomePage() {
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);

  useEffect(() => {
    const hasVisited = localStorage.getItem('aoca_visited');
    if (!hasVisited) {
      setShowWelcomeModal(true);
      localStorage.setItem('aoca_visited', 'true');
    }
  }, []);

  return (
    <main className="w-full bg-surface overflow-x-hidden">
      <TopBar />
      <Header onNavigate={() => {}} />
      <HeroSection />
      <VideoShowcaseSection />
      <TestimonialsSection />
      <GallerySection />
      <PathToExcellenceSection />
      <IctsHseSection />
      <LanguageAcademySection />
      <EnrollFormSection />
      <FloatingWhatsApp />

      <Footer />
      <AnimatePresence>
        {showWelcomeModal && (
          <WelcomeModal onClose={() => setShowWelcomeModal(false)} />
        )}
      </AnimatePresence>
    </main>
  );
}

function App() {
  return (
    <>
      <ScrollToTop />
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/faq"
            element={
              <Layout>
                <FAQ />
              </Layout>
            }
          />
          <Route
            path="/about"
            element={
              <Layout>
                <AboutUs />
              </Layout>
            }
          />
          <Route
            path="/pathways/:id"
            element={
              <Layout>
                <PathwayDetail />
              </Layout>
            }
          />
          <Route
            path="/services/:id"
            element={
              <Layout>
                <ServiceDetail />
              </Layout>
            }
          />
          <Route
            path="/contact"
            element={
              <Layout>
                <ContactUs />
              </Layout>
            }
          />
          <Route
            path="/careers"
            element={
              <Layout>
                <Careers />
              </Layout>
            }
          />
          <Route
            path="/admissionAd"
            element={
              <Layout>
                <AdmissionLandingPage />
              </Layout>
            }
          />
          <Route
            path="/careers/:id"
            element={
              <Layout>
                <CareerDetail />
              </Layout>
            }
          />
          <Route
            path="/careers/:id/apply"
            element={
              <Layout>
                <JobApplication />
              </Layout>
            }
          />
          <Route
            path="/blogs"
            element={
              <Layout>
                <Blog />
              </Layout>
            }
          />
          <Route
            path="/gallery"
            element={
              <Layout>
                <Gallery />
              </Layout>
            }
          />
          <Route
            path="/blog/:slug"
            element={
              <Layout>
                <BlogPost />
              </Layout>
            }
          />
          <Route
            path="/verify"
            element={
              <Layout>
                <CertificateVerification />
              </Layout>
            }
          />
          <Route
            path="/verify/:id"
            element={
              <Layout>
                <CertificateVerification />
              </Layout>
            }
          />
          <Route
            path="/dashboard/*"
            element={
              <ProtectedRoute allowedRoles={['student', 'admin', 'instructor']}>
                {/* <Layout hideHeaderFooter={true}> */}
                <Routes>
                  <Route path="/" element={<StudentDashboard />} />
                  <Route path="course/:courseId" element={<CoursePlayer />} />
                </Routes>
                {/* </Layout> */}
              </ProtectedRoute>
            }
          />
          <Route
            path="/instructor"
            element={<Navigate to="/instructor/dashboard" replace />}
          />
          <Route
            path="/messages"
            element={
              <ProtectedRoute allowedRoles={['student', 'admin', 'instructor']}>
                {/* <Layout> */}
                <Messages />
                {/* </Layout> */}
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={<Navigate to="/admin/dashboard" replace />}
          />
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                {/* <Layout hideHeaderFooter={true}> */}
                <AdminLayout>
                  <Routes>
                    <Route path="dashboard" element={<AdminDashboard />} />
                    <Route path="users" element={<UsersList />} />
                    <Route path="users/new" element={<UserForm />} />
                    <Route path="users/:id" element={<UserDetail />} />
                    <Route path="users/:id/edit" element={<UserForm />} />
                    <Route path="careers/jobs" element={<JobsList />} />
                    <Route path="careers/jobs/new" element={<JobForm />} />
                    <Route path="careers/jobs/:id/edit" element={<JobForm />} />
                    <Route
                      path="careers/applications"
                      element={<ApplicationsList />}
                    />
                    <Route
                      path="careers/applications/:id"
                      element={<ApplicationDetails />}
                    />
                    <Route
                      path="careers/categories"
                      element={<JobCategoriesList />}
                    />
                    <Route path="blogs" element={<BlogsList />} />
                    <Route path="blogs/new" element={<BlogForm />} />
                    <Route path="blogs/:id/edit" element={<BlogForm />} />
                    <Route
                      path="blogs/categories"
                      element={<CategoriesList />}
                    />
                    <Route path="courses" element={<CoursesList />} />
                    <Route path="courses/new" element={<CourseForm />} />
                    <Route path="courses/:id" element={<CourseDetail />} />
                    <Route path="courses/:id/edit" element={<CourseForm />} />
                    <Route path="classes" element={<ClassesList />} />
                    <Route path="lessons" element={<ClassesList />} />
                    <Route path="classes/new" element={<ClassCreate />} />
                    <Route path="classes/:id" element={<ClassPreview />} />
                    <Route path="classes/:id/edit" element={<ClassEdit />} />
                    <Route
                      path="courses/:courseId/lessons"
                      element={<LessonsList />}
                    />
                    <Route
                      path="courses/:courseId/lessons/new"
                      element={<LessonForm />}
                    />
                    <Route
                      path="courses/:courseId/lessons/:lessonId"
                      element={<LessonDetail />}
                    />
                    <Route
                      path="courses/:courseId/lessons/:lessonId/edit"
                      element={<LessonForm />}
                    />
                    <Route
                      path="messages"
                      element={<AdminContactSubmissions />}
                    />
                    <Route
                      path="enrollments"
                      element={<EnrollmentManagement />}
                    />
                    <Route path="admissions" element={<AdmissionInquiries />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </AdminLayout>
                {/* </Layout> */}
              </ProtectedRoute>
            }
          />
          <Route
            path="/instructor/*"
            element={
              <ProtectedRoute allowedRoles={['admin', 'instructor']}>
                <InstructorLayout>
                  <Routes>
                    <Route path="dashboard" element={<InstructorDashboard />} />
                    <Route path="assessments" element={<AssessmentsList />} />
                    <Route path="students" element={<InstructorStudents />} />
                    <Route path="classes" element={<InstructorClasses />} />
                    <Route path="lessons" element={<InstructorLessons />} />
                    <Route path="resources" element={<InstructorResources />} />
                    <Route path="settings" element={<InstructorSettings />} />
                    <Route path="messages" element={<Messages />} />
                  </Routes>
                </InstructorLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/not-found"
            element={
              <Layout>
                <NotFound />
              </Layout>
            }
          />
          <Route
            path="*"
            element={
              <Layout>
                <Navigate to="/not-found" replace />
              </Layout>
            }
          />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
