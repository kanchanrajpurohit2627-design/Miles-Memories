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
            <div className="bg-sky-blue p-2 rounded-xl text-white shadow-md shadow-sky-blue/20 transition-all group-hover:scale-105">
              <Camera className="w-5 h-5 md:w-6 h-6 stroke-[2]" />
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
