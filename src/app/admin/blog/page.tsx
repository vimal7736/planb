"use client";

import { useState, useEffect, useRef } from "react";
import { supabase, Article } from "@/lib/supabase";
import { Trash2, Upload, RefreshCw, Plus, Save, X } from "lucide-react";
import Image from "next/image";

export default function AdminBlog() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form State
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Guide");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (error) console.error("Error fetching articles:", error);
    else if (data) setArticles(data);
    setLoading(false);
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      if (!event.target.files || event.target.files.length === 0) return;
      
      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage.from('articles').upload(fileName, file);
      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage.from('articles').getPublicUrl(fileName);
      setImageUrl(publicUrl);
    } catch (error: any) {
      alert('Error uploading image: ' + error.message);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleSave = async () => {
    if (!title || !description || !imageUrl) {
      alert("Please fill out title, description, and upload an image.");
      return;
    }

    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    const { data, error } = await supabase
      .from('articles')
      .insert({ title, slug, category, description, content, image_url: imageUrl })
      .select()
      .single();

    if (error) {
      alert("Error saving: " + error.message);
    } else if (data) {
      setArticles([data, ...articles]);
      setIsEditing(false);
      setTitle("");
      setCategory("Guide");
      setDescription("");
      setContent("");
      setImageUrl("");
    }
  };

  const handleDelete = async (article: Article) => {
    if (!confirm("Delete this article?")) return;
    setArticles(articles.filter(a => a.id !== article.id));
    await supabase.from('articles').delete().eq('id', article.id);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold font-serif text-gray-900 mb-2">Journal & Guides</h1>
          <p className="text-gray-500">Manage your blog articles and guides.</p>
        </div>
        
        {!isEditing && (
          <button 
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-medium shadow-sm"
          >
            <Plus size={18} />
            Add Article
          </button>
        )}
      </div>

      {isEditing && (
        <div className="bg-[#F0F2DF]/50 p-6 rounded-xl border border-[#E2E6CC] shadow-sm space-y-6 backdrop-blur-sm">
          <div className="flex justify-between items-center border-b border-[#E2E6CC] pb-4">
            <h2 className="text-xl font-bold font-serif text-[#2C331F]">New Article</h2>
            <button onClick={() => setIsEditing(false)} className="text-[#6B7A50] hover:text-[#4A5D33] transition-colors">
              <X size={20} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input 
                  type="text" 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary focus:bg-white transition-colors"
                  placeholder="e.g. The Ultimate Aftercare Guide"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select 
                  value={category} 
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary focus:bg-white transition-colors"
                >
                  <option value="Guide">Guide</option>
                  <option value="Care">Care</option>
                  <option value="Inspiration">Inspiration</option>
                  <option value="Education">Education</option>
                  <option value="Culture">Culture</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Short Description</label>
                <textarea 
                  value={description} 
                  onChange={(e) => setDescription(e.target.value)}
                  rows={2}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary focus:bg-white transition-colors"
                  placeholder="A brief summary for the preview card..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Article Content</label>
                <textarea 
                  value={content} 
                  onChange={(e) => setContent(e.target.value)}
                  rows={8}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary focus:bg-white transition-colors font-mono text-sm"
                  placeholder="Write your full article here (Markdown supported if you want!)..."
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cover Image</label>
              {imageUrl ? (
                <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-gray-200 group bg-[#E2E6CC]/30">
                  <Image 
                    src={imageUrl} 
                    alt="Cover" 
                    fill 
                    className={`object-cover transition-all duration-700 ease-in-out ${loadedImages['preview'] ? "opacity-100 blur-0 scale-100" : "opacity-0 blur-md scale-105"}`}
                    onLoad={() => setLoadedImages(prev => ({ ...prev, 'preview': true }))}
                    unoptimized 
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button 
                      onClick={() => setImageUrl("")}
                      className="px-4 py-2 bg-white text-red-500 rounded-lg text-sm font-medium"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ) : (
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full aspect-video rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-500 cursor-pointer hover:bg-gray-50 hover:border-primary/50 transition-colors"
                >
                  {uploading ? (
                    <RefreshCw className="animate-spin mb-2" size={24} />
                  ) : (
                    <Upload className="mb-2" size={24} />
                  )}
                  <span className="text-sm font-medium">{uploading ? "Uploading..." : "Click to upload image"}</span>
                </div>
              )}
              <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleImageUpload} />
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-gray-100">
            <button 
              onClick={handleSave}
              className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-medium shadow-sm"
            >
              <Save size={18} />
              Publish Article
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="p-8 text-center text-gray-500">Loading articles...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <div key={article.id} className="bg-[#FCFDF7] rounded-xl overflow-hidden shadow-sm border border-[#E2E6CC] flex flex-col hover:shadow-md transition-shadow duration-300">
              <div className="relative w-full aspect-video bg-[#E2E6CC]/30 group overflow-hidden">
                <Image 
                  src={article.image_url} 
                  alt={article.title} 
                  fill 
                  className={`object-cover transition-all duration-700 ease-in-out group-hover:scale-105 ${loadedImages[article.id] ? "opacity-100 blur-0" : "opacity-0 blur-md scale-110"}`}
                  onLoad={() => setLoadedImages(prev => ({ ...prev, [article.id]: true }))}
                  unoptimized 
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 bg-[#FCFDF7]/90 backdrop-blur-md rounded text-[10px] font-bold uppercase tracking-widest text-[#4A5D33] shadow-sm">
                  {article.category}
                </div>
                <button 
                  onClick={() => handleDelete(article)}
                  className="absolute top-3 right-3 p-2 bg-red-500/90 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 shadow-sm"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-serif font-bold text-xl mb-2 line-clamp-2 text-[#2C331F] leading-snug">{article.title}</h3>
                <p className="text-[#6B7A50] text-sm line-clamp-3 mb-5 leading-relaxed">{article.description}</p>
                <div className="mt-auto pt-4 border-t border-[#E2E6CC] text-xs text-[#6B7A50]/70 font-bold uppercase tracking-widest flex justify-between items-center">
                  <span>Published:</span>
                  <span>{new Date(article.created_at).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          ))}
          
          {articles.length === 0 && !isEditing && (
            <div className="col-span-full py-16 text-center text-[#6B7A50] bg-[#F0F2DF]/30 rounded-xl border-2 border-dashed border-[#E2E6CC]">
              No articles published yet. Click "Add Article" to get started!
            </div>
          )}
        </div>
      )}
    </div>
  );
}
