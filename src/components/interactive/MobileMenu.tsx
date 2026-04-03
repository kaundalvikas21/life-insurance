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
          className="fixed inset-0 z-[200] bg-forest-dark flex flex-col"
          role="navigation"
          aria-label="Mobile navigation"
        >
          <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
            <span className="font-display font-bold text-xl text-white">
              Life Insurance
            </span>
            <button
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="text-white p-2"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav className="flex flex-col px-6 py-8 gap-2 flex-1">
            {links.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="font-display font-semibold text-2xl text-white/80 hover:text-amber py-3 border-b border-white/10 transition-colors"
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="px-6 pb-10">
            <a
              href={`tel:${phone.replace(/\D/g, '')}`}
              className="flex items-center justify-center gap-3 w-full bg-amber hover:bg-amber-dark text-white font-bold text-lg py-4 rounded-pill transition-colors"
            >
              {phone}
            </a>
          </div>
        </div>
      )}
    </>
  );
}
