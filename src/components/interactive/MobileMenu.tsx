// src/components/interactive/MobileMenu.tsx
import { useState } from 'react';

interface NavLink {
  label: string;
  href:  string;
}

interface Props {
  links: NavLink[];
  phone: string;
}

export default function MobileMenu({ links, phone }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        aria-label="Open menu"
        onClick={() => setOpen(true)}
        className="md:hidden flex flex-col gap-1.5 p-2"
      >
        <span className="block w-6 h-0.5 bg-brown-dark" />
        <span className="block w-6 h-0.5 bg-brown-dark" />
        <span className="block w-6 h-0.5 bg-brown-dark" />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[200] bg-[#1B4332] flex flex-col"
          role="navigation"
          aria-label="Mobile navigation"
        >
          {/* Header row */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
            {/* Logo — dark tone */}
            <a
              href="/"
              onClick={() => setOpen(false)}
              className="inline-flex flex-col leading-none no-underline select-none"
              aria-label="LifeInsuranceCoverage.co home"
            >
              <span className="inline-flex items-center gap-2 font-display uppercase tracking-[0.24em] font-semibold text-[9px] text-[#E9DCC6]/80">
                <span className="h-[1px] w-[10px] rounded-full bg-[#C9B99A]/45" aria-hidden="true" />
                Life Insurance
                <span className="h-[1px] w-[10px] rounded-full bg-[#C9B99A]/45" aria-hidden="true" />
              </span>
              <span className="inline-flex items-end mt-[2px]">
                <span className="font-display font-black tracking-[-0.022em] text-[20px] text-white">
                  Coverage
                </span>
                <span className="mb-[4px] ml-[5px] h-[5px] w-[5px] rounded-[1px] rotate-45 bg-[#D8C7AA]" aria-hidden="true" />
              </span>
              <span className="relative mt-[3px] h-[4px] w-[124px]" aria-hidden="true">
                <span className="absolute left-0 top-1/2 h-[1.5px] w-full -translate-y-1/2 rounded-full bg-[#C9B99A]/45" />
                <span className="absolute left-1/2 top-1/2 h-[4px] w-[4px] -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-[1px] bg-[#D8C7AA]" />
              </span>
            </a>

            {/* Close button */}
            <button
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="text-white/70 hover:text-white p-2 transition-colors"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
          </div>

          {/* Nav links */}
          <nav className="flex flex-col px-6 py-6 gap-1 flex-1 overflow-y-auto">
            {links.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="font-display font-semibold text-xl text-white/80 hover:text-amber py-3 border-b border-white/10 transition-colors"
              >
                {label}
              </a>
            ))}

            {/* Get a Quote — prominent CTA link */}
            <a
              href="/quote"
              onClick={() => setOpen(false)}
              className="mt-4 flex items-center justify-center gap-2 w-full bg-amber hover:bg-amber-dark text-white font-bold text-[17px] py-4 rounded-2xl transition-colors"
            >
              Get a Quote
            </a>
          </nav>

          {/* Phone CTA at bottom */}
          <div className="px-6 pb-10 pt-2">
            <a
              href={`tel:${phone.replace(/\D/g, '')}`}
              className="flex items-center justify-center gap-3 w-full bg-white/10 hover:bg-white/15 text-white font-bold text-lg py-4 rounded-2xl transition-colors border border-white/20"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/>
              </svg>
              {phone}
            </a>
          </div>
        </div>
      )}
    </>
  );
}
