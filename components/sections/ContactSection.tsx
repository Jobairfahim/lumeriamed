"use client";

import { useState } from "react";
import { Mail, MessageCircle, Clock, Send } from "lucide-react";
import SectionHeader from "@/components/ui/ui/SectionHeader";
import { Input, Textarea } from "@/components/ui/ui/Input";
import Button from "@/components/ui/ui/Button";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    setLoading(true);
    // TODO: connect to backend API
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Contact Info */}
          <div className="flex flex-col gap-8">
            <SectionHeader
              title="Contact Information"
              description="Reach out to us through any of the following channels. We're available 24/7 to answer your questions and support your journey."
            />

            <div className="flex flex-col gap-4">
              {/* Email */}
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-brand-light">
                <div className="w-10 h-10 rounded-xl bg-brand-tealLight flex items-center justify-center flex-shrink-0">
                  <Mail size={18} className="text-brand-teal" />
                </div>
                <div>
                  <div className="font-medium text-brand-navy text-sm">Email</div>
                  <a
                    href="mailto:contact@lumieramed.com"
                    className="text-brand-slate text-sm hover:text-brand-teal transition-colors"
                  >
                    contact@lumieramed.com
                  </a>
                  <p className="text-brand-muted text-xs mt-0.5">
                    We typically respond within 24 hours
                  </p>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-brand-light">
                <div className="w-10 h-10 rounded-xl bg-brand-tealLight flex items-center justify-center flex-shrink-0">
                  <MessageCircle size={18} className="text-brand-teal" />
                </div>
                <div>
                  <div className="font-medium text-brand-navy text-sm">WhatsApp</div>
                  <a
                    href="https://wa.me/86XXXXXXXXXX"
                    className="text-brand-slate text-sm hover:text-brand-teal transition-colors"
                  >
                    +86 XXX XXXX XXXX
                  </a>
                  <p className="text-brand-muted text-xs mt-0.5">
                    Available for quick inquiries
                  </p>
                </div>
              </div>
            </div>

            {/* Office Hours */}
            <div className="p-5 rounded-2xl border border-brand-border bg-white">
              <div className="flex items-center gap-2 mb-4">
                <Clock size={16} className="text-brand-teal" />
                <h4 className="font-semibold text-brand-navy text-sm">Office Hours</h4>
              </div>
              <div className="flex flex-col gap-2 text-sm">
                {[
                  { day: "Monday – Friday", hours: "9:00 AM – 6:00 PM (CST)" },
                  { day: "Saturday",        hours: "10:00 AM – 4:00 PM (CST)" },
                  { day: "Sunday",          hours: "Closed", closed: true },
                ].map((row) => (
                  <div key={row.day} className="flex justify-between">
                    <span className="text-brand-slate">{row.day}</span>
                    <span className={row.closed ? "text-red-500 font-medium" : "text-brand-navy font-medium"}>
                      {row.hours}
                    </span>
                  </div>
                ))}
                <p className="text-brand-muted text-xs mt-2 pt-2 border-t border-brand-border">
                  Emergency support available 24/7 for current students
                </p>
              </div>
            </div>
          </div>

          {/* Enquiry Form */}
          <div className="bg-brand-light rounded-3xl p-6 md:p-8">
            <h3 className="font-display font-semibold text-brand-navy text-xl mb-6">
              Request Information
            </h3>

            {submitted ? (
              <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
                <div className="w-14 h-14 rounded-full bg-brand-tealLight flex items-center justify-center">
                  <Send size={24} className="text-brand-teal" />
                </div>
                <h4 className="font-semibold text-brand-navy text-lg">Message Sent!</h4>
                <p className="text-brand-slate text-sm max-w-xs">
                  Thank you for reaching out. Our team will get back to you within
                  24 hours.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setFormData({ firstName: "", lastName: "", email: "", phone: "", message: "" }); }}
                  className="text-brand-teal text-sm font-medium hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="First Name"
                    name="firstName"
                    placeholder="Enter your first name"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                  <Input
                    label="Last Name"
                    name="lastName"
                    placeholder="Enter your last name"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <Input
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <Input
                  label="Phone"
                  name="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={handleChange}
                />
                <Textarea
                  label="Message"
                  name="message"
                  placeholder="Describe your message..."
                  value={formData.message}
                  onChange={handleChange}
                />
                <Button
                  onClick={handleSubmit}
                  className="w-full mt-1"
                  size="lg"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    <>
                      Send Message <Send size={16} />
                    </>
                  )}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
