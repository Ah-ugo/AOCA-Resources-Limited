import Header from '../components/Header';
import Footer from '../components/Footer';
import TopBar from '../components/TopBar';
import FloatingWhatsApp from '../components/FloatingWhatsApp';
import { motion } from 'framer-motion';

function PageLayout({ children, title, subtitle }) {
  return (
    <div className="min-h-screen bg-surface">
      <TopBar />
      <Header />
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="max-w-full mx-auto"
      >
        {(title || subtitle) && (
          <div className="mb-10">
            {title && (
              <h1 className="font-headline-lg text-primary mb-2">{title}</h1>
            )}
            {subtitle && (
              <p className="font-body-md text-on-surface-variant">{subtitle}</p>
            )}
          </div>
        )}
        {children}
      </motion.main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

export default PageLayout;
