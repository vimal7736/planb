"use client";

import { useState, useEffect, useRef } from "react";
import { supabase, PortfolioImage } from "@/lib/supabase";
import { Trash2, Upload, RefreshCw } from "lucide-react";
import Image from "next/image";

export default function AdminPortfolio() {
  const [images, setImages] = useState<PortfolioImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [uploadCategory, setUploadCategory] = useState("Fine Line");

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('portfolio_images')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (error) console.error("Error fetching images:", error);
    else if (data) setImages(data);
    setLoading(false);
  };

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.');
      }
      
      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      // 1. Upload to Storage
      const { error: uploadError } = await supabase.storage
        .from('portfolio')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // 2. Get Public URL
      const { data: { publicUrl } } = supabase.storage
        .from('portfolio')
        .getPublicUrl(filePath);

      // 3. Save to database
      const { data: insertData, error: insertError } = await supabase
        .from('portfolio_images')
        .insert({
          image_url: publicUrl,
          category: uploadCategory,
          alt_text: `Tattoo - ${uploadCategory}`
        })
        .select()
        .single();

      if (insertError) throw insertError;
      
      if (insertData) {
        setImages([insertData, ...images]);
      }
      
    } catch (error: any) {
      alert('Error uploading image: ' + error.message);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = ""; // Reset input
    }
  };

  const handleDelete = async (image: PortfolioImage) => {
    if (!confirm("Are you sure you want to delete this image?")) return;
    
    // Extract filename from URL (basic implementation, assumes standard Supabase URL format)
    const urlParts = image.image_url.split('/');
    const fileName = urlParts[urlParts.length - 1];

    // Optimistic delete
    setImages(images.filter(img => img.id !== image.id));

    // 1. Delete from database
    const { error: dbError } = await supabase.from('portfolio_images').delete().eq('id', image.id);
    if (dbError) alert("Error deleting from database: " + dbError.message);

    // 2. Delete from storage
    if (fileName) {
      const { error: storageError } = await supabase.storage.from('portfolio').remove([fileName]);
      if (storageError) console.error("Error removing file from storage:", storageError);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-[#F0F2DF]/50 p-4 rounded-lg border border-[#E2E6CC] backdrop-blur-sm shadow-sm">
        <div>
          <h1 className="text-xl font-bold font-serif text-[#2C331F] mb-0.5">Portfolio Manager</h1>
          <p className="text-[10px] text-[#6B7A50]">Manage images for your public gallery.</p>
        </div>
        
        <div className="flex w-full md:w-auto gap-2">
          <select 
            value={uploadCategory} 
            onChange={(e) => setUploadCategory(e.target.value)}
            className="px-3 py-2 bg-[#FCFDF7] border border-[#E2E6CC] rounded-md text-[10px] font-bold text-[#4A5D33] uppercase tracking-widest outline-none focus:border-[#5C6B40]"
            disabled={uploading}
          >
            <option value="Fine Line">Fine Line</option>
            <option value="Geometric">Geometric</option>
            <option value="Realism">Realism</option>
            <option value="Minimalist">Minimalist</option>
          </select>
          <input 
            type="file" 
            accept="image/*"
            className="hidden" 
            ref={fileInputRef}
            onChange={handleUpload}
            disabled={uploading}
          />
          <button 
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="flex items-center gap-1.5 px-4 py-2 bg-[#4A5D33] text-[#F9FAEC] rounded-md hover:bg-[#5C6B40] transition-colors font-bold uppercase tracking-widest text-[10px] shadow-sm disabled:opacity-50"
          >
            {uploading ? <RefreshCw className="animate-spin" size={14} /> : <Upload size={14} />}
            {uploading ? "Uploading..." : "Upload"}
          </button>
        </div>
      </div>

      {loading ? (
        <div className="p-8 text-center text-xs text-[#6B7A50]">Loading gallery...</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {images.map((img) => (
            <div key={img.id} className="relative group aspect-[4/5] bg-[#F0F2DF] rounded-md overflow-hidden shadow-sm border border-[#E2E6CC]">
              <Image 
                src={img.image_url} 
                alt={img.alt_text || 'Portfolio image'} 
                fill 
                className="object-cover"
                unoptimized
              />
              
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-[#2C331F]/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2">
                <div className="flex justify-end">
                  <button 
                    onClick={() => handleDelete(img)}
                    className="p-1.5 bg-[#FCFDF7]/10 hover:bg-red-500/80 text-[#FCFDF7] rounded-sm backdrop-blur-md transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
                <div className="text-[#F0F2DF] text-[9px] font-bold tracking-wider uppercase">
                  {new Date(img.created_at).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
          
          {images.length === 0 && (
            <div className="col-span-full bg-[#FCFDF7] p-8 text-center text-[#6B7A50] rounded-lg border border-dashed border-[#E2E6CC]">
              <div className="flex flex-col items-center justify-center gap-2">
                <ImageIcon className="text-[#E2E6CC]" size={32} />
                <p className="text-xs">No images uploaded yet.</p>
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="text-[#4A5D33] hover:underline font-bold text-[10px] uppercase tracking-widest mt-1"
                >
                  Upload your first image
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Just for the empty state icon
function ImageIcon(props: any) {
  return (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
  );
}
