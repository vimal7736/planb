"use client";

import { useState, useEffect, useRef } from "react";
import { supabase, Service } from "@/lib/supabase";
import { Trash2, Plus, Save, Upload, RefreshCw } from "lucide-react";
import Image from "next/image";

export default function AdminServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadingId, setUploadingId] = useState<string | null>(null);

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

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!uploadingId) return;
    try {
      if (!event.target.files || event.target.files.length === 0) return;
      
      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      
      // Upload to Storage
      const { error: uploadError } = await supabase.storage
        .from('portfolio')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // Get Public URL
      const { data: { publicUrl } } = supabase.storage
        .from('portfolio')
        .getPublicUrl(fileName);

      await handleUpdate(uploadingId, 'image_url', publicUrl);
      
    } catch (error: any) {
      alert('Error uploading image: ' + error.message);
    } finally {
      setUploadingId(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
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
      <input 
        type="file" 
        accept="image/*"
        className="hidden" 
        ref={fileInputRef}
        onChange={handleUpload}
      />
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
            <div key={service.id} className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 md:gap-6">
              {/* Image Upload Column */}
              <div className="w-full md:w-32 flex flex-col items-center justify-start gap-2">
                <div className="w-32 md:w-full aspect-[4/5] mx-auto md:mx-0 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 overflow-hidden relative group cursor-pointer hover:bg-gray-100 hover:border-gray-300 transition-colors" onClick={() => { setUploadingId(service.id); fileInputRef.current?.click(); }}>
                  {service.image_url ? (
                    <Image src={service.image_url} alt={service.title} fill className="object-cover" unoptimized />
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-gray-400 gap-2">
                      <Upload size={24} />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-center px-2">Upload Image</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button 
                      onClick={() => { setUploadingId(service.id); fileInputRef.current?.click(); }}
                      className="bg-white text-gray-900 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-widest flex items-center gap-1"
                      disabled={uploadingId === service.id}
                    >
                      {uploadingId === service.id ? <RefreshCw size={12} className="animate-spin" /> : <Upload size={12} />}
                      {uploadingId === service.id ? "..." : "Change"}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex-1 space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 w-full">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Title</label>
                    <input 
                      type="text" 
                      className="w-full border border-gray-200 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none p-3 font-serif text-lg font-bold bg-gray-50 focus:bg-white transition-colors"
                      value={service.title}
                      onChange={(e) => setServices(services.map(s => s.id === service.id ? { ...s, title: e.target.value } : s))}
                      onBlur={(e) => handleUpdate(service.id, 'title', e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-2 md:flex gap-4 w-full md:w-auto">
                    <div className="w-full md:w-32">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Price Text</label>
                      <input 
                        type="text" 
                        placeholder="e.g. From $200"
                        className="w-full border border-gray-200 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none p-3 text-sm bg-gray-50 focus:bg-white transition-colors"
                        value={service.price || ''}
                        onChange={(e) => setServices(services.map(s => s.id === service.id ? { ...s, price: e.target.value } : s))}
                        onBlur={(e) => handleUpdate(service.id, 'price', e.target.value)}
                      />
                    </div>
                    <div className="w-full md:w-24">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Badge</label>
                      <input 
                        type="text" 
                        placeholder="e.g. PRO"
                        className="w-full border border-gray-200 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none p-3 text-sm bg-gray-50 focus:bg-white transition-colors"
                        value={service.badge || ''}
                        onChange={(e) => setServices(services.map(s => s.id === service.id ? { ...s, badge: e.target.value } : s))}
                        onBlur={(e) => handleUpdate(service.id, 'badge', e.target.value)}
                      />
                    </div>
                    <div className="w-full md:w-20 col-span-2 md:col-span-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Order</label>
                      <input 
                        type="number" 
                        className="w-full border border-gray-200 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none p-3 text-sm bg-gray-50 focus:bg-white transition-colors text-center"
                        value={service.display_order}
                        onChange={(e) => setServices(services.map(s => s.id === service.id ? { ...s, display_order: parseInt(e.target.value) || 0 } : s))}
                        onBlur={(e) => handleUpdate(service.id, 'display_order', parseInt(e.target.value) || 0)}
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Description</label>
                  <textarea 
                    className="w-full border border-gray-200 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none p-3 text-sm bg-gray-50 focus:bg-white transition-colors"
                    rows={2}
                    value={service.description}
                    onChange={(e) => setServices(services.map(s => s.id === service.id ? { ...s, description: e.target.value } : s))}
                    onBlur={(e) => handleUpdate(service.id, 'description', e.target.value)}
                  />
                </div>
              </div>
              
              <div className="flex md:flex-col justify-between items-end border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 pl-0 md:pl-6 w-full md:w-32">
                <span className="text-xs text-gray-400">Auto-saves on blur</span>
                <button 
                  onClick={() => handleDelete(service.id)}
                  className="text-red-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors"
                  title="Delete Service"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
