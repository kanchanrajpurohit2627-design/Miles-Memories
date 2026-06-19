/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { User, Compass, Target, MapPin, Camera, Sparkles, Sliders, Zap, RotateCcw, Paintbrush } from 'lucide-react';
import { PHOTO_GALLERY } from '../data';
import Lightfall from './Lightfall';

export default function AboutMe() {
  const stats = [
    { value: '38', label: 'Countries Visited' },
    { value: '5+', label: 'Years Travelling' },
    { value: '120k+', label: 'Active Readers' },
    { value: '450k+', label: 'Shutter clicks' }
  ];

  const [ambientColor, setAmbientColor] = useState('56, 189, 248');
  const [ambientCount, setAmbientCount] = useState(60);
  const [ambientSpeed, setAmbientSpeed] = useState(1.8);
  const [ambientOpacity, setAmbientOpacity] = useState(0.40);
  const [ambientWidth, setAmbientWidth] = useState(1.5);
  const [selectedPreset, setSelectedPreset] = useState('sky');

  const presets = [
    { id: 'sky', name: 'Santorini Sky', rgb: '56, 189, 248', desc: 'Crisp cerulean trails matching coastal Aegean winds.' },
    { id: 'gold', name: 'Kyoto Zen', rgb: '234, 179, 8', desc: 'Gentle golden light reminiscent of Fushimi twilight.' },
    { id: 'aurora', name: 'Banff Aurora', rgb: '34, 197, 94', desc: 'Ethereal emerald streams of the alpine sky.' },
    { id: 'orchid', name: 'Fuji Mystic', rgb: '168, 85, 247', desc: 'Deep violet stardust paths over snowy peaks.' },
    { id: 'amber', name: 'Sahara Twilight', rgb: '249, 115, 22', desc: 'Warm amber trails cascading over evening dunes.' }
  ];

  const handleApplyPreset = (p: typeof presets[0]) => {
    setSelectedPreset(p.id);
    setAmbientColor(p.rgb);
    if (p.id === 'sky') {
      setAmbientCount(60);
      setAmbientSpeed(1.8);
      setAmbientOpacity(0.40);
      setAmbientWidth(1.5);
    } else if (p.id === 'gold') {
      setAmbientCount(45);
      setAmbientSpeed(1.1);
      setAmbientOpacity(0.50);
      setAmbientWidth(1.3);
    } else if (p.id === 'aurora') {
      setAmbientCount(85);
      setAmbientSpeed(2.2);
      setAmbientOpacity(0.35);
      setAmbientWidth(1.6);
    } else if (p.id === 'orchid') {
      setAmbientCount(50);
      setAmbientSpeed(1.4);
      setAmbientOpacity(0.45);
      setAmbientWidth(1.4);
    } else if (p.id === 'amber') {
      setAmbientCount(70);
      setAmbientSpeed(1.9);
      setAmbientOpacity(0.40);
      setAmbientWidth(1.5);
    }
  };

  const handleReset = () => {
    setSelectedPreset('sky');
    setAmbientColor('56, 189, 248');
    setAmbientCount(60);
    setAmbientSpeed(1.8);
    setAmbientOpacity(0.40);
    setAmbientWidth(1.5);
  };

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

      {/* Dynamic Ambient Lightfall Canvas Studio */}
      <div className="bg-neutral-900 border border-neutral-800 p-6 md:p-8 rounded-2xl shadow-xl space-y-6 relative overflow-hidden text-white" id="lightfall-studio-container">
        {/* Dynamic Lightfall Canvas Simulation Viewport */}
        <div className="absolute inset-0 z-0">
          <Lightfall 
            count={ambientCount} 
            speed={ambientSpeed} 
            color={ambientColor} 
            maxOpacity={ambientOpacity} 
            maxWidth={ambientWidth} 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/65 to-black/10 pointer-events-none" />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-neutral-800 pb-5">
          <div>
            <span className="text-[10px] font-mono font-bold tracking-widest text-sky-400 uppercase bg-sky-950/40 border border-sky-400/20 px-2 py-0.5 rounded">
              Aesthetic Atmosphere Engine
            </span>
            <h2 className="text-2xl font-serif font-bold tracking-tight mt-1">Lightfall Interactive Studio</h2>
            <p className="text-xs text-neutral-400 mt-1">
              Customize the fluid, canvas-driven stardust rain. Match your mood or destination.
            </p>
          </div>
          <button 
            onClick={handleReset}
            className="flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white bg-neutral-800 hover:bg-neutral-750 px-3 py-1.5 rounded-lg border border-neutral-700/60 transition-all cursor-pointer"
            title="Reset to default"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Defaults
          </button>
        </div>

        {/* Studio Workspace Layout */}
        <div className="grid md:grid-cols-12 gap-6 relative z-10">
          
          {/* Left Column: Preset cards */}
          <div className="md:col-span-12 lg:col-span-5 space-y-3">
            <h3 className="text-xs font-mono font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
              <Paintbrush className="w-3.5 h-3.5 text-sky-400" />
              Atmospheric Destination Presets
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2">
              {presets.map((preset) => {
                const isSelected = selectedPreset === preset.id;
                return (
                  <button
                    key={preset.id}
                    onClick={() => handleApplyPreset(preset)}
                    className={`w-full text-left p-3 rounded-xl border transition-all duration-200 cursor-pointer flex items-center gap-3 ${
                      isSelected 
                        ? 'bg-neutral-800/95 border-sky-500/50 shadow-md shadow-sky-500/5' 
                        : 'bg-neutral-950/35 border-neutral-800 hover:border-neutral-700 hover:bg-neutral-850/40'
                    }`}
                  >
                    {/* Color Bulb indicator with custom shadow */}
                    <span 
                      className={`w-3 h-3 rounded-full shrink-0 block transition-transform ${isSelected ? 'scale-110' : 'scale-100'}`}
                      style={{ 
                        backgroundColor: `rgb(${preset.rgb})`,
                        boxShadow: `0 0 10px rgb(${preset.rgb})`
                      }}
                    />
                    <div>
                      <h4 className={`text-xs font-serif font-bold leading-none ${isSelected ? 'text-sky-400' : 'text-white'}`}>
                        {preset.name}
                      </h4>
                      <p className="text-[10px] text-neutral-400 line-clamp-1 mt-1 font-sans">
                        {preset.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Custom controls */}
          <div className="md:col-span-12 lg:col-span-7 bg-neutral-950/60 border border-neutral-800/80 p-5 rounded-2xl backdrop-blur-md space-y-5">
            <h3 className="text-xs font-mono font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-sky-400" />
              Precipitation Tuning Deck
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
              {/* Density Count control */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono text-neutral-300">
                  <span className="flex items-center gap-1">Color Trails Density</span>
                  <span className="text-sky-400 font-bold">{ambientCount} streams</span>
                </div>
                <input 
                  type="range"
                  min="10"
                  max="120"
                  step="5"
                  value={ambientCount}
                  onChange={(e) => {
                    setAmbientCount(Number(e.target.value));
                    setSelectedPreset('custom');
                  }}
                  className="w-full accent-sky-400 h-1 bg-neutral-800 rounded-lg cursor-pointer"
                />
                <p className="text-[9px] text-neutral-500 leading-none">Controls the volume of falling high-exposure rain threads.</p>
              </div>

              {/* Descent Velocity control */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono text-neutral-300">
                  <span className="flex items-center gap-1">Descent Velocity</span>
                  <span className="text-sky-400 font-bold">{ambientSpeed.toFixed(1)}x</span>
                </div>
                <input 
                  type="range"
                  min="0.5"
                  max="4.0"
                  step="0.1"
                  value={ambientSpeed}
                  onChange={(e) => {
                    setAmbientSpeed(Number(e.target.value));
                    setSelectedPreset('custom');
                  }}
                  className="w-full accent-sky-400 h-1 bg-neutral-800 rounded-lg cursor-pointer"
                />
                <p className="text-[9px] text-neutral-500 leading-none">Sets the gravitational speed multipliers for the cosmic stream.</p>
              </div>

              {/* Max Opacity control */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono text-neutral-300">
                  <span>Aura Luminescence</span>
                  <span className="text-sky-400 font-bold">{Math.round(ambientOpacity * 100)}%</span>
                </div>
                <input 
                  type="range"
                  min="0.1"
                  max="0.9"
                  step="0.05"
                  value={ambientOpacity}
                  onChange={(e) => {
                    setAmbientOpacity(Number(e.target.value));
                    setSelectedPreset('custom');
                  }}
                  className="w-full accent-sky-400 h-1 bg-neutral-800 rounded-lg cursor-pointer"
                />
                <p className="text-[9px] text-neutral-500 leading-none">Sets the maximum alpha opacity for the stream trail filaments.</p>
              </div>

              {/* Thread Width control */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono text-neutral-300">
                  <span>Filament Thickness</span>
                  <span className="text-sky-400 font-bold">{ambientWidth.toFixed(1)}px</span>
                </div>
                <input 
                  type="range"
                  min="0.5"
                  max="3.5"
                  step="0.1"
                  value={ambientWidth}
                  onChange={(e) => {
                    setAmbientWidth(Number(e.target.value));
                    setSelectedPreset('custom');
                  }}
                  className="w-full accent-sky-400 h-1 bg-neutral-800 rounded-lg cursor-pointer"
                />
                <p className="text-[9px] text-neutral-500 leading-none">Tuning the thickness of individual light particle trails.</p>
              </div>
            </div>

            {/* Custom Color Palette Grid */}
            <div className="border-t border-neutral-800 pt-4 space-y-2">
              <h4 className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">
                Fine-tune RGB Hue
              </h4>
              <div className="flex flex-wrap gap-2">
                {[
                  { name: 'Sky Cerulean', rgb: '56, 189, 248' },
                  { name: 'Jade Aurora', rgb: '34, 197, 94' },
                  { name: 'Sunset Bronze', rgb: '234, 179, 8' },
                  { name: 'Sahara Amber', rgb: '249, 115, 22' },
                  { name: 'Crimson Ember', rgb: '239, 68, 68' },
                  { name: 'Mystic Indigo', rgb: '99, 102, 241' },
                  { name: 'Fuji Orchid', rgb: '168, 85, 247' },
                  { name: 'Pure Astral Whisp', rgb: '255, 255, 255' }
                ].map((colorObj) => {
                  const isActive = ambientColor === colorObj.rgb;
                  return (
                    <button
                      key={colorObj.name}
                      onClick={() => {
                        setAmbientColor(colorObj.rgb);
                        setSelectedPreset('custom');
                      }}
                      className={`text-[9px] font-mono px-2.5 py-1 rounded-md border transition-all cursor-pointer flex items-center gap-1.5 ${
                        isActive 
                          ? 'bg-neutral-800/90 text-white font-bold' 
                          : 'bg-neutral-900/40 text-neutral-450 border-neutral-800 hover:border-neutral-700 hover:text-white'
                      }`}
                      style={{ 
                        borderColor: isActive ? `rgba(${colorObj.rgb}, 0.5)` : undefined,
                        boxShadow: isActive ? `0 0 6px rgba(${colorObj.rgb}, 0.15)` : undefined
                      }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: `rgb(${colorObj.rgb})` }} />
                      {colorObj.name}
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
}
