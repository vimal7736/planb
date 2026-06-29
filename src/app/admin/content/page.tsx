"use client";

import { useState, useEffect } from "react";
import { supabase, SiteContent } from "@/lib/supabase";

export default function AdminContent() {
  const [content, setContent] = useState<Record<string, string>>({});
  const [localContent, setLocalContent] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    const { data, error } = await supabase.from('site_content').select('*');
    if (error) {
      console.error("Error fetching content:", error);
    } else if (data) {
      const contentMap: Record<string, string> = {};
      data.forEach((item: SiteContent) => {
        contentMap[item.id] = item.content;
      });
      setContent(contentMap);
      setLocalContent(contentMap);
    }
    setLoading(false);
  };

  const handleChange = (id: string, value: string) => {
    setLocalContent(prev => ({ ...prev, [id]: value }));
    setHasChanges(true);
  };

  const handleSaveAll = async () => {
    setSaving(true);
    
    const updates = Object.keys(localContent).map(id => ({
      id,
      content: localContent[id],
      updated_at: new Date().toISOString()
    }));

    const { error } = await supabase.from('site_content').upsert(updates);
      
    if (error) {
      alert("Error saving: " + error.message);
    } else {
      setContent(localContent);
      setHasChanges(false);
    }
    
    setSaving(false);
  };

  if (loading) return <div className="p-8 text-xs text-[#6B7A50]">Loading content editor...</div>;

  return (
    <div className="space-y-4 pb-24">
      <div className="flex justify-between items-end mb-4">
        <div>
          <h1 className="text-xl font-bold font-serif text-[#2C331F] mb-0.5">Site Content Editor</h1>
          <p className="text-[10px] text-[#6B7A50]">Update the text that appears on your public website.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* HERO SECTION */}
        <div className="bg-[#F0F2DF]/50 p-4 rounded-lg border border-[#E2E6CC] space-y-3 backdrop-blur-sm shadow-sm">
          <h2 className="text-xs font-bold font-serif text-[#4A5D33] uppercase tracking-widest border-b border-[#E2E6CC] pb-1.5 mb-3">Hero Section</h2>
          
          <div className="space-y-1">
            <label className="text-[9px] font-bold text-[#6B7A50] uppercase tracking-wider">Main Heading</label>
            <textarea 
              className="w-full bg-[#FCFDF7] border border-[#E2E6CC] rounded-lg p-3 text-sm text-[#2C331F] focus:border-[#5C6B40] focus:ring-1 focus:ring-[#5C6B40] outline-none transition-all shadow-inner"
              rows={3}
              value={localContent['hero_heading'] || ''}
              onChange={(e) => handleChange('hero_heading', e.target.value)}
            />
          </div>

          <div className="space-y-1">
            <label className="text-[9px] font-bold text-[#6B7A50] uppercase tracking-wider">Subheading</label>
            <input 
              type="text"
              className="w-full bg-[#FCFDF7] border border-[#E2E6CC] rounded-lg p-3 text-sm text-[#2C331F] focus:border-[#5C6B40] focus:ring-1 focus:ring-[#5C6B40] outline-none transition-all shadow-inner"
              value={localContent['hero_subheading'] || ''}
              onChange={(e) => handleChange('hero_subheading', e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div className="space-y-1">
              <label className="text-[9px] font-bold text-[#6B7A50] uppercase tracking-wider">Primary Btn</label>
              <input 
                type="text"
                className="w-full bg-[#FCFDF7] border border-[#E2E6CC] rounded-lg p-3 text-sm text-[#2C331F] focus:border-[#5C6B40] focus:ring-1 focus:ring-[#5C6B40] outline-none transition-all shadow-inner"
                value={localContent['hero_btn_primary'] || ''}
                onChange={(e) => handleChange('hero_btn_primary', e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <label className="text-[9px] font-bold text-[#6B7A50] uppercase tracking-wider">Secondary Btn</label>
              <input 
                type="text"
                className="w-full bg-[#FCFDF7] border border-[#E2E6CC] rounded-lg p-3 text-sm text-[#2C331F] focus:border-[#5C6B40] focus:ring-1 focus:ring-[#5C6B40] outline-none transition-all shadow-inner"
                value={localContent['hero_btn_secondary'] || ''}
                onChange={(e) => handleChange('hero_btn_secondary', e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div className="space-y-1">
              <label className="text-[9px] font-bold text-[#6B7A50] uppercase tracking-wider">Tertiary Btn</label>
              <input 
                type="text"
                className="w-full bg-[#FCFDF7] border border-[#E2E6CC] rounded-lg p-3 text-sm text-[#2C331F] focus:border-[#5C6B40] focus:ring-1 focus:ring-[#5C6B40] outline-none transition-all shadow-inner"
                value={localContent['hero_btn_tertiary'] || ''}
                onChange={(e) => handleChange('hero_btn_tertiary', e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <label className="text-[9px] font-bold text-[#6B7A50] uppercase tracking-wider">Circular Text</label>
              <input 
                type="text"
                className="w-full bg-[#FCFDF7] border border-[#E2E6CC] rounded-lg p-3 text-sm text-[#2C331F] focus:border-[#5C6B40] focus:ring-1 focus:ring-[#5C6B40] outline-none transition-all shadow-inner"
                value={localContent['hero_circular_text'] || ''}
                onChange={(e) => handleChange('hero_circular_text', e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {/* OFFERS BANNER */}
          <div className="bg-[#F0F2DF]/50 p-4 rounded-lg border border-[#E2E6CC] space-y-3 backdrop-blur-sm shadow-sm">
            <h2 className="text-xs font-bold font-serif text-[#4A5D33] uppercase tracking-widest border-b border-[#E2E6CC] pb-1.5 mb-3">Offers Banner</h2>
            
            <div className="space-y-1">
              <label className="text-[9px] font-bold text-[#6B7A50] uppercase tracking-wider">Offer Title</label>
              <input 
                type="text"
                className="w-full bg-[#FCFDF7] border border-[#E2E6CC] rounded-lg p-3 text-sm text-[#2C331F] focus:border-[#5C6B40] focus:ring-1 focus:ring-[#5C6B40] outline-none transition-all shadow-inner"
                value={localContent['offer_title'] || ''}
                onChange={(e) => handleChange('offer_title', e.target.value)}
              />
            </div>
            
            <div className="space-y-1">
              <label className="text-[9px] font-bold text-[#6B7A50] uppercase tracking-wider">Offer Description</label>
              <input 
                type="text"
                className="w-full bg-[#FCFDF7] border border-[#E2E6CC] rounded-lg p-3 text-sm text-[#2C331F] focus:border-[#5C6B40] focus:ring-1 focus:ring-[#5C6B40] outline-none transition-all shadow-inner"
                value={localContent['offer_description'] || ''}
                onChange={(e) => handleChange('offer_description', e.target.value)}
              />
            </div>
            
            <div className="space-y-1">
              <label className="text-[9px] font-bold text-[#6B7A50] uppercase tracking-wider">Button Text</label>
              <input 
                type="text"
                className="w-full bg-[#FCFDF7] border border-[#E2E6CC] rounded-lg p-3 text-sm text-[#2C331F] focus:border-[#5C6B40] focus:ring-1 focus:ring-[#5C6B40] outline-none transition-all shadow-inner"
                value={localContent['offer_btn_text'] || ''}
                onChange={(e) => handleChange('offer_btn_text', e.target.value)}
              />
            </div>
          </div>

          {/* ABOUT SECTION */}
          <div className="bg-[#F0F2DF]/50 p-4 rounded-lg border border-[#E2E6CC] space-y-3 backdrop-blur-sm shadow-sm">
            <h2 className="text-xs font-bold font-serif text-[#4A5D33] uppercase tracking-widest border-b border-[#E2E6CC] pb-1.5 mb-3">About Section</h2>
            
            <div className="space-y-1">
              <label className="text-[9px] font-bold text-[#6B7A50] uppercase tracking-wider">Studio Philosophy</label>
              <textarea 
                className="w-full bg-[#FCFDF7] border border-[#E2E6CC] rounded-lg p-3 text-sm text-[#2C331F] focus:border-[#5C6B40] focus:ring-1 focus:ring-[#5C6B40] outline-none transition-all shadow-inner"
                rows={3}
                value={localContent['about_philosophy'] || ''}
                onChange={(e) => handleChange('about_philosophy', e.target.value)}
              />
            </div>
            
            <div className="space-y-1">
              <label className="text-[9px] font-bold text-[#6B7A50] uppercase tracking-wider">Meet the Artist</label>
              <textarea 
                className="w-full bg-[#FCFDF7] border border-[#E2E6CC] rounded-lg p-3 text-sm text-[#2C331F] focus:border-[#5C6B40] focus:ring-1 focus:ring-[#5C6B40] outline-none transition-all shadow-inner"
                rows={3}
                value={localContent['about_artist'] || ''}
                onChange={(e) => handleChange('about_artist', e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Sticky Save Bar */}
      {hasChanges && (
        <div className="fixed bottom-6 right-6 z-50">
          <div className="bg-[#4A5D33] border border-[#5C6B40] p-2.5 rounded-lg shadow-2xl flex items-center gap-3 animate-in slide-in-from-bottom-5">
            <span className="text-[10px] text-[#F0F2DF] font-medium ml-2 uppercase tracking-widest">Unsaved changes</span>
            <button
              onClick={handleSaveAll}
              disabled={saving}
              className="bg-[#FCFDF7] text-[#2C331F] hover:bg-[#E2E6CC] px-4 py-2 rounded-md text-[10px] font-bold uppercase tracking-widest transition-all disabled:opacity-50 flex items-center gap-1.5 shadow-sm"
            >
              {saving ? 'Saving...' : 'Save All'}
              {!saving && (
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
