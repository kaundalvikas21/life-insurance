// src/components/interactive/FAQPage.tsx
import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';

type FAQ = {
  id: string;
  question: string;
  answer: string;
  category: string;
};

interface Props {
  faqs: FAQ[];
}

const CATEGORIES = ['All', 'Coverage', 'Costs', 'Application', 'Claims'];

export default function FAQPage({ faqs }: Props) {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const answerRefs = useRef<(HTMLDivElement | null)[]>([]);

  const filteredFAQs = faqs.filter(
    (f) => activeCategory === 'All' || f.category === activeCategory
  );

  // Close all accordions when category changes
  useEffect(() => {
    answerRefs.current.forEach((el) => {
      if (el) {
        gsap.to(el, { height: 0, duration: 0.3, ease: 'power2.inOut' });
      }
    });
    setOpenIndex(null);
  }, [activeCategory]);

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
          onComplete: () => {
            answerEl.style.height = 'auto';
          },
        });
      }
    }
  };

  return (
    <div>
      {/* Category filter tabs */}
      <div className="flex gap-3 overflow-x-auto pb-2 mb-10 scrollbar-hide">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={
                isActive
                  ? 'bg-forest text-white rounded-pill px-5 py-2 text-[14px] font-semibold whitespace-nowrap shrink-0'
                  : 'bg-white text-brown-dark border border-[#D9D0C2] rounded-pill px-5 py-2 text-[14px] font-semibold whitespace-nowrap shrink-0 hover:border-forest hover:text-forest transition-colors'
              }
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Accordion list */}
      <div>
        {filteredFAQs.map((faq, i) => {
          const isOpen = openIndex === i;
          return (
            <div
              key={faq.id}
              className="bg-white rounded-[20px] overflow-hidden mb-4"
              style={{ boxShadow: '0 8px 32px rgba(93,70,40,0.10)' }}
            >
              <button
                onClick={() => toggle(i)}
                aria-expanded={isOpen}
                aria-controls={`faq-page-answer-${faq.id}`}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className="font-semibold text-[16px] text-brown-dark pr-4">
                  {faq.question}
                </span>
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#2D6A4F"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  className="shrink-0 ml-4 transition-transform duration-200"
                  style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              <div
                ref={(el) => {
                  answerRefs.current[i] = el;
                }}
                id={`faq-page-answer-${faq.id}`}
                className="overflow-hidden"
                style={{ height: 0 }}
                role="region"
                aria-hidden={!isOpen}
              >
                <div className="px-6 pb-6 text-[15px] text-brown-mid leading-[1.85]">
                  {faq.answer}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
