/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ChecklistItem, BudgetItem } from '../types';
import { Layers, CheckSquare, Plus, Trash2, DollarSign, AlertCircle, Phone, BookOpen, Compass, ClipboardList, TrendingUp } from 'lucide-react';
import { TRAVEL_APPS, VISA_RESOURCES, SAFETY_TIPS } from '../data';

interface TravelResourcesProps {
  checklist: ChecklistItem[];
  setChecklist: React.Dispatch<React.SetStateAction<ChecklistItem[]>>;
  budget: BudgetItem[];
  setBudget: React.Dispatch<React.SetStateAction<BudgetItem[]>>;
}

export default function TravelResources({
  checklist,
  setChecklist,
  budget,
  setBudget,
}: TravelResourcesProps) {
  const [activeSection, setActiveSection] = useState<'checklist' | 'budget' | 'apps' | 'visa' | 'safety'>('checklist');

  // Checklist States
  const [newChecklistText, setNewChecklistText] = useState('');
  const [newChecklistCategory, setNewChecklistCategory] = useState<'Essentials' | 'Clothing' | 'Electronics' | 'Documents' | 'Toiletries'>('Essentials');

  // Budget States
  const [newBudgetCategory, setNewBudgetCategory] = useState<'Accommodation' | 'Flights' | 'Food & Drinks' | 'Activities' | 'Local Transport' | 'Insurance / Miscellaneous'>('Accommodation');
  const [newBudgetCost, setNewBudgetCost] = useState<number | ''>('');
  const [newBudgetNotes, setNewBudgetNotes] = useState('');

  // Toggle Checklist
  const handleToggleChecklist = (id: string) => {
    setChecklist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item))
    );
  };

  // Add Checklist Item
  const handleAddChecklistItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChecklistText.trim()) return;

    const newItem: ChecklistItem = {
      id: `check-${Date.now()}`,
      text: newChecklistText.trim(),
      completed: false,
      category: newChecklistCategory,
    };

    setChecklist((prev) => [...prev, newItem]);
    setNewChecklistText('');
  };

  // Delete Checklist Item
  const handleDeleteChecklistItem = (id: string) => {
    setChecklist((prev) => prev.filter((item) => item.id !== id));
  };

  // Add Budget Item
  const handleAddBudgetItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBudgetCost || isNaN(newBudgetCost) || newBudgetCost <= 0) return;

    const newItem: BudgetItem = {
      id: `bud-${Date.now()}`,
      category: newBudgetCategory,
      cost: Number(newBudgetCost),
      notes: newBudgetNotes.trim() || `${newBudgetCategory} expense`,
    };

    setBudget((prev) => [...prev, newItem]);
    setNewBudgetCost('');
    setNewBudgetNotes('');
  };

  // Delete Budget Item
  const handleDeleteBudgetItem = (id: string) => {
    setBudget((prev) => prev.filter((item) => item.id !== id));
  };

  // Calculations
  const completedCount = checklist.filter((x) => x.completed).length;
  const totalChecklistCount = checklist.length;
  const progressPercent = totalChecklistCount === 0 ? 0 : Math.round((completedCount / totalChecklistCount) * 100);

  const totalCost = budget.reduce((sum, item) => sum + item.cost, 0);

  return (
    <div className="grid lg:grid-cols-12 gap-8" id="travel-resources-main-root">
      
      {/* Left Sidebar Menu */}
      <div className="lg:col-span-3 space-y-4">
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-neutral-100">
          <div className="p-3 mb-2">
            <span className="text-[10px] font-mono text-sky-blue uppercase tracking-widest block font-bold">Planning Desk</span>
            <h3 className="font-serif text-lg font-bold text-dark-gray mt-1">Traveler Toolkit</h3>
          </div>

          <div className="space-y-1.5">
            {[
              { id: 'checklist', label: 'Packing Checklist', icon: ClipboardList },
              { id: 'budget', label: 'Trip Cost Planner', icon: TrendingUp },
              { id: 'apps', label: 'Recommended Apps', icon: Compass },
              { id: 'visa', label: 'Visa Resources', icon: BookOpen },
              { id: 'safety', label: 'Safety Guidelines', icon: AlertCircle },
            ].map((section) => {
              const Icon = section.icon;
              const isSelected = activeSection === section.id;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id as any)}
                  className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs font-semibold transition-all ${
                    isSelected
                      ? 'bg-sky-blue text-white shadow-sm shadow-sky-blue/10 scale-[0.98]'
                      : 'text-neutral-600 hover:bg-neutral-50 hover:text-dark-gray'
                  }`}
                  id={`btn-resource-menu-${section.id}`}
                >
                  <Icon className="w-4.5 h-4.5" />
                  {section.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Widget with Quick Metrics */}
        <div className="bg-dark-gray text-white p-5 rounded-2xl shadow-sm border border-neutral-800 relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-28 h-28 bg-sky-blue/10 rounded-full"></div>
          <div className="relative z-10 space-y-4">
            <h4 className="font-serif text-sm font-bold text-sand-beige">Quick Summary</h4>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-neutral-300">
                <span>Checklist Completion:</span>
                <span className="font-mono text-sky-blue font-bold">{progressPercent}%</span>
              </div>
              <div className="flex justify-between text-neutral-300">
                <span>Planned Expenses:</span>
                <span className="font-mono text-emerald-400 font-bold">${totalCost.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Content Sheet */}
      <div className="lg:col-span-9 space-y-6">
        
        {/* Checklists Panel */}
        {activeSection === 'checklist' && (
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-neutral-100" id="resource-checklist-pane">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-serif text-dark-gray font-bold">Interactive Packing Checklists</h2>
                <p className="text-neutral-550 text-xs mt-1">
                  Ensure you don&apos;t leave vital items behind. Customize Categories and check them off dynamically.
                </p>
              </div>

              {/* Progress visual */}
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <span className="text-xs font-mono text-neutral-400 uppercase">Completed</span>
                  <div className="text-xs font-bold text-dark-gray">{completedCount}/{totalChecklistCount} Items</div>
                </div>
                <div className="w-16 h-16 rounded-full border-4 border-neutral-100 flex items-center justify-center relative">
                  <div className="text-xs font-bold font-mono text-sky-blue">{progressPercent}%</div>
                </div>
              </div>
            </div>

            {/* Progress Slider */}
            <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden mb-6">
              <div
                className="h-full bg-sky-blue transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>

            {/* Packing checklist items lists sorted by categories */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {['Essentials', 'Clothing', 'Electronics', 'Documents', 'Toiletries'].map((cat) => {
                const categoryItems = checklist.filter((item) => item.category === cat);
                return (
                  <div key={cat} className="space-y-2.5">
                    <h3 className="font-serif text-sm font-bold text-neutral-400 uppercase tracking-widest border-b border-neutral-100 pb-1.5 flex justify-between">
                      {cat} <span>({categoryItems.length})</span>
                    </h3>
                    <div className="space-y-1.5">
                      {categoryItems.map((item) => (
                        <div
                          key={item.id}
                          className={`flex items-center justify-between p-2.5 rounded-xl border text-xs transition-colors ${
                            item.completed
                              ? 'bg-neutral-50/50 border-neutral-150 text-neutral-450 line-through'
                              : 'bg-white border-neutral-200/80 hover:bg-neutral-50 text-dark-gray'
                          }`}
                        >
                          <label className="flex items-center gap-2 cursor-pointer w-full select-none">
                            <input
                              type="checkbox"
                              checked={item.completed}
                              onChange={() => handleToggleChecklist(item.id)}
                              className="rounded text-sky-blue focus:ring-sky-blue"
                            />
                            <span className="leading-tight">{item.text}</span>
                          </label>
                          <button
                            onClick={() => handleDeleteChecklistItem(item.id)}
                            className="text-neutral-400 hover:text-red-500 p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                      {categoryItems.length === 0 && (
                        <p className="text-xs text-neutral-400 italic py-1">No items under {cat}.</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Add Custom Item form inline */}
            <form onSubmit={handleAddChecklistItem} className="bg-neutral-50 p-4 rounded-xl border border-neutral-200/60 grid sm:grid-cols-12 gap-3" id="form-add-checklist-item">
              <div className="sm:col-span-6">
                <input
                  type="text"
                  placeholder="Add custom item, e.g., Spare sunglasses..."
                  value={newChecklistText}
                  onChange={(e) => setNewChecklistText(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-neutral-200 rounded-lg text-xs"
                  required
                />
              </div>
              <div className="sm:col-span-4">
                <select
                  value={newChecklistCategory}
                  onChange={(e: any) => setNewChecklistCategory(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-neutral-200 rounded-lg text-xs font-semibold text-neutral-600"
                >
                  <option value="Essentials">Essentials</option>
                  <option value="Clothing">Clothing</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Documents">Documents</option>
                  <option value="Toiletries">Toiletries</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <button
                  type="submit"
                  className="w-full bg-sky-blue text-white font-medium text-xs py-2 rounded-lg hover:bg-sky-blue/90 flex items-center justify-center gap-1"
                >
                  <Plus className="w-4 h-4" /> Add
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Budget Expenses Planner */}
        {activeSection === 'budget' && (
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-neutral-100" id="resource-budget-pane">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-serif text-dark-gray font-bold">Trip Expense Calculator & Cost Planner</h2>
                <p className="text-neutral-550 text-xs mt-1">
                  Budget your upcoming excursions. Keep tabs on allocations across lodging, transit, activities, and food.
                </p>
              </div>

              <div className="bg-emerald-500/10 text-emerald-600 px-4 py-2.5 rounded-xl border border-emerald-500/20 text-right">
                <span className="text-[10px] uppercase font-mono tracking-wider block">Estimated Total Cost</span>
                <span className="text-xl font-serif font-bold text-emerald-700">${totalCost.toLocaleString()}</span>
              </div>
            </div>

            {/* Allocation proportional bar */}
            <div className="mb-6">
              <span className="text-[10px] uppercase font-mono text-neutral-400 tracking-wider block mb-2">Cost Distribution visualizer</span>
              <div className="w-full h-3 bg-neutral-100 rounded-full flex overflow-hidden">
                {budget.map((item, idx) => {
                  const percent = totalCost === 0 ? 0 : (item.cost / totalCost) * 100;
                  const colors = ['bg-[#4DA8DA]', 'bg-[#F4E1C1]', 'bg-[#E28743]', 'bg-emerald-500', 'bg-purple-500', 'bg-neutral-550'];
                  return (
                    <div
                      key={item.id}
                      className={`h-full ${colors[idx % colors.length]}`}
                      style={{ width: `${percent}%` }}
                      title={`${item.category}: $${item.cost} (${Math.round(percent)}%)`}
                    ></div>
                  );
                })}
              </div>
            </div>

            {/* List and add form */}
            <div className="space-y-4 mb-8">
              {budget.map((item, idx) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3 bg-neutral-50/50 hover:bg-neutral-50 rounded-xl border border-neutral-150 text-xs"
                >
                  <div className="flex items-start gap-4">
                    <div className="h-6 w-6 rounded-full bg-sky-blue/15 flex items-center justify-center font-bold font-serif text-sky-blue text-xs font-bold leading-none">
                      {idx + 1}
                    </div>
                    <div>
                      <span className="font-bold text-dark-gray block">{item.category}</span>
                      <span className="text-[10px] text-neutral-400 block mt-0.5">{item.notes}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="font-mono font-bold text-neutral-700 font-bold">${item.cost.toLocaleString()}</span>
                    <button
                      onClick={() => handleDeleteBudgetItem(item.id)}
                      className="text-neutral-400 hover:text-red-500 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
              {budget.length === 0 && (
                <p className="text-xs text-neutral-400 italic text-center py-6">Your budget is empty. Start adding trip items below!</p>
              )}
            </div>

            {/* Add Custom Budget Entry form */}
            <form onSubmit={handleAddBudgetItem} className="bg-neutral-50 p-4 rounded-xl border border-neutral-200/60 space-y-4" id="form-add-budget-entry">
              <div className="text-xs font-semibold text-neutral-500 uppercase tracking-widest mb-1">Add Expense Log</div>
              <div className="grid sm:grid-cols-12 gap-3">
                <div className="sm:col-span-4">
                  <select
                    value={newBudgetCategory}
                    onChange={(e: any) => setNewBudgetCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-neutral-200 rounded-lg text-xs"
                  >
                    <option value="Accommodation">Accommodation</option>
                    <option value="Flights">Flights</option>
                    <option value="Food & Drinks">Food & Drinks</option>
                    <option value="Activities">Activities</option>
                    <option value="Local Transport">Local Transport</option>
                    <option value="Insurance / Miscellaneous">Insurance / Miscellaneous</option>
                  </select>
                </div>
                <div className="sm:col-span-3 relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 text-xs">$</span>
                  <input
                    type="number"
                    placeholder="Cost (e.g. 150)"
                    value={newBudgetCost}
                    onChange={(e) => setNewBudgetCost(e.target.value === '' ? '' : Number(e.target.value))}
                    required
                    className="w-full pl-6 pr-3 py-2 bg-white border border-neutral-200 rounded-lg text-xs"
                  />
                </div>
                <div className="sm:col-span-5">
                  <input
                    type="text"
                    placeholder="Brief notes, e.g., Hostels, bus pass..."
                    value={newBudgetNotes}
                    onChange={(e) => setNewBudgetNotes(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-neutral-200 rounded-lg text-xs"
                  />
                </div>
              </div>
              <div className="flex justify-end pt-1">
                <button
                  type="submit"
                  className="bg-emerald-600 text-white hover:bg-emerald-500 font-semibold text-xs px-4 py-2 rounded-lg flex items-center gap-1 shadow-sm"
                >
                  <DollarSign className="w-4 h-4" /> Log Expense
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Travel Apps Recommendations list */}
        {activeSection === 'apps' && (
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-neutral-100" id="resource-apps-pane">
            <h2 className="text-2xl font-serif text-dark-gray font-bold mb-1">Recommended Travel Companion Apps</h2>
            <p className="text-neutral-550 text-xs mb-6">Our essential list of modern tools that eliminate travel friction, save money, and assist offline navigation.</p>

            <div className="grid md:grid-cols-2 gap-4">
              {TRAVEL_APPS.map((app, idx) => (
                <div key={idx} className="bg-neutral-50 p-4 rounded-xl border border-neutral-150 text-xs space-y-1.5 hover:border-sky-blue/30 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-dark-gray text-sm">{app.name}</span>
                    <span className="text-[9px] bg-sky-blue/10 text-sky-blue font-mono font-semibold px-2 py-0.5 rounded-full">{app.category}</span>
                  </div>
                  <p className="text-neutral-500 leading-normal">{app.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Visa Resources list */}
        {activeSection === 'visa' && (
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-neutral-100" id="resource-visa-pane">
            <h2 className="text-2xl font-serif text-dark-gray font-bold mb-1">Visa Processing Matrix & Resources</h2>
            <p className="text-neutral-550 text-xs mb-6">A quick guide for visa standards across top destinations. Always verify specific paperwork prior to departures.</p>

            <div className="space-y-4">
              {VISA_RESOURCES.map((visa, idx) => (
                <div key={idx} className="p-4 bg-neutral-50/50 rounded-xl border border-neutral-150 hover:bg-neutral-50 transition-colors">
                  <h3 className="font-serif font-bold text-dark-gray text-base shrink-0 border-b border-neutral-200/50 pb-1.5 mb-2 flex items-center gap-2">
                    <span className="h-5 w-5 rounded-full bg-sky-blue/10 flex items-center justify-center font-serif text-sky-blue text-xs font-bold">{idx + 1}</span>
                    {visa.country}
                  </h3>
                  <p className="text-xs text-neutral-500 leading-relaxed pl-7">{visa.info}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Safety Guidelines with urgent details */}
        {activeSection === 'safety' && (
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-neutral-100" id="resource-safety-pane">
            <h2 className="text-2xl font-serif text-dark-gray font-bold mb-1">Authentic Travel Safety Guild</h2>
            <p className="text-neutral-550 text-xs mb-6">Expert safeguards, digital tools, and physical defense tips to make certain your excursions are peaceful and robust.</p>

            <div className="grid sm:grid-cols-2 gap-4">
              {SAFETY_TIPS.map((tip, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-neutral-150 bg-neutral-50 hover:bg-neutral-100/50 transition-colors space-y-2">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-sky-blue" />
                    <span className="font-bold text-dark-gray text-sm leading-tight">{tip.title}</span>
                  </div>
                  <p className="text-xs text-neutral-500 leading-relaxed">{tip.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
