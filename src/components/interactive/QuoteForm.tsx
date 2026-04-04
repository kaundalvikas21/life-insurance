// src/components/interactive/QuoteForm.tsx
import { useState, useCallback } from 'react';

// ── Types ─────────────────────────────────────────────────────────────────────

interface StepData {
  age: string;
  gender: string;
  state: string;
  coverageType: string;
  coverageAmount: number;
  tobaccoUse: string;
  preExisting: string;
  name: string;
  phone: string;
  email: string;
  contactTime: string;
}

// ── Constants ─────────────────────────────────────────────────────────────────

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

const INITIAL_DATA: StepData = {
  age: '',
  gender: '',
  state: '',
  coverageType: '',
  coverageAmount: 15000,
  tobaccoUse: '',
  preExisting: '',
  name: '',
  phone: '',
  email: '',
  contactTime: '',
};

const STEP_LABELS = ['About You', 'Coverage', 'Health', 'Contact'];

const COVERAGE_OPTIONS = [
  { value: 'Final Expense', label: 'Final Expense', description: 'Covers funeral & burial costs' },
  { value: 'Term Life', label: 'Term Life', description: 'Coverage for a set time period' },
  { value: 'Whole Life', label: 'Whole Life', description: 'Lifetime coverage + cash value' },
];

const INPUT_BASE =
  'w-full px-4 py-3 border rounded-lg text-brown-dark text-[15px] focus:outline-none focus:ring-2 focus:ring-forest/40 focus:border-forest transition-colors';
const INPUT_NORMAL = `${INPUT_BASE} border-[#D9D0C2] bg-white`;
const INPUT_ERROR = `${INPUT_BASE} border-red-400 bg-red-50`;

// ── Validation ────────────────────────────────────────────────────────────────

function validateStep(step: number, data: StepData): Record<string, string> {
  const errs: Record<string, string> = {};
  if (step === 1) {
    const ageNum = parseInt(data.age, 10);
    if (!data.age.trim() || isNaN(ageNum) || ageNum < 18 || ageNum > 99) {
      errs.age = 'Please enter a valid age between 18 and 99.';
    }
    if (!data.gender) errs.gender = 'Please select your gender.';
    if (!data.state) errs.state = 'Please select your state.';
  } else if (step === 2) {
    if (!data.coverageType) errs.coverageType = 'Please select a coverage type.';
  } else if (step === 3) {
    if (!data.tobaccoUse) errs.tobaccoUse = 'Please select an option.';
    if (!data.preExisting) errs.preExisting = 'Please select an option.';
  } else if (step === 4) {
    if (!data.name.trim() || data.name.trim().length < 2) {
      errs.name = 'Please enter your full name (at least 2 characters).';
    }
    if (!data.phone.trim() || !/^[\d\s\-()+.]{7,}$/.test(data.phone.trim())) {
      errs.phone = 'Please enter a valid phone number.';
    }
    if (!data.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
      errs.email = 'Please enter a valid email address.';
    }
  }
  return errs;
}

// ── Shared prop types ─────────────────────────────────────────────────────────

interface StepProps {
  data: StepData;
  errors: Record<string, string>;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onNext: () => void;
  onBack?: () => void;
}

// ── Progress Bar ──────────────────────────────────────────────────────────────

