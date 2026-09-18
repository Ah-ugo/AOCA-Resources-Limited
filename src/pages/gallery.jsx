/** @format */
import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  Images,
  Video,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  X,
  ChevronLeft,
  ChevronRight,
  Eye,
  MessageCircle,
} from 'lucide-react';

// ---------------------------------------------------------------------------
// Photo gallery data
// ---------------------------------------------------------------------------
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
    image: '/study-group.jpg',
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
    desc: 'Join our certified German courses designed to help you speak with confidence.',
    image: '/image5.png',
    category: 'handbills',
  },
  {
    tag: 'OFFICIAL FLYER',
    title: 'Learn French With Confidence!',
    desc: 'French Language & Exam Preparatory Classes from A1 to C1.',
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
  {
    tag: 'TECH LAB',
    title: 'Student at Computer Workstation',
    desc: 'Individual workstation with modern processing power and fiber internet.',
    image: '/image2.png',
    category: 'labs',
  },
  {
    tag: 'CLASSROOM',
    title: 'Classroom Attendees Taking Notes',
    desc: 'Focused candidates working through exam-prep materials.',
    image: '/image10.png',
    category: 'language',
  },
];

const galleryFilters = [
  { id: 'all', label: 'All Media' },
  { id: 'labs', label: 'Computer Labs' },
  { id: 'language', label: 'Language Rooms' },
  { id: 'handbills', label: 'Official Flyers' },
];

// ---------------------------------------------------------------------------
// Video gallery data
// ---------------------------------------------------------------------------
const videoData = [
  {
    category: 'language',
    categoryLabel: 'Language Studio',
    title:
      'German B1 Grammar Seminar & ICT Coding Session at Rumudumaya Campus',
    desc: "Instructor explaining reflexive pronouns ('sich vorstellen', 'sich waschen') and syntax drills for Goethe exam readiness.",
    poster: '/image1.png',
    src: 'https://res.cloudinary.com/dejeplzpv/video/upload/v1789516639/WhatsApp_Video_2026-09-13_at_16.13.36_n1kn5n.mp4',
    duration: '04:28',
    time: '01:52 / 04:28',
    progress: '42%',
    views: 2840,
  },
  {
    category: 'tech',
    categoryLabel: 'Tech Hub',
    title: 'Inside Our Port Harcourt Computer & ICT Training Lab',
    desc: 'Comprehensive lab walk-through showcasing Dell workstations, high-speed fiber internet, and student software projects.',
    poster: '/image2.png',
    src: 'https://res.cloudinary.com/dejeplzpv/video/upload/v1789517795/WhatsApp_Video_2026-09-13_at_16.13.39_rf6d4u.mp4',
    duration: '06:15',
    time: '02:40 / 06:15',
    progress: '44%',
    views: 3410,
  },
  {
    category: 'healthcare',
    categoryLabel: 'Healthcare',
    title: 'Anerkennung Nursing Roadmap & Hospital Placement Interview',
    desc: 'A step-by-step breakdown of nursing credentials validation, Defizitbescheid, and direct interviews with German hospitals.',
    poster: '/study-group.jpg',
    src: 'https://res.cloudinary.com/dejeplzpv/video/upload/v1789517795/WhatsApp_Video_2026-09-13_at_16.13.44_tvqsdu.mp4',
    duration: '05:40',
    time: '01:10 / 05:40',
    progress: '20%',
    views: 4920,
  },
  {
    category: 'youth',
    categoryLabel: 'Youth Tech',
    title: 'Kids & Teens Summer Coding Camp Demonstration',
    desc: 'Young Nigerian students presenting foundational coding, algorithm diagrams, and interactive web games.',
    poster: '/image6-kids.png',
    src: 'https://res.cloudinary.com/dejeplzpv/video/upload/v1789517793/WhatsApp_Video_2026-09-13_at_16.13.43_qyedgt.mp4',
    duration: '03:55',
    time: '00:45 / 03:55',
    progress: '18%',
    views: 1730,
  },
];

const videoFilters = [
  { id: 'all', label: 'All Sessions' },
  { id: 'language', label: 'Language Studio' },
  { id: 'tech', label: 'Tech Hub' },
  { id: 'healthcare', label: 'Healthcare' },
  { id: 'youth', label: 'Youth Tech' },
];

