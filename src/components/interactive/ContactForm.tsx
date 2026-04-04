// src/components/interactive/ContactForm.tsx
import { useState, useCallback } from 'react';

interface FormData {
  name: string;
  phone: string;
  email: string;
  state: string;
  product: string;
  message: string;
}

const US_STATES = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado',
  'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho',
  'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
  'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
  'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada',
  'New Hampshire', 'New Jersey', 'New Mexico', 'New York',
  'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon',
  'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
  'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington',
  'Washington DC', 'West Virginia', 'Wisconsin', 'Wyoming',
];

const INITIAL_FORM: FormData = {
  name: '',
  phone: '',
  email: '',
  state: '',
  product: '',
  message: '',
};

function validate(data: FormData): Record<string, string> {
  const errs: Record<string, string> = {};

  if (!data.name.trim() || data.name.trim().length < 2) {
    errs.name = 'Please enter your full name (at least 2 characters).';
  }
  if (!data.phone.trim() || !/^[\d\s\-()+.]{7,}$/.test(data.phone.trim())) {
    errs.phone = 'Please enter a valid phone number.';
  }
  if (!data.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
    errs.email = 'Please enter a valid email address.';
  }
  if (!data.state) {
    errs.state = 'Please select your state.';
  }
  if (!data.product) {
    errs.product = 'Please select a product interest.';
  }

  return errs;
}

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
      // Clear error on change
      if (errors[name]) {
        setErrors((prev) => {
          const next = { ...prev };
          delete next[name];
          return next;
        });
      }
    },
    [errors],
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const errs = validate(formData);
      if (Object.keys(errs).length > 0) {
        setErrors(errs);
        return;
      }
      setErrors({});
      setStatus('submitting');
      try {
        await new Promise((resolve) => setTimeout(resolve, 1200));
        setStatus('success');
      } catch {
        setStatus('error');
      }
    },
    [formData],
  );

  const handleReset = useCallback(() => {
    setFormData(INITIAL_FORM);
    setErrors({});
    setStatus('idle');
  }, []);

  const inputBase =
    'w-full px-4 py-3 border rounded-lg text-brown-dark text-[15px] focus:outline-none focus:ring-2 focus:ring-forest/40 focus:border-forest transition-colors';
  const inputNormal = `${inputBase} border-[#D9D0C2] bg-white`;
  const inputError = `${inputBase} border-red-400 bg-red-50`;

  // ── Success state ────────────────────────────────────────────────────────────
  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center text-center py-12 px-6">
        {/* Green checkmark circle */}
        <div className="w-20 h-20 rounded-full bg-forest/10 flex items-center justify-center mb-6">
          <svg width="44" height="44" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="12" cy="12" r="11" stroke="#2D6A4F" strokeWidth="1.5" />
            <path
              d="M7 12.5l3.5 3.5 6.5-7"
              stroke="#2D6A4F"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h3 className="font-display font-bold text-[28px] text-forest mb-3">Thank You!</h3>
        <p className="text-[16px] text-brown-mid leading-[1.7] mb-8 max-w-95">
          A licensed agent will contact you within 1 business day.
        </p>
        <button
          onClick={handleReset}
          className="bg-forest hover:bg-forest-dark text-white font-bold text-[15px] px-8 py-3 rounded-pill transition-colors cursor-pointer"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  // ── Form ─────────────────────────────────────────────────────────────────────
  return (
    <form onSubmit={handleSubmit} noValidate>
      {/* Global error */}
      {status === 'error' && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-[14px] text-red-600">
          Something went wrong. Please try again or call us directly at (888) 550-7159.
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
        {/* Full Name */}
        <div>
          <label htmlFor="name" className="block text-[14px] font-semibold text-brown-dark mb-2">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="Jane Smith"
            autoComplete="name"
            aria-required="true"
            aria-describedby={errors.name ? 'name-error' : undefined}
            className={errors.name ? inputError : inputNormal}
          />
          {errors.name && (
            <p id="name-error" className="text-[13px] text-red-500 mt-1">
              {errors.name}
            </p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-[14px] font-semibold text-brown-dark mb-2">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder="(555) 000-0000"
            autoComplete="tel"
            aria-required="true"
            aria-describedby={errors.phone ? 'phone-error' : undefined}
            className={errors.phone ? inputError : inputNormal}
          />
          {errors.phone && (
            <p id="phone-error" className="text-[13px] text-red-500 mt-1">
              {errors.phone}
            </p>
          )}
        </div>
      </div>

      {/* Email */}
      <div className="mb-5">
        <label htmlFor="email" className="block text-[14px] font-semibold text-brown-dark mb-2">
          Email Address <span className="text-red-500">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="jane@example.com"
          autoComplete="email"
          aria-required="true"
          aria-describedby={errors.email ? 'email-error' : undefined}
          className={errors.email ? inputError : inputNormal}
        />
        {errors.email && (
          <p id="email-error" className="text-[13px] text-red-500 mt-1">
            {errors.email}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
        {/* State */}
        <div>
          <label htmlFor="state" className="block text-[14px] font-semibold text-brown-dark mb-2">
            State <span className="text-red-500">*</span>
          </label>
          <select
            id="state"
            name="state"
            value={formData.state}
            onChange={handleChange}
            aria-required="true"
            aria-describedby={errors.state ? 'state-error' : undefined}
            className={errors.state ? inputError : inputNormal}
          >
            <option value="">Select your state…</option>
            {US_STATES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          {errors.state && (
            <p id="state-error" className="text-[13px] text-red-500 mt-1">
              {errors.state}
            </p>
          )}
        </div>

        {/* Product Interest */}
        <div>
          <label
            htmlFor="product"
            className="block text-[14px] font-semibold text-brown-dark mb-2"
          >
            Product Interest <span className="text-red-500">*</span>
          </label>
          <select
            id="product"
            name="product"
            value={formData.product}
            onChange={handleChange}
            aria-required="true"
            aria-describedby={errors.product ? 'product-error' : undefined}
            className={errors.product ? inputError : inputNormal}
          >
            <option value="">Select a product…</option>
            <option value="Final Expense Insurance">Final Expense Insurance</option>
            <option value="Term Life Insurance">Term Life Insurance</option>
            <option value="Whole Life Insurance">Whole Life Insurance</option>
            <option value="Not Sure Yet">Not Sure Yet</option>
          </select>
          {errors.product && (
            <p id="product-error" className="text-[13px] text-red-500 mt-1">
              {errors.product}
            </p>
          )}
        </div>
      </div>

      {/* Message */}
      <div className="mb-7">
        <label htmlFor="message" className="block text-[14px] font-semibold text-brown-dark mb-2">
          Message <span className="text-brown-light font-normal">(optional)</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={formData.message}
          onChange={handleChange}
          placeholder="Anything you'd like us to know before we call…"
          className={inputNormal}
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={status === 'submitting'}
        className={`w-full bg-forest hover:bg-forest-dark text-white font-bold text-[17px] py-4 rounded-pill transition-colors cursor-pointer ${status === 'submitting' ? 'opacity-70' : ''}`}
      >
        {status === 'submitting' ? 'Sending…' : 'Send Message'}
      </button>

      <p className="text-[12px] text-brown-light text-center mt-4">
        No obligation. A licensed agent will reach out within 1 business day.
      </p>
    </form>
  );
}

export default ContactForm;
