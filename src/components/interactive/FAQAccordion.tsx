// src/components/interactive/FAQAccordion.tsx
import { useState } from 'react';

interface FAQ {
  question: string;
  answer:   string;
}

interface Props {
  faqs: FAQ[];
  showHeading?: boolean;
  showCTA?: boolean;
}

export default function FAQAccordion({ faqs, showHeading = true, showCTA = true }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <div className={`flex flex-col ${showCTA ? 'lg:flex-row gap-16' : ''}`}>
      {/* Accordion */}
      <div className={showCTA ? 'lg:w-[65%]' : 'w-full'}>
        {showHeading && (
          <h2 className="font-display font-bold text-[clamp(28px,3.5vw,42px)] text-brown-dark mb-10">
            Common Questions
          </h2>
        )}
        <div className="space-y-4">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className="bg-white rounded-[20px]"
                style={{ boxShadow: '0 8px 32px rgba(93,70,40,0.12)' }}
              >
                <button
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${i}`}
                  className="flex justify-between items-center w-full p-6 text-left font-semibold text-[16px] text-brown-dark"
                >
                  {faq.question}
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#2D6A4F"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`shrink-0 ml-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
                    aria-hidden="true"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
                <div
                  id={`faq-answer-${i}`}
                  className={`grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                  role="region"
                  aria-hidden={!isOpen}
                >
                  <div className="overflow-hidden min-h-0">
                    <div className="px-6 pb-6 text-[15px] text-brown-mid leading-[1.85]">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA card */}
      {showCTA && (
        <div className="lg:w-[35%]">
          <div
            className="bg-forest p-10 rounded-3xl sticky top-24"
            style={{ boxShadow: '0 16px 48px rgba(93,70,40,0.16)' }}
          >
            <svg
              width="44"
              height="44"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#D97706"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mb-5"
              aria-hidden="true"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            <h3 className="font-display font-bold text-[28px] text-white mb-4">
              Still have questions?
            </h3>
            <p className="text-[16px] text-white/80 leading-[1.8] mb-8">
              Not sure which plan fits? A licensed agent can walk you through your options.
            </p>
            <a
              href="tel:+18885507159"
              className="flex items-center justify-center gap-3 w-full bg-amber hover:bg-amber-dark text-white font-bold text-[17px] py-4 rounded-pill transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.72 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.64 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.09 6.09l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              Call (888) 550-7159
            </a>
            <p className="text-[13px] text-white/60 text-center mt-5">
              No commitment. Free.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