// ---------------------------------------------------------------------------
// Lightbox for the photo gallery
// ---------------------------------------------------------------------------
function Lightbox({ items, index, onClose, onNav }) {
  if (index === null) return null;
  const item = items[index];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
      onClick={onClose}
    >
      <button
        className="absolute top-5 right-5 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
        onClick={onClose}
      >
        <X className="h-5 w-5" />
      </button>
      <button
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
        onClick={(e) => {
          e.stopPropagation();
          onNav(-1);
        }}
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
        onClick={(e) => {
          e.stopPropagation();
          onNav(1);
        }}
      >
        <ChevronRight className="h-6 w-6" />
      </button>
      <motion.div
        key={index}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25 }}
        className="max-w-4xl w-full flex flex-col items-center gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={item.image}
          alt={item.title}
          className="w-full max-h-[70vh] object-contain rounded-xl shadow-2xl"
        />
        <div className="text-center px-4">
          <span className="font-label-caps text-[11px] uppercase font-bold text-secondary-fixed">
            {item.tag}
          </span>
          <h3 className="font-title-md text-lg text-white font-bold mt-1">
            {item.title}
          </h3>
          <p className="text-sm text-white/70 mt-1">{item.desc}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Photo gallery section
// ---------------------------------------------------------------------------
function PhotoGallerySection() {
  const [filter, setFilter] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const filteredItems =
    filter === 'all'
      ? galleryItems
      : galleryItems.filter((item) => item.category === filter);

  const openLightbox = (item) => {
    setLightboxIndex(filteredItems.findIndex((i) => i.title === item.title));
  };

  const navLightbox = (dir) => {
    setLightboxIndex((prev) => {
      if (prev === null) return prev;
      const next = (prev + dir + filteredItems.length) % filteredItems.length;
      return next;
    });
  };

  return (
    <section
      className="w-full py-16 bg-surface-container-low border-b border-outline-variant/30"
      id="photos"
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
              Photo Gallery & Program Archive
            </h2>
            <p className="text-on-surface-variant text-sm sm:text-base max-w-2xl">
              Real operational classrooms, computer stations, and official
              admission handbills from our campuses.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2 bg-surface-container p-1 rounded-xl border border-outline-variant/30 text-xs font-semibold">
            {galleryFilters.map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={`px-3 py-1.5 rounded-xl transition-all ${
                  filter === f.id
                    ? 'bg-primary text-on-primary'
                    : 'text-primary hover:bg-surface-container-high'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          <AnimatePresence>
            {filteredItems.map((item) => (
              <motion.button
                key={item.title}
                layout
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.3 }}
                onClick={() => openLightbox(item)}
                className="text-left bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm border border-outline-variant/30 flex flex-col group"
              >
                <div className="relative h-56 overflow-hidden bg-black/5">
                  <img
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    src={item.image}
                  />
                  <span className="absolute top-2.5 left-2.5 bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded font-label-caps uppercase">
                    {item.tag}
                  </span>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <Eye className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
                <div className="p-4 flex flex-col gap-1">
                  <h4 className="font-title-md text-sm font-bold text-primary leading-tight">
                    {item.title}
                  </h4>
                  <p className="text-[12px] text-on-surface-variant">
                    {item.desc}
                  </p>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            items={filteredItems}
            index={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
            onNav={navLightbox}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Video gallery section
// ---------------------------------------------------------------------------
function VideoGallerySection() {
  const [videoFilter, setVideoFilter] = useState('all');
  const [active, setActive] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef(null);

  const filteredVideos =
    videoFilter === 'all'
      ? videoData
      : videoData.filter((v) => v.category === videoFilter);
  const current =
    filteredVideos[Math.min(active, filteredVideos.length - 1)] || videoData[0];

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
  }, [active]);

  const handleFilterChange = (id) => {
    setVideoFilter(id);
    setActive(0);
    setProgress(0);
  };

  const toggleVideoPlayback = () => setIsPlaying((p) => !p);
  const toggleAudio = () => setIsMuted((m) => !m);

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
    const el = document.getElementById('galleryMainVideoPlayer');
    if (!el) return;
    if (!document.fullscreenElement) {
      el.requestFullscreen().catch(() =>
        alert('Fullscreen preview unavailable.'),
      );
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <section
      className="w-full py-16 lg:py-20 bg-primary text-white border-b border-primary-container"
      id="videos"
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
               Video Gallery: Real Tours & Classroom Sessions
             </h2>
             <p className="text-white/80 text-sm sm:text-base leading-relaxed">
               Unscripted classroom dynamics, Goethe exam simulation drills,
               computer lab workstations, and nursing relocation interviews
               recorded directly at our campuses.
             </p>
          </div>
          <div className="flex flex-wrap items-center gap-2 bg-white/10 p-1 rounded-xl border border-white/15 text-xs font-semibold">
            {videoFilters.map((f) => (
              <button
                key={f.id}
                onClick={() => handleFilterChange(f.id)}
                className={`px-3 py-1.5 rounded-xl transition-all ${
                  videoFilter === f.id
                    ? 'bg-secondary text-secondary-fixed'
                    : 'text-white/80 hover:bg-white/10'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </motion.div>

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
              id="galleryMainVideoPlayer"
            >
              <video
                key={current.src}
                ref={videoRef}
                poster={current.poster}
                className="w-full h-full object-cover"
                playsInline
                preload="metadata"
              >
                <source src={current.src} type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent" />
              <button
                className="absolute inset-0 m-auto w-20 h-20 rounded-full bg-secondary text-white flex items-center justify-center shadow-2xl hover:scale-110 hover:bg-secondary/90 transition-all border border-secondary-fixed/40 focus:outline-none"
                onClick={toggleVideoPlayback}
              >
                {isPlaying ? (
                  <Pause className="h-8 w-8 text-secondary-fixed ml-1" />
                ) : (
                  <Play className="h-8 w-8 text-secondary-fixed ml-1" />
                )}
              </button>
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="bg-white/10 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider flex items-center gap-1 shadow border border-white/10">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/70"></span>
                  Recorded Class
                </span>
                <span className="bg-black/70 backdrop-blur-md text-white/90 text-xs px-2.5 py-1 rounded-md border border-white/10 font-mono">
                  {current.duration}
                </span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/95 to-transparent flex flex-col gap-2">
                 <div
                   className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden cursor-pointer"
                   onClick={scrubVideo}
                 >
                   <div
                     className="bg-secondary-fixed h-full transition-all duration-300"
                     id="galleryVideoProgress"
                     style={{ width: `${progress}%` }}
                   />
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
                    <span className="font-mono text-[11px] text-white/75">
                      {current.time}
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
                  {current.categoryLabel}
                </span>
                <h3 className="font-title-md text-lg font-bold text-white">
                  {current.title}
                </h3>
                <p className="text-xs text-white/70">{current.desc}</p>
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
                {filteredVideos.length} Sessions
              </span>
            </div>
            {filteredVideos.map((video, i) => (
              <motion.div
                key={video.title}
                whileHover={{ scale: 1.02 }}
                className={`cursor-pointer p-3 rounded-xl transition-all flex gap-3 group ${
                  active === i
                    ? 'bg-primary-container border-2 border-secondary'
                    : 'bg-primary-container/40 border border-white/10 hover:border-secondary-fixed hover:bg-primary-container'
                }`}
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
                    {video.categoryLabel}
                  </span>
                  <h4 className="text-xs font-bold text-white line-clamp-2">
                    {video.title}
                  </h4>
                  <span className="text-[11px] text-white/60 mt-1 flex items-center gap-1">
                    <Eye className="h-3 w-3" /> {video.views} views
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Gallery page
// ---------------------------------------------------------------------------
export default function Gallery() {
  return (
    <main className="w-full bg-surface overflow-x-hidden">
      {/* Breadcrumb + section jump — padded clear of the floating navbar */}
      <section className="w-full pt-28 lg:pt-32 pb-8 border-b border-outline-variant/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col gap-6">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2">
            <Link
              to="/"
              className="font-label-md text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1.5 text-sm"
            >
              <Home className="h-4 w-4" />
              Home
            </Link>
            <span className="text-on-surface-variant/40 text-sm">/</span>
            <span className="font-label-md text-primary font-semibold text-sm">
              Gallery
            </span>
          </nav>

          <div className="flex flex-col gap-3">
            <span className="font-label-caps text-[11px] uppercase text-secondary font-bold tracking-widest">
              Campus Media Archive
            </span>
            <h1 className="font-display-hero text-4xl sm:text-5xl text-primary tracking-tight font-bold">
              Photo & Video Gallery
            </h1>
            <p className="font-body-lg text-on-surface-variant max-w-2xl">
              Browse verified photos and video footage from our Port Harcourt
              campus — classrooms, computer labs, language seminars, and real
              nursing and tech placement sessions.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="#photos"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-on-primary font-label-md font-semibold text-sm hover:bg-primary-container transition-all shadow-sm"
            >
              <Images className="h-4 w-4" />
              Photo Gallery
            </a>
            <a
              href="#videos"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-surface-container hover:bg-surface-container-high text-primary font-label-md font-semibold text-sm transition-all"
            >
              <Video className="h-4 w-4" />
              Video Gallery
            </a>
          </div>
        </div>
      </section>

      <PhotoGallerySection />
      <VideoGallerySection />

      {/* WhatsApp CTA strip */}
      <section className="w-full py-10 bg-surface-container-high">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="w-full bg-surface-container-lowest rounded-xl p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-full bg-primary text-secondary-fixed flex items-center justify-center shrink-0 shadow-md">
                <MessageCircle className="h-6 w-6" />
              </div>
              <div className="flex flex-col">
                <span className="font-title-md text-title-md text-primary font-bold">
                  Want a Personal Campus Tour?
                </span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  Chat with our Admissions Director to schedule a visit or
                  virtual walk-through.
                </span>
              </div>
            </div>
            <a
              href="https://wa.me/2348161910975"
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
