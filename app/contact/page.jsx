'use client';

import { useState } from 'react';
import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import Link from 'next/link';
import PageHero from '../components/site/PageHero';
import SectionHeading from '../components/site/SectionHeading';
import { Button } from '../components/ui/button';
import { inquiryHighlights, showrooms } from '../data/catalog';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    projectType: '',
    requirement: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitMessage('Thank you! Your inquiry has been sent successfully. Check your email for confirmation.');
        setFormData({
          name: '',
          phone: '',
          email: '',
          projectType: '',
          requirement: ''
        });
      } else {
        setSubmitMessage(data.error || 'Failed to send inquiry. Please try again.');
      }
    } catch {
      setSubmitMessage('Network error. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid =
    formData.name &&
    formData.phone &&
    formData.email &&
    formData.projectType &&
    formData.requirement;

  return (
    <div className="container mx-auto space-y-14 px-4 pb-10 pt-28 sm:px-6 lg:px-8 lg:space-y-20 lg:pt-32">
      <PageHero
        eyebrow="Contact"
        title="Talk to us about premium surface selections for your next interior project"
        description="The contact page uses the same premium visual language while making inquiry paths clear for designers, contractors, and end customers."
        image="/assets/images/aboutRight.png"
        accent="Quotes, samples, and project consultation"
      />

      <section className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
        <div className="space-y-6">
          <SectionHeading
            eyebrow="Inquiry support"
            title="Share your requirement and we will guide the right material direction"
            description="Use this space for finish shortlisting, project consultations, material support, and quotation requests."
          />
          <div className="grid gap-3">
            {inquiryHighlights.map((item) => (
              <div
                key={item}
                className="glass-panel rounded-[24px] px-4 py-4 text-sm leading-7 text-[#4f453d]"
              >
                {item}
              </div>
            ))}
          </div>
          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {showrooms.map((item) => (
              <div
                key={item.title}
                className="rounded-[24px] border border-white/60 bg-[#efe4d5] p-5 shadow-[0_18px_60px_-36px_rgba(28,20,14,0.32)]"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#8e7964]">
                  {item.title}
                </p>
                <p className="mt-3 text-sm leading-7 text-[#3f352d]">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>

        <section className="glass-panel rounded-[34px] p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#8e7964]">
            Send an inquiry
          </p>
          <form onSubmit={handleSubmit}>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Field
                label="Full name"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
              <Field
                label="Phone"
                name="phone"
                placeholder="+91"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
              <Field
                label="Email"
                name="email"
                type="email"
                placeholder="hello@project.com"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              <Field
                label="Project type"
                name="projectType"
                placeholder="Kitchen / wardrobe / wall panel"
                value={formData.projectType}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mt-4">
              <Field
                label="Requirement"
                name="requirement"
                placeholder="Share finishes, quantity, location, or material mood you need"
                textarea
                value={formData.requirement}
                onChange={handleInputChange}
                required
              />
            </div>

            <Button
              type="submit"
              className="mt-6 w-full"
              disabled={!isFormValid || isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Submit inquiry'}
            </Button>

            {submitMessage && (
              <div
                className={`mt-4 rounded-lg p-4 ${
                  submitMessage.includes('Thank you')
                    ? 'border border-green-200 bg-green-50 text-green-800'
                    : 'border border-red-200 bg-red-50 text-red-800'
                }`}
              >
                {submitMessage}
              </div>
            )}
          </form>

          <div className="mt-8 grid gap-4 border-t border-[#e2d7ca] pt-6 text-sm text-[#4f453d] sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex items-start gap-3">
              <Phone className="mt-1 size-4 text-[#8b6a4a]" />
              <span>+91 94279 08150</span>
            </div>
            <div className="flex items-start gap-3">
              <Mail className="mt-1 size-4 text-[#8b6a4a]" />
              <span className="break-all">Redecorindia206@gmail.com</span>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="mt-1 size-4 text-[#8b6a4a]" />
              <span>Ahmedabad, Gujarat</span>
            </div>
            <Link
              href="https://wa.me/919427908150?text=Hello%20Robel%20Surface%20Studio,%20%0A%0AI%E2%80%99m%20interested%20in%20your%20laminate%20/%20acrylic%20sheet%20products.%20%0A%0APlease%20share%20details,%20catalog,%20and%20pricing."
              target="_blank"
              className="flex items-start gap-3"
            >
              <MessageCircle className="mt-1 size-4 text-[#8b6a4a]" />
              <span>WhatsApp</span>
            </Link>
          </div>
        </section>
      </section>
    </div>
  );
}

function Field({
  label,
  name,
  placeholder,
  textarea = false,
  type = 'text',
  value,
  onChange,
  required = false
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.24em] text-[#8e7964]">
        {label}
      </span>
      {textarea ? (
        <textarea
          name={name}
          rows={6}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          className="min-h-[170px] w-full rounded-[24px] border border-[#dfd3c7] bg-white px-4 py-3 text-sm text-[#201a16] outline-none placeholder:text-[#96887a]"
        />
      ) : (
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          className="w-full rounded-[24px] border border-[#dfd3c7] bg-white px-4 py-3 text-sm text-[#201a16] outline-none placeholder:text-[#96887a]"
        />
      )}
    </label>
  );
}
