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

  // Detailed and geographically authentic SVG paths representing true continent shapes (viewBox 0 0 1000 500)
  const CONTINENTS_SVG = [
    {
      id: 'North America',
      name: 'North America',
      pathD: 'M 50,75 C 45,90 60,110 80,115 C 95,120 100,140 115,145 C 125,150 145,145 155,160 C 160,170 140,195 150,225 C 155,240 162,260 170,270 C 178,280 190,290 200,295 C 205,300 210,300 215,295 C 215,285 205,275 200,265 C 195,255 190,240 195,230 C 200,225 210,230 215,235 C 220,240 225,245 235,245 C 245,245 250,235 252,225 C 255,215 255,200 265,190 C 275,180 290,185 300,180 C 310,175 315,165 315,155 C 315,145 305,135 295,135 C 285,135 280,125 280,115 C 280,105 290,100 295,95 C 300,90 310,95 320,95 C 330,95 345,85 345,70 C 345,55 330,45 310,45 C 290,45 285,55 275,65 C 265,75 250,75 240,70 C 230,65 230,55 220,55 C 210,55 200,65 190,70 C 180,75 160,70 145,65 C 130,60 115,65 100,65 C 80,65 60,65 50,75 Z M 285,45 C 300,25 335,25 350,35 C 365,45 355,75 345,85 C 335,95 315,95 300,85 C 285,75 275,65 285,45 Z',
      center: { x: 190, y: 150 }
    },
    {
      id: 'South America',
      name: 'South America',
      pathD: 'M 215,295 C 225,305 235,310 245,315 C 260,320 275,310 290,315 C 310,320 325,310 335,320 C 345,330 355,345 350,360 C 345,375 330,385 320,395 C 310,405 300,420 290,435 C 280,450 270,465 260,480 C 255,488 250,490 248,485 C 246,480 248,465 245,450 C 242,435 235,420 230,405 C 225,390 220,375 218,360 C 216,345 212,330 212,315 C 212,305 214,300 215,295 Z',
      center: { x: 260, y: 350 }
    },
    {
      id: 'Europe',
      name: 'Europe',
      pathD: 'M 445,240 C 440,230 435,215 440,205 C 445,195 455,190 465,185 C 475,180 480,165 480,150 C 480,135 485,115 478,105 C 471,95 455,95 460,85 C 465,75 485,75 495,85 C 505,95 500,115 510,125 C 520,135 535,130 550,130 C 565,130 580,120 585,135 C 590,150 575,165 570,180 C 565,195 555,200 545,205 C 535,210 525,215 515,218 C 505,221 498,225 492,220 C 486,215 486,205 482,205 C 478,205 470,210 465,215 C 460,220 450,235 445,240 Z M 438,170 C 435,160 445,150 450,155 C 455,160 452,180 445,180 C 438,180 441,180 438,170 Z',
      center: { x: 500, y: 150 }
    },
    {
      id: 'Africa',
      name: 'Africa',
      pathD: 'M 465,245 C 455,245 440,242 430,248 C 415,255 405,270 400,285 C 395,300 398,315 410,325 C 422,335 440,335 455,340 C 470,345 480,355 490,365 C 500,375 510,390 515,405 C 520,420 525,435 535,445 C 540,453 548,455 552,450 C 556,445 555,430 560,415 C 565,400 572,385 580,370 C 588,355 595,340 605,330 C 615,320 628,315 632,305 C 636,295 630,285 620,285 C 610,285 600,280 592,272 C 584,264 580,255 570,252 C 560,249 550,252 540,250 C 530,248 520,240 510,240 C 500,240 480,245 465,245 Z M 602,375 C 608,365 615,370 618,380 C 621,390 618,405 612,415 C 606,425 598,415 600,400 C 602,385 596,385 602,375 Z',
      center: { x: 540, y: 310 }
    },
    {
      id: 'Asia',
      name: 'Asia',
      pathD: 'M 545,248 C 555,255 570,260 585,255 C 600,250 605,240 615,245 C 625,250 630,265 635,275 C 640,285 645,280 648,270 C 651,260 655,250 660,255 C 665,260 670,270 675,280 C 680,290 690,295 700,290 C 710,285 712,270 710,255 C 708,240 715,230 725,225 C 735,220 745,230 755,230 C 765,230 770,220 772,210 C 774,200 765,180 770,170 C 775,160 788,155 790,145 C 792,135 780,120 790,110 C 800,100 820,105 830,95 C 840,85 850,75 845,65 C 840,55 810,50 780,55 C 750,60 700,60 660,65 C 620,70 590,75 585,90 C 580,105 585,120 580,135 C 575,150 560,165 555,180 C 550,195 540,210 535,225 C 530,240 535,241 545,248 Z M 795,145 C 800,150 805,170 800,185 C 795,200 790,195 792,180 C 794,165 790,150 795,145 Z',
      center: { x: 740, y: 170 }
    },
    {
      id: 'Oceania',
      name: 'Oceania',
      pathD: 'M 750,370 C 760,358 775,355 790,350 C 805,345 820,350 835,345 C 845,340 855,345 860,355 C 865,365 875,360 885,370 C 895,380 890,395 885,410 C 880,425 860,430 840,435 C 820,440 795,440 780,435 C 765,430 755,415 750,400 C 745,385 745,375 750,370 Z M 910,430 C 915,440 920,455 918,460 C 912,465 905,455 907,445 C 909,435 905,435 910,430 Z M 715,310 C 725,310 745,315 755,310 C 765,305 780,315 785,310 C 790,305 770,295 750,295 C 730,295 710,300 715,310 Z M 800,310 C 810,310 830,315 840,320 C 850,325 845,335 830,335 C 815,335 790,330 800,310 Z',
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
                <path
                  key={continent.id}
                  d={continent.pathD}
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
