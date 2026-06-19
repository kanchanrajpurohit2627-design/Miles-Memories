/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import InteractiveMap from './components/InteractiveMap';
import DestinationsGrid from './components/DestinationsGrid';
import BlogSystem from './components/BlogSystem';
import TravelResources from './components/TravelResources';
import AboutMe from './components/AboutMe';
import ContactMe from './components/ContactMe';

import { Destination, BlogPost, ChecklistItem, BudgetItem, Comment } from './types';
import {
  INITIAL_DESTINATIONS,
  INITIAL_BLOG_POSTS,
  INITIAL_CHECKLIST_ITEMS,
  INITIAL_BUDGET_ITEMS,
  PHOTO_GALLERY
} from './data';

import { 
  Compass, Map, BookOpen, Layers, User, Mail, 
  ArrowRight, Heart, MailCheck, Globe, Star, ShieldCheck, HelpCircle, 
  BookMarked, Users, Camera
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [darkMode, setDarkMode] = useState<boolean>(false);

  // Core States
  const [destinations, setDestinations] = useState<Destination[]>(() => {
    const cached = localStorage.getItem('mm_destinations');
    return cached ? JSON.parse(cached) : INITIAL_DESTINATIONS;
  });

  const [posts, setPosts] = useState<BlogPost[]>(() => {
    const cached = localStorage.getItem('mm_posts');
    return cached ? JSON.parse(cached) : INITIAL_BLOG_POSTS;
  });

  // Checklist items
  const [checklist, setChecklist] = useState<ChecklistItem[]>(() => {
    const cached = localStorage.getItem('mm_checklist');
    return cached ? JSON.parse(cached) : INITIAL_CHECKLIST_ITEMS;
  });

  // Budget expense entries
  const [budget, setBudget] = useState<BudgetItem[]>(() => {
    const cached = localStorage.getItem('mm_budget');
    return cached ? JSON.parse(cached) : INITIAL_BUDGET_ITEMS;
  });

  // Selected guide from map
  const [selectedDestinationId, setSelectedDestinationId] = useState<string | null>(null);

  // Newsletter signup state
  const [newsEmail, setNewsEmail] = useState('');
  const [newsSubmitted, setNewsSubmitted] = useState(false);

  // Persists values
  useEffect(() => {
    localStorage.setItem('mm_destinations', JSON.stringify(destinations));
  }, [destinations]);

  useEffect(() => {
    localStorage.setItem('mm_posts', JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    localStorage.setItem('mm_checklist', JSON.stringify(checklist));
  }, [checklist]);

  useEffect(() => {
    localStorage.setItem('mm_budget', JSON.stringify(budget));
  }, [budget]);

  // Update a destination status ('visited' | 'wishlist' | 'featured')
  const handleUpdateStatus = (id: string, newStatus: 'visited' | 'wishlist' | 'featured') => {
    setDestinations((prev) =>
      prev.map((dest) => (dest.id === id ? { ...dest, status: newStatus } : dest))
    );
  };

  // Add a blog comment
  const handleAddComment = (postId: string, comment: Comment) => {
    setPosts((prev) =>
      prev.map((post) => (post.id === postId ? { ...post, comments: [...post.comments, comment] } : post))
    );
  };

  // Log article reads
  const handleIncrementReads = (postId: string) => {
    setPosts((prev) =>
      prev.map((post) => (post.id === postId ? { ...post, reads: post.reads + 1 } : post))
    );
  };

  // Trigger from interactive world map
  const handleSelectDestination = (destId: string) => {
    setSelectedDestinationId(destId);
    setActiveTab('destinations');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle newsletter Form Submission
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsEmail.trim()) return;
    setNewsSubmitted(true);
    setNewsEmail('');
  };

  return (
    <div className={`min-h-screen flex flex-col justify-between ${darkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-neutral-50'}`}>
      
      {/* Dynamic Header */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={(tab) => {
          setActiveTab(tab);
          if (tab !== 'destinations') {
            setSelectedDestinationId(null); // clear sub-filters on raw page swaps
          }
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }} 
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      {/* Main Body View */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {activeTab === 'home' && (
          <div className="space-y-12 animate-fadeIn" id="home-view-outer-container">
            
            {/* 1. Hero Banner Section */}
            <section
              className="relative h-[480px] md:h-[600px] rounded-3xl overflow-hidden flex items-center justify-center p-6 text-center text-white"
              id="home-hero-banner"
            >
              {/* Cover asset backdrop */}
              <img
                src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1920&q=80"
                alt="Beautiful canyon road backdrop"
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/35"></div>

              {/* Float badge */}
              <div className="relative z-10 max-w-3xl space-y-4 md:space-y-6">
                <span className="text-[11px] font-mono font-bold uppercase tracking-[0.34em] text-sand-beige bg-white/10 px-4 py-1.5 rounded-full border border-white/20 backdrop-blur-sm inline-block">
                  Exploring the World, One Memory at a Time
                </span>
                <h1 className="text-4xl md:text-7xl font-serif font-black tracking-tight drop-shadow-sm text-white">
                  Miles & Memories
                </h1>
                <p className="text-sm md:text-xl text-neutral-200/90 max-w-2xl mx-auto leading-relaxed font-sans font-medium">
                  Inspiring boots-on-the-ground travel guides, detailed budget tracking structures, and photographic logs curated for mindful explorers.
                </p>

                {/* Search / Action buttons */}
                <div className="flex flex-col sm:flex-row justify-center items-center gap-3 pt-4">
                  <button
                    onClick={() => setActiveTab('destinations')}
                    className="w-full sm:w-auto bg-sky-blue hover:bg-sky-blue/90 text-white font-semibold text-sm px-6 py-3.5 rounded-xl transition-all shadow-lg shadow-sky-blue/20 hover:-translate-y-0.5 active:translate-y-0"
                  >
                    Explore Destinations
                  </button>
                  <button
                    onClick={() => setActiveTab('resources')}
                    className="w-full sm:w-auto bg-white/15 hover:bg-white/25 border border-white/30 text-white font-semibold text-sm px-6 py-3.5 rounded-xl transition-all backdrop-blur-md hover:-translate-y-0.5"
                  >
                    Trip Planner Toolkit
                  </button>
                </div>
              </div>

              {/* Tagline sticker */}
              <div className="absolute bottom-6 right-6 hidden md:block">
                <span className="font-serif italic text-sm text-sand-beige">
                  &ldquo;Collecting Miles, Creating Memories.&rdquo;
                </span>
              </div>
            </section>

            {/* 2. Interactive World Travel Map */}
            <section className="scroll-mt-20">
              <InteractiveMap
                destinations={destinations}
                onSelectDestination={handleSelectDestination}
                onUpdateStatus={handleUpdateStatus}
              />
            </section>

            {/* 3. Featured Destination Cards */}
            <section className="space-y-6">
              <div className="flex items-end justify-between border-b border-neutral-200/50 pb-4">
                <div>
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-sky-blue">Curated Excursions</span>
                  <h2 className="text-2xl md:text-3xl font-serif text-dark-gray font-bold mt-1">Featured Guides</h2>
                </div>
                <button
                  onClick={() => setActiveTab('destinations')}
                  className="text-xs font-semibold text-sky-blue hover:text-sky-blue/85 flex items-center gap-1 hover:underline"
                >
                  All guides <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {destinations.slice(0, 3).map((dest) => (
                  <div
                    key={dest.id}
                    onClick={() => handleSelectDestination(dest.id)}
                    className="bg-white rounded-2xl overflow-hidden border border-neutral-100 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group flex flex-col justify-between"
                  >
                    <div>
                      <div className="aspect-[4/3] w-full relative overflow-hidden bg-neutral-150">
                        <img
                          src={dest.photos[0]}
                          alt={dest.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <span className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm text-sky-blue font-mono text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded">
                          {dest.country}
                        </span>
                      </div>
                      <div className="p-5">
                        <span className="text-[10px] font-mono text-neutral-400 block uppercase font-medium">{dest.continent}</span>
                        <h3 className="font-serif text-lg font-bold text-dark-gray leading-tight mt-1 group-hover:text-sky-blue transition-colors">
                          {dest.name}
                        </h3>
                        <p className="text-xs text-neutral-500 mt-2 line-clamp-3 leading-relaxed">
                          {dest.overview}
                        </p>
                      </div>
                    </div>

                    <div className="p-5 pt-0 border-t border-neutral-50 flex items-center justify-between text-xs font-medium text-neutral-400">
                      <span>Best time: {dest.bestTime.split(' (')[0]}</span>
                      <span className="text-sky-blue hover:underline">Read Info</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 4. Latest Travel Stories (From Blog System) */}
            <section className="space-y-6">
              <div className="flex items-end justify-between border-b border-neutral-200/50 pb-4">
                <div>
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-sky-blue">Journal logs</span>
                  <h2 className="text-2xl md:text-3xl font-serif text-dark-gray font-bold mt-1">Our Recent Stories</h2>
                </div>
                <button
                  onClick={() => setActiveTab('blog')}
                  className="text-xs font-semibold text-sky-blue hover:text-sky-blue/85 flex items-center gap-1 hover:underline"
                >
                  Visit Travel Blog <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {posts.slice(0, 2).map((post) => (
                  <div
                    key={post.id}
                    onClick={() => {
                      setActiveTab('blog');
                      // Wait for mount to auto-scroll or render
                      setTimeout(() => {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }, 100);
                    }}
                    className="bg-white rounded-2xl overflow-hidden border border-neutral-100 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer grid sm:grid-cols-12 group"
                  >
                    <div className="sm:col-span-5 h-48 sm:h-full relative overflow-hidden bg-neutral-100">
                      <img
                        src={post.image}
                        alt={post.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="sm:col-span-7 p-5 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-mono text-sky-blue font-bold tracking-widest uppercase">{post.category}</span>
                        <h3 className="font-serif text-base font-bold text-dark-gray mt-1 leading-snug group-hover:text-sky-blue transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-xs text-neutral-500 mt-2 line-clamp-3 leading-relaxed">
                          {post.excerpt}
                        </p>
                      </div>
                      <div className="flex items-center justify-between text-[10px] text-neutral-400 font-mono mt-4 pt-3 border-t border-neutral-200/40">
                        <span>{post.date}</span>
                        <span className="text-sky-blue font-semibold">Read</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 5. Custom Categories Grid */}
            <section className="space-y-6">
              <div className="text-center">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-sky-blue">Interests</span>
                <h2 className="text-2xl md:text-3xl font-serif text-dark-gray font-bold mt-1">Travel Categories</h2>
                <p className="text-xs text-neutral-400 max-w-sm mx-auto mt-1">Filtering journals by specific travel focus streams.</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {[
                  { name: 'Adventure', icon: Globe, count: posts.filter(p => p.category === 'Adventure').length, desc: 'Summits & Wildlife' },
                  { name: 'Budget Travel', icon: Star, count: posts.filter(p => p.category === 'Budget Travel').length, desc: 'Island on a Shilling' },
                  { name: 'Solo Travel', icon: Users, count: posts.filter(p => p.category === 'Solo Travel').length, desc: 'Independent Expeditions' },
                  { name: 'Family Travel', icon: ShieldCheck, count: posts.filter(p => p.category === 'Family Travel').length, desc: 'Packed and Structured' },
                  { name: 'Travel Photography', icon: Camera, count: posts.filter(p => p.category === 'Travel Photography').length, desc: 'Chasing the light' }
                ].map((cat, idx) => {
                  const Icon = cat.icon;
                  return (
                    <div
                      key={idx}
                      onClick={() => {
                        setActiveTab('blog');
                      }}
                      className="bg-white p-5 rounded-2xl border border-neutral-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all text-center cursor-pointer group"
                    >
                      <span className="p-3 bg-neutral-50 text-sky-blue rounded-xl mx-auto flex items-center justify-center w-12 h-12 mb-3 shadow-inner border border-neutral-100 group-hover:scale-105 transition-transform">
                        <Icon className="w-5 h-5 stroke-[2]" />
                      </span>
                      <h3 className="font-serif font-bold text-sm text-dark-gray leading-none">{cat.name}</h3>
                      <p className="text-[10px] text-neutral-400 mt-1.5 leading-none">{cat.desc}</p>
                      <span className="inline-block text-[9px] font-mono font-semibold bg-sky-blue/10 text-sky-blue px-2 py-0.5 rounded mt-3">
                        {cat.count} Logs
                      </span>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* 6. Travel Photography Grid */}
            <section className="space-y-6">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-sky-blue">Visual Log</span>
                <h2 className="text-2xl md:text-3xl font-serif text-dark-gray font-bold mt-1">Photography Log</h2>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {PHOTO_GALLERY.slice(0, 4).map((img, idx) => (
                  <div key={idx} className="aspect-square rounded-2xl overflow-hidden group relative bg-neutral-100 shadow-sm">
                    <img
                      src={img.url}
                      alt={img.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-gray/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-end p-4 text-white">
                      <span className="text-[10px] text-sky-blue font-bold font-mono tracking-wider block uppercase">{img.category}</span>
                      <h4 className="font-serif font-bold text-sm leading-tight mt-0.5">{img.title}</h4>
                      <p className="text-[9px] text-neutral-300 font-mono tracking-wide mt-1">{img.location}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 7. Newsletter Section */}
            <section className="bg-dark-gray text-white rounded-3xl p-6 md:p-12 shadow-md relative overflow-hidden border border-neutral-800">
              <div className="absolute right-0 top-0 w-96 h-96 bg-sky-blue/10 rounded-full blur-3xl pointer-events-none"></div>
              <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-3">
                  <span className="text-xs font-mono uppercase text-sand-beige font-semibold tracking-wider bg-white/10 px-3 py-1 rounded-full">
                    Join the tribe
                  </span>
                  <h2 className="text-2xl md:text-4xl font-serif font-bold text-white leading-tight">
                    Never Miss an Expedition guide
                  </h2>
                  <p className="text-xs md:text-sm text-neutral-300 max-w-md leading-relaxed">
                    Subscribe to receive detailed continental visa guidelines, packing lists updates, and secret coordinates to campsite trails once/month. Minimal noise, 100% adventure.
                  </p>
                </div>

                <div>
                  {!newsSubmitted ? (
                    <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                      <input
                        type="email"
                        required
                        placeholder="your-email@example.com"
                        value={newsEmail}
                        onChange={(e) => setNewsEmail(e.target.value)}
                        className="flex-1 bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 text-xs text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-sky-blue"
                      />
                      <button
                        type="submit"
                        className="bg-sky-blue hover:bg-sky-blue/90 text-white text-xs font-bold px-5 py-3 rounded-xl shadow-md transition-all shrink-0"
                      >
                        Subscribe
                      </button>
                    </form>
                  ) : (
                    <div className="bg-sky-blue/15 border border-sky-blue/35 p-5 rounded-2xl flex items-center gap-3 animate-fadeIn">
                      <MailCheck className="w-8 h-8 text-sky-blue shrink-0" />
                      <div className="text-xs text-neutral-200">
                        <span className="font-bold text-white block">Aboard the Registry!</span>
                        Thank you for subscribing. We will transmit our active travel tip sheet to you shortly.
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </section>

          </div>
        )}

        {/* Other Active Tab Sheets */}
        {activeTab === 'destinations' && (
          <div className="animate-fadeIn">
            <DestinationsGrid
              destinations={destinations}
              onUpdateStatus={handleUpdateStatus}
              selectedDestinationId={selectedDestinationId}
              resetSelectedDestination={() => setSelectedDestinationId(null)}
            />
          </div>
        )}

        {activeTab === 'blog' && (
          <div className="animate-fadeIn">
            <BlogSystem
              posts={posts}
              onAddComment={handleAddComment}
              onIncrementReads={handleIncrementReads}
            />
          </div>
        )}

        {activeTab === 'resources' && (
          <div className="animate-fadeIn">
            <TravelResources
              checklist={checklist}
              setChecklist={setChecklist}
              budget={budget}
              setBudget={setBudget}
            />
          </div>
        )}

        {activeTab === 'about' && (
          <div className="animate-fadeIn">
            <AboutMe />
          </div>
        )}

        {activeTab === 'contact' && (
          <div className="animate-fadeIn">
            <ContactMe />
          </div>
        )}
      </main>

      {/* Modern Footers */}
      <footer className="bg-neutral-900 text-neutral-400 border-t border-neutral-850 pt-16 pb-20 md:pb-8" id="footer-master-block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-4 gap-8">
          
          {/* Col 1: About */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-white">
              <div className="bg-sky-blue p-2 rounded-lg text-white">
                <Globe className="w-4 h-4" />
              </div>
              <span className="font-serif text-lg font-bold">Miles & Memories</span>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed font-sans">
              Sharing authentic travel logs, packing checks, dynamic calculators, and high-exposure landscape galleries. Empowering standard explorers to travel confidently.
            </p>
          </div>

          {/* Col 2: Categories */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase font-mono font-bold text-white tracking-widest">Active Streams</h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button onClick={() => { setActiveTab('blog'); }} className="hover:text-white transition-colors text-left">Adventure</button>
              <button onClick={() => { setActiveTab('blog'); }} className="hover:text-white transition-colors text-left">Budget Travel</button>
              <button onClick={() => { setActiveTab('blog'); }} className="hover:text-white transition-colors text-left">Solo Travel</button>
              <button onClick={() => { setActiveTab('blog'); }} className="hover:text-white transition-colors text-left">Family Travel</button>
            </div>
          </div>

          {/* Col 3: Resources */}
          <div className="space-y-3 font-medium">
            <h4 className="text-xs uppercase font-mono font-bold text-white tracking-widest font-bold">Resources</h4>
            <div className="flex flex-col gap-2 text-xs text-neutral-450">
              <button onClick={() => { setActiveTab('resources'); }} className="hover:text-white transition-colors text-left">Packing checklist</button>
              <button onClick={() => { setActiveTab('resources'); }} className="hover:text-white transition-colors text-left">Trip cost planner</button>
              <button onClick={() => { setActiveTab('resources'); }} className="hover:text-white transition-colors text-left">Visa resources</button>
              <button onClick={() => { setActiveTab('resources'); }} className="hover:text-white transition-colors text-left">Companion apps</button>
            </div>
          </div>

          {/* Col 4: Newsletter or Copyright info */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase font-mono font-bold text-white tracking-widest font-bold">Registry Tagline</h4>
            <p className="text-xs text-neutral-400 italic">
              &ldquo;Collecting Miles, Creating Memories.&rdquo;
            </p>
            <div className="text-[10px] text-neutral-500 font-mono pt-2 border-t border-neutral-800">
              © 2026 Miles & Memories. Confident Exploration with sand-slate. All rights reserved.
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
