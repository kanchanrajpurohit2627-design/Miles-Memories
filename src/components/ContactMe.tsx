/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, Instagram, Github, Twitter, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

export default function ContactMe() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('General Inquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    // Simulate submission to server/registry
    setSubmitted(true);
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setSubject('General Inquiry');
    setMessage('');
    setSubmitted(false);
  };

  return (
    <div className="grid lg:grid-cols-12 gap-8" id="contact-me-master-grid">
      
      {/* Editorial Contact Info column */}
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-white p-6 md:p-8 rounded-2xl border border-neutral-100 shadow-sm space-y-6">
          <div>
            <span className="text-xs font-semibold uppercase text-sky-blue px-2.5 py-1 bg-sky-blue/10 rounded-full w-fit">
              Get in Touch
            </span>
            <h2 className="text-2xl md:text-3xl font-serif text-dark-gray font-bold mt-2 leading-tight">
              Connect With Me
            </h2>
            <p className="text-xs md:text-sm text-neutral-500 leading-relaxed mt-2">
              Have questions about a specific trail, need budget planning tips, or want to collaborate on a travel photography project? Drop me a message!
            </p>
          </div>

          <div className="space-y-4 border-t border-neutral-100 pt-6">
            
            {/* Contact row 1 */}
            <div className="flex gap-3">
              <span className="p-2 bg-neutral-50 border border-neutral-150 rounded-xl text-sky-blue shrink-0">
                <Mail className="w-4 h-4" />
              </span>
              <div className="text-xs">
                <span className="block font-bold text-neutral-400 uppercase tracking-widest text-[9px]">Send an Email</span>
                <a href="mailto:kanchanrajpurohit2627@gmail.com" className="text-dark-gray font-semibold hover:text-sky-blue block mt-0.5">
                  kanchanrajpurohit2627@gmail.com
                </a>
              </div>
            </div>

            {/* Contact row 2 */}
            <div className="flex gap-3">
              <span className="p-2 bg-neutral-50 border border-neutral-150 rounded-xl text-sky-blue shrink-0">
                <MapPin className="w-4 h-4" />
              </span>
              <div className="text-xs">
                <span className="block font-bold text-neutral-400 uppercase tracking-widest text-[9px]">Current Location</span>
                <span className="text-dark-gray font-semibold block mt-0.5">
                  Cusco, Peru (Acclimatizing Trails)
                </span>
              </div>
            </div>

            {/* Contact row 3 */}
            <div className="flex gap-3">
              <span className="p-2 bg-neutral-50 border border-neutral-150 rounded-xl text-sky-blue shrink-0">
                <MessageSquare className="w-4 h-4" />
              </span>
              <div className="text-xs">
                <span className="block font-bold text-neutral-400 uppercase tracking-widest text-[9px]">Response SLA</span>
                <span className="text-dark-gray font-semibold block mt-0.5">
                  Usually under 36 hours (subject to trail coverage)
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* Social media connections */}
        <div className="bg-dark-gray text-white p-6 md:p-8 rounded-2xl shadow-sm border border-neutral-800 space-y-4">
          <h3 className="font-serif text-lg font-bold text-sand-beige">Social Media Directories</h3>
          <p className="text-neutral-300 text-xs leading-relaxed">
            I post real-time stories, trail tips, and quick photography highlights on these platforms. Welcome to follow!
          </p>
          
          <div className="flex gap-3 pt-2">
            {[
              { icon: Instagram, href: 'https://instagram.com', label: '@miles_and_memories', bg: 'hover:bg-pink-600/20 hover:text-pink-400' },
              { icon: Twitter, href: 'https://twitter.com', label: '@miles_blog', bg: 'hover:bg-sky-500/20 hover:text-sky-400' },
              { icon: Github, href: 'https://github.com', label: '@traveler_dev', bg: 'hover:bg-neutral-800 hover:text-neutral-200' }
            ].map((soc, idx) => {
              const Icon = soc.icon;
              return (
                <a
                  key={idx}
                  href={soc.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-1.5 px-3 py-2 bg-neutral-800 border border-neutral-700/60 rounded-xl text-xs text-neutral-400 transition-all ${soc.bg}`}
                >
                  <Icon className="w-4 h-4" />
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* Interactive Contact Form column */}
      <div className="lg:col-span-7">
        <div className="bg-white p-6 md:p-8 rounded-2xl border border-neutral-100 shadow-sm min-h-[400px] flex flex-col justify-center">
          
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4" id="contact-submission-form">
              <div className="border-b border-neutral-100 pb-3 mb-2">
                <h3 className="font-serif text-xl font-bold text-dark-gray">Inquiry Form</h3>
                <p className="text-neutral-450 text-xs leading-normal mt-0.5">Drop a note, feedback, or general request below.</p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono font-bold text-neutral-400 uppercase tracking-wider block">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Kanchan Rajpurohit..."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2.5 bg-neutral-50 focus:bg-white border border-neutral-200 rounded-xl text-xs text-dark-gray focus:outline-none focus:ring-2 focus:ring-sky-blue transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono font-bold text-neutral-400 uppercase tracking-wider block">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="your-email@example.com..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2.5 bg-neutral-50 focus:bg-white border border-neutral-200 rounded-xl text-xs text-dark-gray focus:outline-none focus:ring-2 focus:ring-sky-blue transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono font-bold text-neutral-400 uppercase tracking-wider block">Inquiry Subject</label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-neutral-600 font-semibold focus:outline-none focus:ring-2 focus:ring-sky-blue transition-all"
                >
                  <option value="General Inquiry">General Inquiry & Greetings</option>
                  <option value="Itinerary Feedback">Itinerary Feedback & Recommendations</option>
                  <option value="Photography License">Photography License / Commercial Partnerships</option>
                  <option value="Press / Sponsor">Press & Sponsorship pitches</option>
                </select>
              </div>

              <div className="space-y-1.5 animate-fadeIn">
                <label className="text-[10px] font-mono font-bold text-neutral-400 uppercase tracking-wider block">Inquiry Message</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Share details of your travel questions, location suggestions, budget guidelines concerns, etc..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full p-4 bg-neutral-50 focus:bg-white border border-neutral-200 rounded-xl text-xs text-dark-gray leading-relaxed focus:outline-none focus:ring-2 focus:ring-sky-blue transition-all"
                ></textarea>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="bg-sky-blue hover:bg-sky-blue/90 text-white font-semibold text-xs px-5 py-2.5 rounded-xl shadow-md shadow-sky-blue/10 flex items-center gap-1.5 transition-all hover:-translate-y-0.5 active:translate-y-0"
                  id="btn-submit-contact-inquiry"
                >
                  <Send className="w-4 h-4" /> Send Message
                </button>
              </div>
            </form>
          ) : (
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center py-10 space-y-4"
              id="contact-submission-success"
            >
              <div className="w-14 h-14 bg-sky-blue/10 text-sky-blue rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-serif text-2xl font-bold text-dark-gray">Message Transmitted!</h3>
                <p className="text-neutral-500 text-xs max-w-sm mx-auto mt-1 leading-relaxed">
                  Thank you, **{name}**. Your inquiry regarding **{subject}** was successfully received. I will check the connection and write back to **{email}** as soon as I return to camp.
                </p>
              </div>

              <button
                onClick={handleReset}
                className="bg-neutral-150 hover:bg-neutral-200 text-neutral-700 text-xs font-semibold py-2 px-4 rounded-xl transition-all border border-neutral-200"
              >
                Send Another Message
              </button>
            </motion.div>
          )}

        </div>
      </div>

    </div>
  );
}
