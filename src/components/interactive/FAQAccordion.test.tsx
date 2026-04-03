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
    expect(screen.queryByText('No exam needed.')).not.toBeInTheDocument();
  });

  it('reveals answer when question is clicked', () => {
    render(<FAQAccordion faqs={faqs} />);
    fireEvent.click(screen.getByRole('button', { name: /is a medical exam/i }));
    expect(screen.getByText('No exam needed.')).toBeInTheDocument();
  });

  it('closes open answer when clicked again', () => {
    render(<FAQAccordion faqs={faqs} />);
    const btn = screen.getByRole('button', { name: /is a medical exam/i });
    fireEvent.click(btn);
    fireEvent.click(btn);
    expect(screen.queryByText('No exam needed.')).not.toBeInTheDocument();
  });

  it('opening one item closes the previously open item', () => {
    render(<FAQAccordion faqs={faqs} />);
    fireEvent.click(screen.getByRole('button', { name: /is a medical exam/i }));
    fireEvent.click(screen.getByRole('button', { name: /how quickly/i }));
    expect(screen.queryByText('No exam needed.')).not.toBeInTheDocument();
    expect(screen.getByText('Day one coverage.')).toBeInTheDocument();
  });

  it('each question button has correct aria-expanded state', () => {
    render(<FAQAccordion faqs={faqs} />);
    const btn = screen.getByRole('button', { name: /is a medical exam/i });
    expect(btn).toHaveAttribute('aria-expanded', 'false');
    fireEvent.click(btn);
    expect(btn).toHaveAttribute('aria-expanded', 'true');
  });
});
