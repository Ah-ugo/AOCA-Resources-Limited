/** @format */

import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Sparkles } from 'lucide-react';

function Footer() {
  return (
    <footer className="w-full bg-primary-container text-on-primary-container pt-12 pb-8 border-t border-outline-variant/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-12 border-b border-outline-variant/10">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center p-1">
              <img
                alt="AOCA Logo"
                className="h-6 w-auto object-contain"
                src="/aocalogo.jpeg"
              />
            </div>
            <span className="font-headline-sm text-headline-sm text-on-primary font-bold">
              AOCA Resources
            </span>
          </div>
          <p className="font-body-sm text-body-sm text-on-primary-container/80 mb-4 leading-relaxed">
            The African Power House — Engineering legitimate, high-conviction
            educational, clinical, and skilled relocation pathways directly
            connecting Nigeria with the Federal Republic of Germany.
          </p>
          <div className="space-y-2 font-body-sm text-body-sm text-on-primary-container/80">
            <p className="flex items-start gap-2">
              <span className="material-symbols-outlined text-[18px] text-secondary-fixed shrink-0 mt-0.5">
                location_on
              </span>
              <span>
                70 Eligbolo Rd, Rumudumaya, Port Harcourt, Rivers State
              </span>
            </p>
            <p className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-secondary-fixed shrink-0">
                call
              </span>
              <a href="tel:+2348161910975" className="hover:text-secondary-fixed transition-colors font-semibold">
                +234 816 191 0975
              </a>
              <span className="text-on-primary-container/50">,</span>
              <a href="tel:+2348038865466" className="hover:text-secondary-fixed transition-colors font-semibold">
                +234 803 886 5466
              </a>
            </p>
            <p className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-secondary-fixed shrink-0">
                mail
              </span>
              <a href="mailto:aocaresourcesltd@gmail.com" className="hover:text-secondary-fixed transition-colors font-semibold text-secondary-fixed underline underline-offset-2">
                aocaresourcesltd@gmail.com
              </a>
            </p>
            <p className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-secondary-fixed shrink-0">
                mail
              </span>
              <span>info@aocaresourcesltd.com</span>
            </p>
          </div>
        </div>
        <div>
          <h3 className="font-title-md text-title-md text-on-primary font-bold mb-4 pb-2 border-b border-secondary/30 inline-block">
            Relocation Pathways
          </h3>
          <ul className="space-y-2.5 font-body-sm text-body-sm">
            <li className="flex items-center gap-2 text-on-primary-container/80 hover:text-on-primary transition-colors">
              <span className="material-symbols-outlined text-[14px] text-secondary-fixed">
                arrow_forward_ios
              </span>
              <Link to="/pathways/nursing">
                Nursing &amp; Healthcare Fast-Track
              </Link>
            </li>
            <li className="flex items-center gap-2 text-on-primary-container/80 hover:text-on-primary transition-colors">
              <span className="material-symbols-outlined text-[14px] text-secondary-fixed">
                arrow_forward_ios
              </span>
              <Link to="/pathways/chancenkarte">
                Chancenkarte (Opportunity Card)
              </Link>
            </li>
            <li className="flex items-center gap-2 text-on-primary-container/80 hover:text-on-primary transition-colors">
              <span className="material-symbols-outlined text-[14px] text-secondary-fixed">
                arrow_forward_ios
              </span>
              <Link to="/pathways/ausbildung">
                Dual Vocational Training (Ausbildung)
              </Link>
            </li>
            <li className="flex items-center gap-2 text-on-primary-container/80 hover:text-on-primary transition-colors">
              <span className="material-symbols-outlined text-[14px] text-secondary-fixed">
                arrow_forward_ios
              </span>
              <Link to="/pathways/university">
                BSc &amp; MSc University Placement
              </Link>
            </li>
            <li className="flex items-center gap-2 text-on-primary-container/80 hover:text-on-primary transition-colors">
              <span className="material-symbols-outlined text-[14px] text-secondary-fixed">
                arrow_forward_ios
              </span>
              <Link to="/pathways/eu-blue-card">EU Blue Card Specialists</Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-title-md text-title-md text-on-primary font-bold mb-4 pb-2 border-b border-secondary/30 inline-block">
            Language &amp; Tech Hub
          </h3>
          <ul className="space-y-2.5 font-body-sm text-body-sm">
            <li className="flex items-center gap-2 text-on-primary-container/80 hover:text-on-primary transition-colors">
              <span className="material-symbols-outlined text-[14px] text-secondary-fixed">
                arrow_forward_ios
              </span>
              <Link to="/services/german-language">
                German A1-B2 Intensive Courses
              </Link>
            </li>
            <li className="flex items-center gap-2 text-on-primary-container/80 hover:text-on-primary transition-colors">
              <span className="material-symbols-outlined text-[14px] text-secondary-fixed">
                arrow_forward_ios
              </span>
              <Link to="/services/goethe-exam">
                Goethe-Zertifikat Exam Drills
              </Link>
            </li>
            <li className="flex items-center gap-2 text-on-primary-container/80 hover:text-on-primary transition-colors">
              <span className="material-symbols-outlined text-[14px] text-secondary-fixed">
                arrow_forward_ios
              </span>
              <Link to="/services/medical-german">
                telc Deutsch Medical Fluency
              </Link>
            </li>
            <li className="flex items-center gap-2 text-on-primary-container/80 hover:text-on-primary transition-colors">
              <span className="material-symbols-outlined text-[14px] text-secondary-fixed">
                arrow_forward_ios
              </span>
              <Link to="/services/tech-placement">
                Software Engineering for German Market
              </Link>
            </li>
            <li className="flex items-center gap-2 text-on-primary-container/80 hover:text-on-primary transition-colors">
              <span className="material-symbols-outlined text-[14px] text-secondary-fixed">
                arrow_forward_ios
              </span>
              <Link to="/services/hse-certification">
                HSE Level 1-3 Certification
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-title-md text-title-md text-on-primary font-bold mb-4 pb-2 border-b border-secondary/30 inline-block">
            Campuses &amp; Consular
          </h3>
          <ul className="space-y-3 font-body-sm text-body-sm text-on-primary-container/80">
            <li className="flex items-start gap-2">
              <span className="material-symbols-outlined text-[18px] text-secondary-fixed shrink-0">
                corporate_fare
              </span>
              <div>
                <span className="font-semibold text-on-primary block">
                  Port Harcourt Flagship
                </span>
                <span>70 Eligbolo Rd, Rumudumaya</span>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="material-symbols-outlined text-[18px] text-secondary-fixed shrink-0">
                domain
              </span>
              <div>
                <span className="font-semibold text-on-primary block">
                  Liaison Desks
                </span>
                <span>Victoria Island, Lagos &amp; Central Area, Abuja</span>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="material-symbols-outlined text-[18px] text-secondary-fixed shrink-0">
                apartment
              </span>
              <div>
                <span className="font-semibold text-on-primary block">
                  Europe Desk
                </span>
                <span>Frankfurt am Main, Hessen, Germany</span>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="material-symbols-outlined text-[18px] text-secondary-fixed shrink-0">
                schedule
              </span>
              <div>
                <span className="font-semibold text-on-primary block">
                  Consultation Hours
                </span>
                <span>Mon - Sat: 8:00 AM - 5:30 PM (WAT)</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-on-primary-container/70">
        <p>
           © 2026 AOCA Resources Limited. All rights reserved.
         </p>
        <div className="flex items-center gap-6">
          <Link
            to="/privacy-policy"
            className="hover:text-on-primary transition-colors"
          >
            Privacy Policy
          </Link>
          <Link
            to="/terms-of-service"
            className="hover:text-on-primary transition-colors"
          >
            Terms of Service
          </Link>
          <Link
            to="/statutory-compliance"
            className="hover:text-on-primary transition-colors"
          >
            Statutory Compliance
          </Link>
          <Link
            to="/contact"
            className="hover:text-on-primary transition-colors"
          >
            Consular Support
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
