import { MessageCircle } from 'lucide-react';

function FloatingWhatsApp() {
  return (
    <aside className="fixed bottom-6 right-6 z-40">
      <a
        href="https://wa.me/2348161910975?text=Hello%20AOCA%20Resources,%20I%20am%20interested%20in%20enrolling%20in%20your%20courses."
        target="_blank"
        rel="noreferrer"
        className="flex items-center gap-2.5 px-4 py-3 bg-emerald-800 text-white rounded-full shadow-2xl hover:bg-emerald-700 transition-all border border-emerald-500/30 group"
      >
        <MessageCircle className="h-5 w-5 text-secondary-fixed group-hover:scale-110 transition-transform" />
        <div className="flex flex-col text-left">
          <span className="font-label-caps text-[9px] uppercase tracking-wider text-secondary-fixed">
            CHAT DIRECT DESK
          </span>
          <a href="tel:+2348161910975" className="font-bold text-xs hover:text-secondary-fixed transition-colors">+234 816 191 0975</a>
        </div>
      </a>
    </aside>
  );
}

export default FloatingWhatsApp;
