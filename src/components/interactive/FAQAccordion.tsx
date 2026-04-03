// src/components/interactive/FAQAccordion.tsx
import { useState, useRef } from 'react';
import { Icon } from '@iconify/react';
import gsap from 'gsap';

interface FAQ {
  question: string;
  answer:   string;
}

interface Props {
  faqs: FAQ[];
}

export default function FAQAccordion({ faqs }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const answerRefs = useRef<(HTMLDivElement | null)[]>([]);

  const toggle = (i: number) => {
    const wasOpen = openIndex === i;

    // Close previously open item if different
    if (openIndex !== null && openIndex !== i) {
      const prevEl = answerRefs.current[openIndex];
      if (prevEl) {
        gsap.to(prevEl, {
          height: 0,
          duration: 0.3,
          ease: 'power2.inOut',
        });
      }
    }

    // Handle current item
    const answerEl = answerRefs.current[i];
    if (answerEl) {
      if (wasOpen) {
        // Close current
        gsap.to(answerEl, {
          height: 0,
          duration: 0.4,
          ease: 'power2.inOut',
          onComplete: () => setOpenIndex(null),
        });
      } else {
        // Open current
        const naturalHeight = answerEl.scrollHeight;
        answerEl.style.height = '0px';
        setOpenIndex(i);
        gsap.to(answerEl, {
          height: naturalHeight,
          duration: 0.4,
          ease: 'power2.inOut',
          onComplete: () => { answerEl.style.height = 'auto'; },
        });
      }
    }
  };

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
                  <Icon
                    icon="heroicons:chevron-down"
                    width="22"
                    height="22"
                    style={{ color: '#2D6A4F', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                    className="shrink-0 ml-4 transition-transform duration-200"
                    aria-hidden="true"
                  />
                </button>
                <div
                  ref={(el) => { answerRefs.current[i] = el; }}
                  id={`faq-answer-${i}`}
                  className="px-6 text-[15px] text-brown-mid leading-[1.85] overflow-hidden"
                  style={{ height: 0 }}
                  role="region"
                  aria-hidden={!isOpen}
                >
                  <div className="pb-6">{faq.answer}</div>
                </div>
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
          <Icon icon="heroicons:chat-bubble-left-ellipsis" width="44" height="44" style={{ color: '#D97706' }} className="mb-5" aria-hidden="true" />
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
            <Icon icon="heroicons:phone" width="20" height="20" aria-hidden="true" />
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
