/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Destination } from '../types';
import { MapPin, Globe, Compass, CheckCircle2, Bookmark, Flame } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface InteractiveMapProps {
  destinations: Destination[];
  onSelectDestination: (id: string) => void;
  onUpdateStatus: (id: string, newStatus: 'visited' | 'wishlist' | 'featured') => void;
}

export default function InteractiveMap({
  destinations,
  onSelectDestination,
  onUpdateStatus,
}: InteractiveMapProps) {
  const [activeContinent, setActiveContinent] = useState<string | null>(null);
  const [hoveredPin, setHoveredPin] = useState<Destination | null>(null);
  const [selectedPin, setSelectedPin] = useState<Destination | null>(null);

  // Simple clean SVG continent paths for a stylized minimal map layout (viewBox 0 0 1000 500)
  const CONTINENTS_SVG = [
    {
      id: 'North America',
      name: 'North America',
      // Stylized polygon representing North America
      points: '120,80 250,80 320,160 210,240 180,240 150,180 100,140',
      center: { x: 190, y: 150 }
    },
    {
      id: 'South America',
      name: 'South America',
      // Stylized polygon representing South America
      points: '220,250 280,290 320,350 290,440 240,400 210,310',
      center: { x: 260, y: 350 }
    },
    {
      id: 'Europe',
      name: 'Europe',
      // Stylized polygon representing Europe
      points: '450,100 580,105 560,190 480,210 440,160',
      center: { x: 500, y: 150 }
    },
    {
      id: 'Africa',
      name: 'Africa',
      // Stylized polygon representing Africa
      points: '470,220 560,225 610,295 620,380 570,410 510,360 460,280',
      center: { x: 540, y: 310 }
    },
    {
      id: 'Asia',
      name: 'Asia',
      // Stylized polygon representing Asia
      points: '590,90 900,90 890,240 800,280 710,270 590,195',
      center: { x: 740, y: 170 }
    },
    {
      id: 'Oceania',
      name: 'Oceania',
      // Stylized polygon representing Australia & Oceania
      points: '780,330 880,340 920,400 850,440 790,400',
      center: { x: 840, y: 380 }
    }
  ];

  const getStatusColor = (status: 'visited' | 'wishlist' | 'featured') => {
    switch (status) {
      case 'visited':
        return '#4DA8DA'; // Sky Blue
      case 'wishlist':
        return '#F4E1C1'; // Sand Beige
      case 'featured':
        return '#E28743'; // Warm Terracotta / Gold highlight
    }
  };

  const getStatusClass = (status: 'visited' | 'wishlist' | 'featured') => {
    switch (status) {
      case 'visited':
        return 'bg-sky-blue text-white ring-sky-blue/30';
      case 'wishlist':
        return 'bg-sand-beige text-dark-gray ring-sand-beige/40';
      case 'featured':
        return 'bg-[#E28743] text-white ring-orange-500/30';
    }
  };

  const filteredPins = activeContinent
    ? destinations.filter((d) => d.continent === activeContinent)
    : destinations;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-6 md:p-8" id="interactive-map-section">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div>
          <span className="text-xs font-semibold tracking-wider uppercase text-sky-blue flex items-center gap-1.5 mb-1 bg-sky-blue/10 px-2.5 py-1 rounded-full w-fit">
            <Globe className="w-3 H-3" /> Real-time Interactive Map
          </span>
          <h2 className="text-2xl md:text-3xl font-serif text-dark-gray">World Wanderlust Registry</h2>
          <p className="text-neutral-500 text-sm mt-1">
            Click pins to launch destination guides. Toggle statuses to curate your personal dream board.
          </p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 text-xs font-medium">
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-full border border-sky-blue/40" style={{ backgroundColor: getStatusColor('visited') }}></span>
            <span className="text-neutral-600">Visited Places ({destinations.filter(d => d.status === 'visited').length})</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-full border border-[#D8C4A9]" style={{ backgroundColor: getStatusColor('wishlist') }}></span>
            <span className="text-neutral-600">Wishlist ({destinations.filter(d => d.status === 'wishlist').length})</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-full border border-[#C56C2D]" style={{ backgroundColor: getStatusColor('featured') }}></span>
            <span className="text-neutral-600">Featured Guides ({destinations.filter(d => d.status === 'featured').length})</span>
          </div>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setActiveContinent(null)}
          className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-200 border ${
            activeContinent === null
              ? 'bg-dark-gray text-white border-dark-gray shadow-sm'
              : 'bg-neutral-50 text-neutral-600 border-neutral-200 hover:bg-neutral-100'
          }`}
          id="btn-filter-all-countries"
        >
          All Continents
        </button>
        {['Asia', 'Europe', 'North America', 'South America', 'Africa', 'Oceania'].map((c) => (
          <button
            key={c}
            onClick={() => setActiveContinent(c)}
            className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-200 border ${
              activeContinent === c
                ? 'bg-sky-blue text-white border-sky-blue shadow-sm'
                : 'bg-neutral-50 text-neutral-600 border-neutral-200 hover:bg-neutral-100'
            }`}
            id={`btn-filter-continent-${c.toLowerCase().replace(' ', '-')}`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Map Canvas */}
      <div className="relative aspect-[2/1] w-full rounded-xl bg-neutral-900 overflow-hidden border border-neutral-800 shadow-inner">
        {/* Subtle grid background */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute inset-x-0 bottom-4 text-center pointer-events-none z-10">
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-600">
            Mercator Grid Projection Matrix
          </span>
        </div>

        <svg className="w-full h-full" viewBox="0 0 1000 500">
          {/* Continent Polygons */}
          <g>
            {CONTINENTS_SVG.map((continent) => {
              const isSelected = activeContinent === continent.id;
              const isAnySelected = activeContinent !== null;
              return (
                <polygon
                  key={continent.id}
                  points={continent.points}
                  className="transition-all duration-300 cursor-pointer fill-neutral-850 stroke-neutral-800 stroke-1 hover:fill-neutral-800"
                  style={{
                    fill: isSelected
                      ? '#1F2937' // darker gray when filtered
                      : isAnySelected
                      ? '#1B2028' // translucent muted gray for non-focused
                      : '#202631',
                    stroke: isSelected ? '#4DA8DA' : '#2D3545',
                    strokeWidth: isSelected ? 1.5 : 1,
                  }}
                  onClick={() => setActiveContinent(continent.id)}
                />
              );
            })}
          </g>

          {/* Lines connecting some pins just for styling travel lines */}
          <path
            d="M 190,140 Q 360,110 535,185 T 790,195"
            fill="none"
            stroke="rgba(77, 168, 218, 0.2)"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
          <path
            d="M 535,185 Q 560,250 585,315"
            fill="none"
            stroke="rgba(244, 225, 193, 0.2)"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />

          {/* Interactive Pins */}
          {filteredPins.map((pin) => {
            const isHovered = hoveredPin?.id === pin.id;
            const isSelected = selectedPin?.id === pin.id;
            const pinColor = getStatusColor(pin.status);

            return (
              <g
                key={pin.id}
                transform={`translate(${pin.coordinates.x}, ${pin.coordinates.y})`}
                className="cursor-pointer group"
                onMouseEnter={() => setHoveredPin(pin)}
                onMouseLeave={() => setHoveredPin(null)}
                onClick={() => setSelectedPin(selectedPin?.id === pin.id ? null : pin)}
              >
                {/* Pulsing Outer Ring */}
                <circle
                  r={isHovered || isSelected ? 14 : 8}
                  fill="none"
                  stroke={pinColor}
                  className="animate-ping opacity-20 transition-all duration-300"
                  style={{ animationDuration: '3s' }}
                />

                {/* Outer Ring */}
                <circle
                  r={isHovered || isSelected ? 10 : 6}
                  fill={pinColor}
                  className="opacity-30 transition-all duration-200"
                />

                {/* Core Dot */}
                <circle
                  r={isHovered || isSelected ? 5 : 3.5}
                  fill="#FFFFFF"
                  stroke={pinColor}
                  strokeWidth={2}
                  className="transition-all duration-200"
                />
              </g>
            );
          })}
        </svg>

        {/* Hover Tooltip Float */}
        <AnimatePresence>
          {hoveredPin && !selectedPin && (
            <motion.div
              initial={{ opacity: 0, y: 5, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 5 }}
              className="absolute pointer-events-none bg-neutral-950/90 text-white p-3 rounded-lg border border-neutral-800 text-xs shadow-xl z-20"
              style={{
                left: `${(hoveredPin.coordinates.x / 1000) * 100}%`,
                top: `${(hoveredPin.coordinates.y / 500) * 100 - 15}%`,
                transform: 'translate(-50%, -100%)',
              }}
            >
              <div className="font-serif font-bold text-sm tracking-wide text-sand-beige">
                {hoveredPin.name}
              </div>
              <div className="text-neutral-400 font-mono text-[10px] uppercase mt-0.5">
                {hoveredPin.country} • {hoveredPin.continent}
              </div>
              <div className="flex items-center gap-1.5 mt-1.5 text-neutral-300">
                <Compass className="w-3.5 h-3.5 text-sky-blue" />
                <span>Best time: {hoveredPin.bestTime}</span>
              </div>
              <div className="mt-2 flex items-center justify-between border-t border-neutral-800/60 pt-1.5">
                <span className="text-[10px] text-neutral-500 font-mono capitalize">
                  Status: {hoveredPin.status}
                </span>
                <span className="text-[10px] text-sky-blue flex items-center gap-0.5">
                  Click pin for options
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Selection Details Panel (Interactive Popup Card inside) */}
        <AnimatePresence>
          {selectedPin && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="absolute top-4 right-4 bottom-4 w-72 md:w-80 bg-neutral-950/95 text-white p-5 rounded-xl border border-neutral-800 shadow-2xl flex flex-col justify-between overflow-y-auto z-30 backdrop-blur-sm"
              id="selected-pin-panel"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex gap-2">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono uppercase font-semibold ${getStatusClass(selectedPin.status)}`}>
                      {selectedPin.status}
                    </span>
                  </div>
                  <button
                    onClick={() => setSelectedPin(null)}
                    className="text-neutral-400 hover:text-white hover:bg-neutral-800 p-1 rounded-full text-xs"
                    id="btn-close-pin-panel"
                  >
                    ✕
                  </button>
                </div>

                <div className="aspect-[4/3] w-full rounded-lg overflow-hidden mb-3.5 relative">
                  <img
                    src={selectedPin.photos[0]}
                    alt={selectedPin.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <div className="absolute bottom-3 left-3">
                    <h4 className="font-serif text-lg font-bold leading-tight flex items-center gap-1.5 text-white">
                      <MapPin className="w-4 h-4 text-sky-blue shrink-0" />
                      {selectedPin.name}
                    </h4>
                    <p className="text-[11px] text-neutral-300 font-mono tracking-wider">
                      {selectedPin.country}
                    </p>
                  </div>
                </div>

                <p className="text-xs text-neutral-300 leading-relaxed line-clamp-3 mb-3.5">
                  {selectedPin.overview}
                </p>

                {/* Change Status Controls */}
                <div className="bg-neutral-900 p-3 rounded-lg border border-neutral-800/80 mb-4">
                  <span className="text-[10px] font-mono uppercase text-neutral-400 tracking-wider block mb-2">
                    Update Registry Location Status
                  </span>
                  <div className="grid grid-cols-3 gap-1">
                    <button
                      onClick={() => onUpdateStatus(selectedPin.id, 'visited')}
                      className={`text-[10px] py-1.5 rounded flex flex-col items-center justify-center gap-1 transition-all ${
                        selectedPin.status === 'visited'
                          ? 'bg-sky-blue text-white font-semibold'
                          : 'bg-neutral-850 hover:bg-neutral-800 text-neutral-400'
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Visited
                    </button>
                    <button
                      onClick={() => onUpdateStatus(selectedPin.id, 'wishlist')}
                      className={`text-[10px] py-1.5 rounded flex flex-col items-center justify-center gap-1 transition-all ${
                        selectedPin.status === 'wishlist'
                          ? 'bg-sand-beige text-dark-gray font-semibold'
                          : 'bg-neutral-850 hover:bg-neutral-800 text-neutral-400'
                      }`}
                    >
                      <Bookmark className="w-3.5 h-3.5" />
                      Wishlist
                    </button>
                    <button
                      onClick={() => onUpdateStatus(selectedPin.id, 'featured')}
                      className={`text-[10px] py-1.5 rounded flex flex-col items-center justify-center gap-1 transition-all ${
                        selectedPin.status === 'featured'
                          ? 'bg-[#E28743] text-white font-semibold'
                          : 'bg-neutral-850 hover:bg-neutral-800 text-neutral-400'
                      }`}
                    >
                      <Flame className="w-3.5 h-3.5" />
                      Featured
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 pt-2 border-t border-neutral-800/60">
                <button
                  onClick={() => {
                    onSelectDestination(selectedPin.id);
                    setSelectedPin(null);
                  }}
                  className="flex-1 bg-sky-blue hover:bg-sky-blue/90 text-white text-xs py-2 rounded-lg font-medium transition-colors text-center"
                  id={`btn-view-guide-${selectedPin.id}`}
                >
                  View Travel Guide
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
