// src/components/interactive/FAQAccordion.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import FAQAccordion from './FAQAccordion';

const faqs = [
  { question: 'Is a medical exam required?', answer: 'No exam needed.' },
  { question: 'How quickly does coverage start?', answer: 'Day one coverage.' },
];

describe('FAQAccordion', () => {
  it('renders all questions', () => {
    render(<FAQAccordion faqs={faqs} />);
    expect(screen.getByText('Is a medical exam required?')).toBeInTheDocument();
    expect(screen.getByText('How quickly does coverage start?')).toBeInTheDocument();
  });

  it('answers are hidden by default', () => {
    render(<FAQAccordion faqs={faqs} />);
    expect(document.getElementById('faq-answer-0')).toHaveAttribute('aria-hidden', 'true');
  });

  it('reveals answer when question is clicked', () => {
    render(<FAQAccordion faqs={faqs} />);
    fireEvent.click(screen.getByRole('button', { name: /is a medical exam/i }));
    expect(document.getElementById('faq-answer-0')).toHaveAttribute('aria-hidden', 'false');
  });

  it('closes open answer when clicked again', () => {
    render(<FAQAccordion faqs={faqs} />);
    const btn = screen.getByRole('button', { name: /is a medical exam/i });
    fireEvent.click(btn);
    fireEvent.click(btn);
    expect(document.getElementById('faq-answer-0')).toHaveAttribute('aria-hidden', 'true');
  });

  it('opening one item closes the previously open item', () => {
    render(<FAQAccordion faqs={faqs} />);
    fireEvent.click(screen.getByRole('button', { name: /is a medical exam/i }));
    fireEvent.click(screen.getByRole('button', { name: /how quickly/i }));
    expect(document.getElementById('faq-answer-0')).toHaveAttribute('aria-hidden', 'true');
    expect(document.getElementById('faq-answer-1')).toHaveAttribute('aria-hidden', 'false');
  });

  it('each question button has correct aria-expanded state', () => {
    render(<FAQAccordion faqs={faqs} />);
    const btn = screen.getByRole('button', { name: /is a medical exam/i });
    expect(btn).toHaveAttribute('aria-expanded', 'false');
    fireEvent.click(btn);
    expect(btn).toHaveAttribute('aria-expanded', 'true');
  });
});
