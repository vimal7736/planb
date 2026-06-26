"use client";

import { useState, useEffect } from "react";
import { supabase, Service } from "@/lib/supabase";
import { Trash2, Plus, Save } from "lucide-react";

export default function AdminServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    const { data, error } = await supabase.from('services').select('*').order('display_order', { ascending: true });
    if (error) console.error("Error fetching services:", error);
    else if (data) setServices(data);
    setLoading(false);
  };

  const handleAdd = async () => {
    const newService = {
      title: 'New Service',
      description: 'Describe the new service here.',
      display_order: services.length + 1
    };
    
    const { data, error } = await supabase.from('services').insert(newService).select().single();
    if (error) alert("Error adding: " + error.message);
    else if (data) setServices([...services, data]);
  };

  const handleUpdate = async (id: string, field: keyof Service, value: string | number) => {
    // Optimistic update locally
    setServices(services.map(s => s.id === id ? { ...s, [field]: value } : s));
    
    const { error } = await supabase.from('services').update({ [field]: value }).eq('id', id);
    if (error) alert("Error saving: " + error.message);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this service?")) return;
    
    setServices(services.filter(s => s.id !== id));
    const { error } = await supabase.from('services').delete().eq('id', id);
    if (error) alert("Error deleting: " + error.message);
  };

  if (loading) return <div className="p-8">Loading services...</div>;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold font-serif text-gray-900 mb-2">Services Manager</h1>
          <p className="text-gray-500">Add, edit, or remove tattoo styles and services.</p>
        </div>
        <button 
          onClick={handleAdd}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
        >
          <Plus size={18} /> Add Service
        </button>
      </div>

      <div className="space-y-4">
        {services.length === 0 ? (
          <div className="bg-white p-8 text-center text-gray-500 rounded-xl shadow-sm border border-gray-100">
            No services found. Click "Add Service" to create one.
          </div>
        ) : (
          services.map((service) => (
            <div key={service.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex gap-6">
              <div className="flex-1 space-y-4">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Title</label>
                    <input 
                      type="text" 
                      className="w-full mt-1 border-b border-gray-200 focus:border-primary outline-none py-1 font-serif text-lg font-bold"
                      value={service.title}
                      onChange={(e) => setServices(services.map(s => s.id === service.id ? { ...s, title: e.target.value } : s))}
                      onBlur={(e) => handleUpdate(service.id, 'title', e.target.value)}
                    />
                  </div>
                  <div className="w-24">
                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Order</label>
                    <input 
                      type="number" 
                      className="w-full mt-1 border-b border-gray-200 focus:border-primary outline-none py-1 text-center"
                      value={service.display_order}
                      onChange={(e) => setServices(services.map(s => s.id === service.id ? { ...s, display_order: parseInt(e.target.value) || 0 } : s))}
                      onBlur={(e) => handleUpdate(service.id, 'display_order', parseInt(e.target.value) || 0)}
                    />
                  </div>
                </div>
                
                <div>
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Description</label>
                  <textarea 
                    className="w-full mt-1 border border-gray-200 focus:border-primary rounded-lg p-3 text-sm outline-none"
                    rows={2}
                    value={service.description}
                    onChange={(e) => setServices(services.map(s => s.id === service.id ? { ...s, description: e.target.value } : s))}
                    onBlur={(e) => handleUpdate(service.id, 'description', e.target.value)}
                  />
                </div>
              </div>
              
              <div className="flex flex-col justify-between items-end border-l border-gray-100 pl-6 w-32">
                <button 
                  onClick={() => handleDelete(service.id)}
                  className="text-red-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors"
                  title="Delete Service"
                >
                  <Trash2 size={20} />
                </button>
                <span className="text-xs text-gray-400 text-right">Auto-saves on blur</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
