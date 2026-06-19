/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Camera, Compass, Map, BookOpen, Layers, User, Mail, Sun, Moon } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
}

export default function Navbar({ activeTab, setActiveTab, darkMode, setDarkMode }: NavbarProps) {
  const menuItems = [
    { id: 'home', label: 'Home', icon: Compass },
    { id: 'destinations', label: 'Destinations', icon: Map },
    { id: 'blog', label: 'Travel Blog', icon: BookOpen },
    { id: 'resources', label: 'Trip Planner', icon: Layers },
    { id: 'about', label: 'About Me', icon: User },
    { id: 'contact', label: 'Contact', icon: Mail }
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-neutral-100 shadow-sm" id="main-navigation-navbar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          
          {/* Logo */}
          <div 
            onClick={() => setActiveTab('home')} 
            className="flex items-center gap-2 cursor-pointer group"
            id="navbar-branding-logo"
          >
            <div className="bg-sky-blue p-2 rounded-xl text-white shadow-md shadow-sky-blue/20 transition-all group-hover:scale-105 flex items-center justify-center">
              <svg 
                viewBox="0 0 100 100" 
                className="w-5 h-5 md:w-6 h-6 fill-current" 
                id="branding-airplane-logo-svg"
              >
                {/* Loop trail */}
                <path 
                  d="M 32,29 C 14,41 12,71 29,86 C 46,101 76,99 87,79 C 97,59 87,38 72,28 C 68,26 63,25 58,25 C 64,28 68,31 71,36 C 79,48 78,66 69,76 C 59,86 42,86 31,76 C 24,68 23,55 28,45 C 31,40 35,36 39,33 Z"
                  className="opacity-90"
                />
                {/* Sleek jet plane */}
                <g transform="translate(61, 25) rotate(45)">
                  <path d="M 0,-14 C 0.8,-11 1.5,-7 1.5,-3 L 15,3 C 15,4 14,4.8 13.2,4.8 L 1.5,3 L 1.5,8.8 L 5,11.5 C 5,12 4.4,12.5 3.5,12.5 L 0,11 L -3.5,12.5 C -4.4,12.5 -5,12 -5,11.5 L -1.5,8.8 L -1.5,3 L -13.2,4.8 C -14,4.8 -15,4 -15,3 L -1.5,-3 C -1.5,-7 -0.8,-11 0,-14 Z" />
                </g>
              </svg>
            </div>
            <div>
              <span className="font-serif text-lg md:text-2xl font-bold tracking-tight text-dark-gray block">
                Miles & Memories
              </span>
              <span className="text-[10px] md:text-xs text-sky-blue font-mono tracking-wider block uppercase -mt-1 font-semibold">
                Travel Blog
              </span>
            </div>
          </div>

          {/* Desktop Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 ${
                    isActive 
                      ? 'bg-sky-blue/10 text-sky-blue font-semibold scale-95' 
                      : 'text-neutral-600 hover:bg-neutral-50 hover:text-dark-gray'
                  }`}
                  id={`nav-link-${item.id}`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-sky-blue' : 'text-neutral-400'}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Optional Premium Features Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-xl text-neutral-400 hover:text-dark-gray hover:bg-neutral-50 transition-all hidden sm:block border border-neutral-200"
              title="Toggle Travel Ambient Vibe"
              id="theme-toggle-navbar"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4" />}
            </button>
            
            <button
              onClick={() => setActiveTab('resources')}
              className="bg-sky-blue hover:bg-sky-blue/90 text-white font-medium text-xs px-4 py-2.5 rounded-xl shadow-md shadow-sky-blue/10 transition-all hover:-translate-y-0.5 active:translate-y-0"
              id="navbar-cta-planner-btn"
            >
              Start Planning
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Sticky Tab Navigation */}
      <div className="lg:hidden border-t border-neutral-100 grid grid-cols-6 bg-white py-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className="flex flex-col items-center justify-center p-2 rounded-lg transition-all"
              id={`mobile-nav-link-${item.id}`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-sky-blue' : 'text-neutral-400'}`} />
              <span className={`text-[9px] mt-1 truncate ${isActive ? 'text-sky-blue font-semibold' : 'text-neutral-500'}`}>
                {item.label.split(' ')[0]}
              </span>
            </button>
          );
        })}
      </div>
    </header>
  );
}
