/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { User, Compass, Target, MapPin, Camera, Sparkles } from 'lucide-react';
import { PHOTO_GALLERY } from '../data';
import Lightfall from './Lightfall';

export default function AboutMe() {
  const stats = [
    { value: '38', label: 'Countries Visited' },
    { value: '5+', label: 'Years Travelling' },
    { value: '120k+', label: 'Active Readers' },
    { value: '450k+', label: 'Shutter clicks' }
  ];

  return (
    <div className="space-y-10" id="about-me-master-container">
      
      {/* Hero Header Section */}
      <div className="bg-white rounded-3xl overflow-hidden border border-neutral-100 shadow-sm grid md:grid-cols-12">
        <div className="md:col-span-5 h-[320px] md:h-auto min-h-[300px] relative">
          <img
            src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80"
            alt="Travel portrait of creator"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-gray/60 via-transparent"></div>
        </div>

        <div className="md:col-span-7 p-6 md:p-10 flex flex-col justify-center space-y-4">
          <span className="text-xs font-semibold uppercase text-sky-blue px-2.5 py-1 bg-sky-blue/10 rounded-full w-fit">
            Aventurer & Photographer
          </span>
          <h1 className="text-3xl md:text-5xl font-serif text-dark-gray leading-tight">
            Hi, I&apos;m Kanchan Rajpurohit
          </h1>
          <p className="text-sm md:text-base text-neutral-500 leading-relaxed font-sans">
            A nomadic storyteller and visual archivist. Five years ago, I packed a 45-liter backpack, booked a one-way ticket to Kyoto, and set out to explore the quiet corners of the globe.
          </p>
          <p className="text-sm md:text-base text-neutral-500 leading-relaxed font-sans">
            Now, through **Miles & Memories**, I curate authentic guides, budget strategies, and photo expeditions that inspire and empower conscious travelers to cross global boundaries confidently.
          </p>

          <div className="pt-4 grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-neutral-100">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center sm:text-left">
                <span className="block font-serif text-2xl md:text-3xl font-extrabold text-sky-blue">{stat.value}</span>
                <span className="block text-[10px] font-mono uppercase text-neutral-400 mt-0.5">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Grid of Values/Journey sections */}
      <div className="grid md:grid-cols-2 gap-8">
        
        {/* Travel Journey */}
        <div className="bg-white p-6 md:p-8 rounded-2xl border border-neutral-100 shadow-sm space-y-4">
          <span className="p-3 bg-neutral-50 rounded-xl flex items-center justify-center w-12 h-12 text-sky-blue border border-neutral-100 shadow-sm">
            <Compass className="w-5 h-5 stroke-[2]" />
          </span>
          <h2 className="text-xl md:text-2xl font-serif text-dark-gray font-bold">My Travel Journey</h2>
          <p className="text-xs md:text-sm text-neutral-500 leading-relaxed">
            I began by taking micro-trips across domestic national parks, learning how to pitch tents and budget daily meals for under five dollars. This basic grass-roots training evolved into an international mission, exploring major archeological sites in South America, savannah safaris in Tanzania, and temple paths in Asia. My style balances high-adventure outdoor hiking with deep cultural respect and local food curation.
          </p>
        </div>

        {/* Mission Statement */}
        <div className="bg-white p-6 md:p-8 rounded-2xl border border-neutral-100 shadow-sm space-y-4">
          <span className="p-3 bg-neutral-50 rounded-xl flex items-center justify-center w-12 h-12 text-sky-blue border border-neutral-100 shadow-sm">
            <Target className="w-5 h-5 stroke-[2]" />
          </span>
          <h2 className="text-xl md:text-2xl font-serif text-dark-gray font-bold">Mission & Ethics</h2>
          <p className="text-xs md:text-sm text-neutral-500 leading-relaxed">
            I believe traveling should expand your soul, not exploit local systems. Every article on Miles & Memories advocates for:
          </p>
          <ul className="text-xs text-neutral-500 space-y-1.5 list-disc pl-5">
            <li>Supporting strictly family-owned taverns and traditional boutique lodges.</li>
            <li>Carbon offsetting transitions and avoiding high-exploitation animal interaction.</li>
            <li>Adhering deeply to local dress codes, camera signs, and neighborhood rules.</li>
            <li>Preserving wild camping trails clean of garbage or toxic components.</li>
          </ul>
        </div>

      </div>

      {/* Favorite Destinations highlights */}
      <div className="bg-white p-6 md:p-8 rounded-2xl border border-neutral-100 shadow-sm space-y-6">
        <div>
          <h2 className="text-2xl font-serif text-dark-gray font-bold">Current Top Explored Corridors</h2>
          <p className="text-neutral-450 text-xs mt-1">My absolute favorited places to wander and photograph.</p>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { city: 'Kyoto', country: 'Japan', desc: 'Serene bamboo forests, wooden temples, match rituals.', bg: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=400&q=80' },
            { city: 'Banff National Park', country: 'Canada', desc: 'Turquoise glacial pools, grand peaks, roaring canyon streams.', bg: 'https://images.unsplash.com/photo-1483168527879-c66136b56105?auto=format&fit=crop&w=400&q=80' },
            { city: 'Santorini', country: 'Greece', desc: 'Whitewashed cliffside villas, ocean path sunset grids.', bg: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=400&q=80' }
          ].map((fav, index) => (
            <div key={index} className="relative rounded-xl overflow-hidden aspect-[4/3] group shadow-min cursor-pointer">
              <img
                src={fav.bg}
                alt={fav.city}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-gray/90 to-transparent"></div>
              <div className="absolute bottom-3 left-3 text-white">
                <span className="text-[9px] font-mono uppercase tracking-widest text-sky-blue">{fav.country}</span>
                <h4 className="font-serif font-bold text-base mt-0.5 leading-none">{fav.city}</h4>
                <p className="text-[10px] text-neutral-300 mt-1 line-clamp-1 leading-snug">{fav.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Shutter Photography Gallery */}
      <div className="bg-neutral-900 p-6 md:p-8 rounded-2xl border border-neutral-800 shadow-xl space-y-6 relative overflow-hidden text-white">
        {/* Dynamic Lightfall Background */}
        <Lightfall 
          count={50} 
          speed={1.5} 
          color="56, 189, 248" 
          maxOpacity={0.35} 
          maxWidth={1.4} 
        />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div>
            <h2 className="text-2xl font-serif text-white font-bold tracking-tight">The Shutter Gallery</h2>
            <p className="text-neutral-400 text-xs mt-1">High-exposure landscapes captured across global expeditions.</p>
          </div>
          <span className="text-xs text-sky-400 font-mono font-bold flex items-center gap-1.5 bg-sky-950/40 border border-sky-400/20 px-3 py-1 rounded-full w-fit">
            <Camera className="w-4 h-4" /> Travel Shutter clicks
          </span>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10" id="photo-gallery-master">
          {PHOTO_GALLERY.slice(0, 8).map((photo) => (
            <div 
              key={photo.id} 
              className="relative aspect-square rounded-xl overflow-hidden group bg-neutral-950 border border-neutral-800/80 shadow-md hover:border-sky-500/30 transition-all duration-300 hover:shadow-sky-500/5"
            >
              <img
                src={photo.url}
                alt={photo.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-all duration-500 ease-out brightness-90 group-hover:brightness-75 group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-neutral-950/95 via-neutral-950/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 text-white select-none pointer-events-none">
                <div className="text-xs font-bold text-sky-400 truncate">{photo.title}</div>
                <div className="text-[9px] text-neutral-300 font-mono flex items-center gap-0.5 truncate mt-0.5">
                  <MapPin className="w-2.5 h-2.5 text-sky-400" />
                  {photo.location}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
