/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Comment {
  id: string;
  author: string;
  avatar?: string;
  content: string;
  date: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  date: string;
  category: 'Adventure' | 'Budget Travel' | 'Solo Travel' | 'Family Travel' | 'International Travel' | 'Travel Photography';
  image: string;
  reads: number;
  comments: Comment[];
}

export interface Destination {
  id: string;
  name: string;
  continent: 'North America' | 'South America' | 'Europe' | 'Asia' | 'Africa' | 'Oceania';
  country: string;
  overview: string;
  bestTime: string;
  budgetGuide: string;
  thingsToDo: string[];
  foodRecommendations: string[];
  travelTips: string[];
  photos: string[];
  coordinates: { x: number; y: number }; // Percentage offsets for clean SVG map placing
  status: 'visited' | 'wishlist' | 'featured';
}

export interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
  category: 'Essentials' | 'Clothing' | 'Electronics' | 'Documents' | 'Toiletries';
}

export interface BudgetItem {
  id: string;
  category: 'Accommodation' | 'Flights' | 'Food & Drinks' | 'Activities' | 'Local Transport' | 'Insurance / Miscellaneous';
  cost: number;
  notes: string;
}

export interface PhotoAsset {
  id: string;
  url: string;
  title: string;
  location: string;
  category: string;
}
