/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Destination } from '../types';
import { Search, Compass, Calendar, Wallet, CheckSquare, Coffee, HelpCircle, Heart, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface DestinationsGridProps {
  destinations: Destination[];
  onUpdateStatus: (id: string, newStatus: 'visited' | 'wishlist' | 'featured') => void;
  selectedDestinationId: string | null;
  resetSelectedDestination: () => void;
}

export default function DestinationsGrid({
  destinations,
  onUpdateStatus,
  selectedDestinationId,
  resetSelectedDestination,
}: DestinationsGridProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContinent, setSelectedContinent] = useState<string>('All');
  const [photoIndices, setPhotoIndices] = useState<{ [key: string]: number }>({});
  const [checkedActivities, setCheckedActivities] = useState<{ [key: string]: boolean }>({});

  const continents = ['All', 'Asia', 'Europe', 'North America', 'South America', 'Africa', 'Oceania'];

  // Toggle checklist activity
  const toggleActivity = (destId: string, idx: number) => {
    const key = `${destId}-${idx}`;
    setCheckedActivities((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Image slide navigation
  const nextPhoto = (destId: string, max: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setPhotoIndices((prev) => ({
      ...prev,
      [destId]: ((prev[destId] || 0) + 1) % max,
    }));
  };

  const prevPhoto = (destId: string, max: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setPhotoIndices((prev) => ({
      ...prev,
      [destId]: ((prev[destId] || 0) - 1 + max) % max,
    }));
  };

  // Filters
  const filtered = destinations.filter((d) => {
    const matchesSearch =
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.overview.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesContinent = selectedContinent === 'All' || d.continent === selectedContinent;
    
    // If targeted from interactive map, we bypass other filters to focus on it
    if (selectedDestinationId) {
      return d.id === selectedDestinationId;
    }
    
    return matchesSearch && matchesContinent;
  });

  return (
    <div className="space-y-8" id="destinations-master-container">
      
      {/* Title & Filter Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-6 md:p-8">
        <div className="max-w-3xl">
          <span className="text-xs font-semibold tracking-wider uppercase text-sky-blue px-2.5 py-1 bg-sky-blue/10 rounded-full">
            Explore Places
          </span>
          <h1 className="text-3xl md:text-5xl font-serif text-dark-gray mt-2 leading-tight">
            Comprehensive Destination Guides
          </h1>
          <p className="text-neutral-500 text-sm md:text-base mt-2">
            Curated overviews, local recommendations, expense scales, seasonal timing matrices, and authentic travel hacks directly from our boots-on-the-ground.
          </p>
        </div>

        {/* Floating Clear Active Selection Notice */}
        {selectedDestinationId && (
          <div className="mt-4 bg-sky-blue/10 border border-sky-blue/20 p-3 rounded-xl flex items-center justify-between text-xs text-sky-blue font-medium animate-fadeIn">
            <span className="flex items-center gap-1.5Packed">
              <MapPin className="w-4 h-4" /> Primary Filter: Viewing Map Selection
            </span>
            <button
              onClick={resetSelectedDestination}
              className="bg-sky-blue text-white px-3 py-1 rounded-lg hover:bg-sky-blue/90 font-semibold"
            >
              Show All Destinations
            </button>
          </div>
        )}

        {/* Filter Controls Row */}
        {!selectedDestinationId && (
          <div className="mt-6 pt-6 border-t border-neutral-100 grid md:grid-cols-12 gap-4">
            {/* Search Input */}
            <div className="relative md:col-span-5">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input
                type="text"
                placeholder="Search city, country, or overview tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-blue focus:bg-white transition-all text-dark-gray placeholder-neutral-400"
                id="search-destinations-input"
              />
            </div>

            {/* Continent Horizontal Scroller */}
            <div className="md:col-span-7 flex items-center overflow-x-auto gap-1.5 scrollbar-thin py-1">
              {continents.map((continent) => (
                <button
                  key={continent}
                  onClick={() => setSelectedContinent(continent)}
                  className={`px-3.5 py-2 text-xs font-semibold rounded-xl transition-all whitespace-nowrap min-w-fit ${
                    selectedContinent === continent
                      ? 'bg-sky-blue text-white shadow-sm border border-sky-blue'
                      : 'bg-neutral-50 text-neutral-600 border border-neutral-200 hover:bg-neutral-100 hover:text-dark-gray'
                  }`}
                  id={`btn-continent-tab-${continent.toLowerCase().replace(' ', '-')}`}
                >
                  {continent}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Grid of Results */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm text-center py-16 border border-neutral-100" id="empty-destinations-results">
          <Compass className="w-12 h-12 text-neutral-300 mx-auto mb-3 stroke-[1.5]" />
          <h3 className="font-serif text-lg font-bold text-dark-gray">No Guides Found</h3>
          <p className="text-neutral-500 text-sm mt-1 max-w-sm mx-auto">
            We haven&apos;t written about that destination yet! Check another continent or search term.
          </p>
        </div>
      ) : (
        <div className="space-y-10" id="destination-cards-wrapper">
          {filtered.map((dest) => {
            const activeIndex = photoIndices[dest.id] || 0;
            const currentPhoto = dest.photos[activeIndex];

            return (
              <motion.div
                layout
                key={dest.id}
                className="bg-white rounded-2xl shadow-sm border border-neutral-100 overflow-hidden grid lg:grid-cols-12"
                id={`destination-card-${dest.id}`}
              >
                {/* Left Side: Photo slideshow */}
                <div className="lg:col-span-5 h-[320px] lg:h-full relative overflow-hidden group">
                  <img
                    src={currentPhoto}
                    alt={dest.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-gray/90 via-black/25 to-black/30"></div>

                  {/* Photo Info overlay */}
                  <span className="absolute top-4 left-4 bg-black/50 text-white font-mono text-[10px] px-2 py-1 rounded-full uppercase tracking-wider backdrop-blur-sm">
                    {dest.continent} • {dest.country}
                  </span>

                  {/* Wishlist Hearts Toggle */}
                  <div className="absolute top-4 right-4 flex gap-1.5">
                    <button
                      onClick={() => onUpdateStatus(dest.id, dest.status === 'wishlist' ? 'visited' : 'wishlist')}
                      className={`p-2 rounded-xl transition-all shadow-md backdrop-blur-sm ${
                        dest.status === 'wishlist'
                          ? 'bg-red-500 text-white hover:bg-red-600'
                          : 'bg-black/40 text-neutral-300 hover:text-white hover:bg-black/60'
                      }`}
                      title={dest.status === 'wishlist' ? 'Remove from Wishlist' : 'Add to Wishlist'}
                      id={`btn-heart-wishlist-${dest.id}`}
                    >
                      <Heart className="w-4 h-4 fill-current" />
                    </button>
                  </div>

                  {/* Arrow controls */}
                  <button
                    onClick={(e) => prevPhoto(dest.id, dest.photos.length, e)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 hover:bg-white/40 text-white transition-opacity md:opacity-0 md:group-hover:opacity-100"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => nextPhoto(dest.id, dest.photos.length, e)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 hover:bg-white/40 text-white transition-opacity md:opacity-0 md:group-hover:opacity-100"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  {/* Slide Indicators */}
                  <div className="absolute bottom-4 left-4 flex gap-1.5">
                    {dest.photos.map((_, idx) => (
                      <span
                        key={idx}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          idx === activeIndex ? 'bg-sky-blue w-5' : 'bg-white/50'
                        }`}
                      ></span>
                    ))}
                  </div>
                </div>

                {/* Right Side: Destination detailed content cards */}
                <div className="lg:col-span-7 p-6 md:p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="text-sky-blue w-5 h-5" />
                        <h2 className="text-2xl md:text-3xl font-serif text-dark-gray font-bold">
                          {dest.name}
                        </h2>
                      </div>
                      <div className="flex gap-1.5 text-xs font-mono">
                        <span className={`px-2.5 py-1 rounded-full uppercase tracking-wider font-semibold ${
                          dest.status === 'visited' ? 'bg-sky-blue/10 text-sky-blue' :
                          dest.status === 'wishlist' ? 'bg-amber-500/10 text-amber-600' :
                          'bg-emerald-500/10 text-emerald-600'
                        }`}>
                          {dest.status}
                        </span>
                      </div>
                    </div>

                    <p className="text-neutral-600 text-xs md:text-sm leading-relaxed mb-6">
                      {dest.overview}
                    </p>

                    {/* Quick Info Grid */}
                    <div className="grid grid-cols-2 gap-4 bg-neutral-50 p-4 rounded-xl mb-6 border border-neutral-100">
                      <div className="flex items-start gap-2.5">
                        <Calendar className="w-4 h-4 text-sky-blue mt-0.5 shrink-0" />
                        <div>
                          <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block">Best Time to Visit</span>
                          <span className="text-xs text-dark-gray font-medium">{dest.bestTime}</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <Wallet className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                        <div>
                          <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block">Budget Guide</span>
                          <span className="text-xs text-dark-gray font-medium line-clamp-2 leading-snug">{dest.budgetGuide}</span>
                        </div>
                      </div>
                    </div>

                    {/* Tabs / Sub-Sections of guide */}
                    <div className="space-y-5">
                      {/* Things to do with interactive checklist */}
                      <div>
                        <span className="text-xs font-semibold uppercase text-neutral-400 tracking-wider flex items-center gap-1.5 mb-2.5">
                          <CheckSquare className="w-4 h-4 text-sky-blue" /> Essential Activities
                        </span>
                        <ul className="grid sm:grid-cols-2 gap-2">
                          {dest.thingsToDo.map((act, idx) => {
                            const isChecked = checkedActivities[`${dest.id}-${idx}`] || false;
                            return (
                              <li
                                key={idx}
                                onClick={() => toggleActivity(dest.id, idx)}
                                className={`flex items-start gap-2 text-xs p-2 rounded-lg cursor-pointer transition-all border ${
                                  isChecked 
                                    ? 'bg-neutral-50 border-neutral-150 text-neutral-400 line-through' 
                                    : 'bg-white hover:bg-neutral-50 border-neutral-200/65 text-dark-gray'
                                }`}
                              >
                                <input
                                  type="checkbox"
                                  checked={isChecked}
                                  readOnly
                                  className="mt-0.5 rounded text-sky-blue focus:ring-sky-blue border-neutral-300 w-3.5 h-3.5 shrink-0"
                                />
                                <span className="leading-snug">{act}</span>
                              </li>
                            );
                          })}
                        </ul>
                      </div>

                      {/* Food recommendations */}
                      <div>
                        <span className="text-xs font-semibold uppercase text-neutral-400 tracking-wider flex items-center gap-1.5 mb-2 bg-amber-500/5 py-1 px-2.5 rounded-full w-fit">
                          <Coffee className="w-3.5 h-3.5 text-amber-500" /> Signature Food Treats
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {dest.foodRecommendations.map((food, idx) => (
                            <span
                              key={idx}
                              className="text-[11px] bg-neutral-100 text-neutral-700 px-2.5 py-1 rounded-md font-medium"
                            >
                              {food}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Travel tips */}
                      <div className="border-t border-dashed border-neutral-100 pt-4">
                        <span className="text-xs font-semibold uppercase text-neutral-400 tracking-wider flex items-center gap-1.5 mb-2.5">
                          <HelpCircle className="w-4 h-4 text-sky-blue" /> Local Travel Tips & Hacks
                        </span>
                        <div className="space-y-1.5">
                          {dest.travelTips.map((tip, idx) => (
                            <div key={idx} className="flex gap-2 text-xs text-neutral-500 leading-relaxed bg-neutral-50 p-2.5 rounded-lg border-l-4 border-sky-blue">
                              <span>✓</span>
                              <p>{tip}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions footer on each card */}
                  <div className="mt-8 pt-4 border-t border-neutral-100 flex items-center justify-between gap-4">
                    <span className="text-[10px] font-mono text-neutral-400 uppercase">
                      Curated registry {dest.id}
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => onUpdateStatus(dest.id, 'visited')}
                        className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all ${
                          dest.status === 'visited'
                            ? 'bg-sky-blue text-white shadow-sm font-semibold'
                            : 'bg-neutral-50 hover:bg-neutral-100 text-neutral-500'
                        }`}
                      >
                        I Visited This!
                      </button>
                    </div>
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>
      )}

    </div>
  );
}