function ProgressBar({ step }: { step: number }) {
  return (
    <div className="bg-cream py-4 px-2 mb-8 rounded-2xl">
      <div className="flex items-center justify-center max-w-[400px] mx-auto">
        {STEP_LABELS.map((label, idx) => {
          const stepNum = idx + 1;
          const isCompleted = stepNum < step;
          const isActive = stepNum === step;
          return (
            <div key={label} className="flex items-center">
              {idx > 0 && (
                <div
                  className={`w-10 md:w-16 h-0.5 ${isCompleted ? 'bg-forest' : 'bg-[#D9D0C2]'}`}
                />
              )}
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-[14px] font-bold transition-colors
                    ${isCompleted || isActive ? 'bg-forest text-white' : 'bg-[#D9D0C2] text-brown-light'}`}
                >
                  {isCompleted ? (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M3 8l3 3 7-7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : (
                    stepNum
                  )}
                </div>
                <span className="text-[11px] text-brown-light mt-1 whitespace-nowrap">{label}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Step 1: About You ─────────────────────────────────────────────────────────

function Step1({ data, errors, onChange, onNext }: StepProps) {
  return (
    <div>
      <h2 className="font-display font-bold text-[24px] text-brown-dark mb-1">About You</h2>
      <p className="text-[15px] text-brown-mid mb-6">Let's start with some basic information.</p>

      {/* Age */}
      <div className="mb-5">
        <label htmlFor="age" className="block text-[14px] font-semibold text-brown-dark mb-2">
          Your Age <span className="text-red-500">*</span>
        </label>
        <input
          id="age"
          name="age"
          type="number"
          min="18"
          max="99"
          value={data.age}
          onChange={onChange}
          placeholder="e.g. 62"
          aria-required="true"
          aria-describedby={errors.age ? 'age-error' : undefined}
          className={errors.age ? INPUT_ERROR : INPUT_NORMAL}
        />
        {errors.age && <p id="age-error" className="text-[13px] text-red-500 mt-1">{errors.age}</p>}
      </div>

      {/* Gender */}
      <div className="mb-5">
        <p className="text-[14px] font-semibold text-brown-dark mb-3">
          Gender <span className="text-red-500">*</span>
        </p>
        <div className="flex gap-5">
          {['Male', 'Female', 'Other'].map((g) => (
            <label key={g} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="gender"
                value={g}
                checked={data.gender === g}
                onChange={onChange}
                className="w-4 h-4"
                style={{ accentColor: '#2D6A4F' }}
              />
              <span className="text-[15px] text-brown-dark">{g}</span>
            </label>
          ))}
        </div>
        {errors.gender && <p className="text-[13px] text-red-500 mt-1">{errors.gender}</p>}
      </div>

      {/* State */}
      <div className="mb-8">
        <label htmlFor="state" className="block text-[14px] font-semibold text-brown-dark mb-2">
          State <span className="text-red-500">*</span>
        </label>
        <select
          id="state"
          name="state"
          value={data.state}
          onChange={onChange}
          aria-required="true"
          aria-describedby={errors.state ? 'state-error' : undefined}
          className={errors.state ? INPUT_ERROR : INPUT_NORMAL}
        >
          <option value="">Select your state…</option>
          {US_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        {errors.state && <p id="state-error" className="text-[13px] text-red-500 mt-1">{errors.state}</p>}
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={onNext}
          className="bg-forest hover:bg-forest-dark text-white font-bold text-[15px] px-8 py-3 rounded-pill transition-colors cursor-pointer"
        >
          Next →
        </button>
      </div>
    </div>
  );
}

// ── Step 2: Coverage Needs ────────────────────────────────────────────────────

function Step2({ data, errors, onChange, onNext, onBack }: StepProps) {
  const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Fake a synthetic event shape that matches the parent onChange signature
    onChange({ ...e, target: { ...e.target, name: 'coverageAmount', value: e.target.value } } as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <div>
      <h2 className="font-display font-bold text-[24px] text-brown-dark mb-1">Coverage Needs</h2>
      <p className="text-[15px] text-brown-mid mb-6">Choose the type of coverage that fits your goals.</p>

      {/* Coverage Type */}
      <div className="mb-6">
        <p className="text-[14px] font-semibold text-brown-dark mb-3">
          Coverage Type <span className="text-red-500">*</span>
        </p>
        <div className="grid grid-cols-1 gap-3">
          {COVERAGE_OPTIONS.map(({ value, label, description }) => (
            <label
              key={value}
              className={`border-2 rounded-[16px] p-4 cursor-pointer transition-all flex items-start gap-3
                ${data.coverageType === value
                  ? 'border-forest bg-forest/5'
                  : 'border-[#D9D0C2] bg-white hover:border-forest/40'}`}
            >
              <input
                type="radio"
                name="coverageType"
                value={value}
                checked={data.coverageType === value}
                onChange={onChange}
                className="w-4 h-4 mt-0.5 flex-shrink-0"
                style={{ accentColor: '#2D6A4F' }}
              />
              <div>
                <p className="font-semibold text-[15px] text-brown-dark">{label}</p>
                <p className="text-[13px] text-brown-mid mt-0.5">{description}</p>
              </div>
            </label>
          ))}
        </div>
        {errors.coverageType && <p className="text-[13px] text-red-500 mt-2">{errors.coverageType}</p>}
      </div>

      {/* Coverage Amount Slider */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <label htmlFor="coverageAmount" className="text-[14px] font-semibold text-brown-dark">
            Coverage Amount
          </label>
          <span className="text-[16px] font-bold text-forest">
            ${data.coverageAmount.toLocaleString()}
          </span>
        </div>
        <input
          id="coverageAmount"
          name="coverageAmount"
          type="range"
          min="5000"
          max="50000"
          step="5000"
          value={data.coverageAmount}
          onChange={handleRangeChange}
          className="w-full h-2 cursor-pointer"
          style={{ accentColor: '#2D6A4F' }}
        />
        <div className="flex justify-between text-[12px] text-brown-light mt-1">
          <span>$5,000</span>
          <span>$50,000</span>
        </div>
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={onBack}
          className="border border-[#D9D0C2] text-brown-mid hover:border-forest hover:text-forest font-semibold text-[15px] px-8 py-3 rounded-pill transition-colors cursor-pointer bg-transparent"
        >
          ← Back
        </button>
        <button
          type="button"
          onClick={onNext}
          className="bg-forest hover:bg-forest-dark text-white font-bold text-[15px] px-8 py-3 rounded-pill transition-colors cursor-pointer"
        >
          Next →
        </button>
      </div>
    </div>
  );
}

// ── Step 3: Health Info ───────────────────────────────────────────────────────

function Step3({ data, errors, onChange, onNext, onBack }: StepProps) {
  return (
    <div>
      <h2 className="font-display font-bold text-[24px] text-brown-dark mb-1">Health Info</h2>
      <p className="text-[15px] text-brown-mid mb-6">A few health questions to find your best rate.</p>

      {/* Tobacco Use */}
      <div className="mb-6">
        <p className="text-[14px] font-semibold text-brown-dark mb-3">
          Tobacco Use <span className="text-red-500">*</span>
        </p>
        <div className="flex gap-6">
          {['Yes', 'No'].map((opt) => (
            <label key={opt} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="tobaccoUse"
                value={opt}
                checked={data.tobaccoUse === opt}
                onChange={onChange}
                className="w-4 h-4"
                style={{ accentColor: '#2D6A4F' }}
              />
              <span className="text-[15px] text-brown-dark">{opt}</span>
            </label>
          ))}
        </div>
        {errors.tobaccoUse && <p className="text-[13px] text-red-500 mt-1">{errors.tobaccoUse}</p>}
      </div>

      {/* Pre-existing Conditions */}
      <div className="mb-8">
        <p className="text-[14px] font-semibold text-brown-dark mb-3">
          Pre-existing Conditions <span className="text-red-500">*</span>
        </p>
        <div className="flex gap-6">
          {['Yes', 'No'].map((opt) => (
            <label key={opt} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="preExisting"
                value={opt}
                checked={data.preExisting === opt}
                onChange={onChange}
                className="w-4 h-4"
                style={{ accentColor: '#2D6A4F' }}
              />
              <span className="text-[15px] text-brown-dark">{opt}</span>
            </label>
          ))}
        </div>
        {data.preExisting === 'Yes' && (
          <p className="text-brown-mid text-[13px] mt-2 bg-amber/10 border border-amber/30 rounded-lg px-3 py-2">
            We work with carriers that specialize in high-risk cases.
          </p>
        )}
        {errors.preExisting && <p className="text-[13px] text-red-500 mt-1">{errors.preExisting}</p>}
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={onBack}
          className="border border-[#D9D0C2] text-brown-mid hover:border-forest hover:text-forest font-semibold text-[15px] px-8 py-3 rounded-pill transition-colors cursor-pointer bg-transparent"
        >
          ← Back
        </button>
        <button
          type="button"
          onClick={onNext}
          className="bg-forest hover:bg-forest-dark text-white font-bold text-[15px] px-8 py-3 rounded-pill transition-colors cursor-pointer"
        >
          Next →
        </button>
      </div>
    </div>
  );
}

// ── Step 4: Contact Info ──────────────────────────────────────────────────────

interface Step4Props extends StepProps {
  submitStatus: 'idle' | 'submitting' | 'success';
}

function Step4({ data, errors, onChange, onBack, submitStatus }: Step4Props) {
  return (
    <div>
      <h2 className="font-display font-bold text-[24px] text-brown-dark mb-1">Contact Info</h2>
      <p className="text-[15px] text-brown-mid mb-6">Almost done! We'll use this to send your personalized quote.</p>

      {/* Full Name */}
      <div className="mb-5">
        <label htmlFor="name" className="block text-[14px] font-semibold text-brown-dark mb-2">
          Full Name <span className="text-red-500">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={data.name}
          onChange={onChange}
          placeholder="Jane Smith"
          autoComplete="name"
          aria-required="true"
          aria-describedby={errors.name ? 'name-error' : undefined}
          className={errors.name ? INPUT_ERROR : INPUT_NORMAL}
        />
        {errors.name && <p id="name-error" className="text-[13px] text-red-500 mt-1">{errors.name}</p>}
      </div>

      {/* Phone */}
      <div className="mb-5">
        <label htmlFor="phone" className="block text-[14px] font-semibold text-brown-dark mb-2">
          Phone Number <span className="text-red-500">*</span>
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          value={data.phone}
          onChange={onChange}
          placeholder="(555) 000-0000"
          autoComplete="tel"
          aria-required="true"
          aria-describedby={errors.phone ? 'phone-error' : undefined}
          className={errors.phone ? INPUT_ERROR : INPUT_NORMAL}
        />
        {errors.phone && <p id="phone-error" className="text-[13px] text-red-500 mt-1">{errors.phone}</p>}
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
          value={data.email}
          onChange={onChange}
          placeholder="jane@example.com"
          autoComplete="email"
          aria-required="true"
          aria-describedby={errors.email ? 'email-error' : undefined}
          className={errors.email ? INPUT_ERROR : INPUT_NORMAL}
        />
        {errors.email && <p id="email-error" className="text-[13px] text-red-500 mt-1">{errors.email}</p>}
      </div>

      {/* Preferred Contact Time */}
      <div className="mb-8">
        <label htmlFor="contactTime" className="block text-[14px] font-semibold text-brown-dark mb-2">
          Preferred Contact Time
        </label>
        <select
          id="contactTime"
          name="contactTime"
          value={data.contactTime}
          onChange={onChange}
          className={INPUT_NORMAL}
        >
          <option value="">Any Time</option>
          <option value="Morning (9AM-12PM)">Morning (9AM–12PM)</option>
          <option value="Afternoon (12PM-3PM)">Afternoon (12PM–3PM)</option>
          <option value="Evening (3PM-6PM)">Evening (3PM–6PM)</option>
          <option value="Any Time">Any Time</option>
        </select>
      </div>

      <div className="flex justify-between items-center">
        <button
          type="button"
          onClick={onBack}
          className="border border-[#D9D0C2] text-brown-mid hover:border-forest hover:text-forest font-semibold text-[15px] px-8 py-3 rounded-pill transition-colors cursor-pointer bg-transparent"
        >
          ← Back
        </button>
        <button
          type="submit"
          disabled={submitStatus === 'submitting'}
          className={`bg-amber hover:bg-amber-dark text-white font-bold text-[15px] px-8 py-4 rounded-pill transition-colors cursor-pointer ${submitStatus === 'submitting' ? 'opacity-70' : ''}`}
        >
          {submitStatus === 'submitting' ? 'Submitting…' : 'Request My Quote'}
        </button>
      </div>

      <p className="text-[12px] text-brown-light text-center mt-4">
        No obligation. Free consultation. Licensed agents.
      </p>
    </div>
  );
}

// ── Success State ─────────────────────────────────────────────────────────────

function QuoteSuccess({ phone }: { phone: string }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-8 px-4">
      <div className="w-24 h-24 rounded-full bg-forest/10 flex items-center justify-center mb-6">
        <svg width="52" height="52" viewBox="0 0 24 24" fill="none" aria-hidden="true">
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
      <h3 className="font-display font-bold text-[28px] text-forest mb-3">
        Your Quote Request Is Submitted!
      </h3>
      <p className="text-[16px] text-brown-mid leading-[1.7] mb-8 max-w-[420px]">
        A licensed agent will call you at{' '}
        <strong className="text-brown-dark">{phone}</strong> within 1 business day.
      </p>
      <div className="bg-cream rounded-[16px] p-6 text-left w-full mb-8">
        <p className="font-semibold text-brown-dark text-[15px] mb-4">Here's what happens next:</p>
        <ul className="space-y-3">
          {[
            'Our agent reviews your coverage needs',
            'We shop 13+ carriers for your best rate',
            'You receive a personalized quote — no pressure',
          ].map((item) => (
            <li key={item} className="flex items-start gap-3 text-[14px] text-brown-mid">
              <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-forest/15 flex items-center justify-center">
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path
                    d="M2.5 6.5l2.5 2.5 5-5"
                    stroke="#2D6A4F"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>
      <a
        href="tel:+18885507159"
        className="inline-flex items-center gap-2 bg-amber hover:bg-amber-dark text-white font-bold text-[16px] px-8 py-4 rounded-pill transition-colors"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.72 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.64 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.09 6.09l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
        Call Now Instead
      </a>
    </div>
  );
}

// ── Main QuoteForm Component ───────────────────────────────────────────────────

export function QuoteForm() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<StepData>(INITIAL_DATA);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setData((prev) => ({
        ...prev,
        [name]: name === 'coverageAmount' ? parseInt(value, 10) : value,
      }));
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

  const handleNext = useCallback(() => {
    const errs = validateStep(step, data);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setStep((s) => s + 1);
  }, [step, data]);

  const handleBack = useCallback(() => {
    setErrors({});
    setStep((s) => s - 1);
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const errs = validateStep(4, data);
      if (Object.keys(errs).length > 0) {
        setErrors(errs);
        return;
      }
      setErrors({});
      setStatus('submitting');
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setStatus('success');
    },
    [data],
  );

  const sharedProps: StepProps = {
    data,
    errors,
    onChange: handleChange,
    onNext: handleNext,
    onBack: handleBack,
  };

  return (
    <div className="bg-white rounded-3xl p-8 md:p-12 shadow-[0_8px_32px_rgba(93,70,40,0.12)] max-w-[600px] mx-auto">
      {status === 'success' ? (
        <QuoteSuccess phone={data.phone} />
      ) : (
        <>
          <ProgressBar step={step} />
          <form onSubmit={handleSubmit} noValidate>
            {step === 1 && <Step1 {...sharedProps} />}
            {step === 2 && <Step2 {...sharedProps} />}
            {step === 3 && <Step3 {...sharedProps} />}
            {step === 4 && <Step4 {...sharedProps} submitStatus={status} />}
          </form>
        </>
      )}
    </div>
  );
}

export default QuoteForm;
