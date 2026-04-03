// src/components/interactive/FAQAccordion.tsx
import { useState } from 'react';

interface FAQ {
  question: string;
  answer:   string;
}

interface Props {
  faqs: FAQ[];
}

export default function FAQAccordion({ faqs }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <div className="flex flex-col lg:flex-row gap-16">
      {/* Accordion */}
      <div className="lg:w-[65%]">
        <h2 className="font-display font-bold text-[clamp(28px,3.5vw,42px)] text-brown-dark mb-10">
          Common Questions
        </h2>
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
                    className="shrink-0 ml-4 transition-transform duration-200"
                    style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                    aria-hidden="true"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
                {isOpen && (
                  <div
                    id={`faq-answer-${i}`}
                    className="px-6 pb-6 text-[15px] text-brown-mid leading-[1.85]"
                    role="region"
                  >
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA card */}
      <div className="lg:w-[35%]">
        <div
          className="bg-forest p-10 rounded-3xl sticky top-24"
          style={{ boxShadow: '0 16px 48px rgba(93,70,40,0.16)' }}
        >
          <svg width="44" height="44" viewBox="0 0 24 24" fill="#D97706" className="mb-5" aria-hidden="true">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
          </svg>
          <h3 className="font-display font-bold text-[28px] text-white mb-4">
            Still have questions?
          </h3>
          <p className="text-[16px] text-white/80 leading-[1.8] mb-8">
            Our licensed specialists are ready to provide personalized guidance — at no cost to you.
          </p>
          <a
            href="tel:8880000000"
            className="flex items-center justify-center gap-3 w-full bg-amber hover:bg-amber-dark text-white font-bold text-[17px] py-4 rounded-pill transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/>
            </svg>
            Call (888) 000-0000
          </a>
          <p className="text-[13px] text-white/60 text-center mt-5">
            No obligation. 100% Free consultation.
          </p>
        </div>
      </div>
    </div>
  );
}
