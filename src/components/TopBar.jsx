/** @format */

import { Phone, MessageCircle, Mail } from 'lucide-react';

function TopBar() {
  return (
    <div className='w-full bg-primary text-white border-b border-primary-container/60 text-xs py-2 px-3 sm:px-8 fixed top-0 left-0 right-0 z-40'>
      <div className='max-w-7xl mx-auto flex flex-row items-center justify-between gap-2 overflow-x-auto no-scrollbar'>
        <div className='flex items-center gap-2 text-white/90'>
          <span className='inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-white/10 text-[10px] sm:text-[11px] font-semibold tracking-wide border border-white/15 whitespace-nowrap'>
            <span className='w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse'></span>
            Head Campus
          </span>
          <span className='text-[11px] sm:text-[12px] truncate'>70 Eligbolo Rd, Rumudumaya, Port Harcourt, Rivers State</span>
        </div>
        <div className='flex items-center gap-3 sm:gap-5 text-[11px] sm:text-[12px]'>
          <a href='tel:+2348161910975' className='flex items-center gap-1.5 hover:text-secondary-fixed transition-colors whitespace-nowrap'>
            <Phone className='h-3.5 w-3.5 text-secondary-fixed' />
            <span className='font-semibold'>+234 816 191 0975</span>
          </a>
          <span className='text-white/30 hidden sm:inline'>|</span>
          <a href='mailto:aocaresourcesltd@gmail.com' className='flex items-center gap-1.5 hover:text-secondary-fixed transition-colors whitespace-nowrap'>
            <Mail className='h-3.5 w-3.5 text-secondary-fixed' />
            <span className='font-semibold hidden sm:inline'>aocaresourcesltd@gmail.com</span>
            <span className='font-semibold sm:hidden'>Email Us</span>
          </a>
          <span className='text-white/30 hidden sm:inline'>|</span>
          <a href='https://wa.me/2348161910975?text=Hello%20AOCA%20Resources,%20I%20would%20like%20to%20inquire%20about%20your%20programs' target='_blank' rel='noopener noreferrer' className='flex items-center gap-1.5 text-emerald-300 hover:text-white transition-colors whitespace-nowrap'>
            <MessageCircle className='h-3.5 w-3.5' />
            <span className='font-semibold hidden sm:inline'>Admissions Desk WhatsApp</span>
            <span className='font-semibold sm:hidden'>WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default TopBar;
