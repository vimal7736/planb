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
      <div className="flex justify-between items-center">
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
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
          <div className="flex justify-between items-center border-b border-gray-100 pb-4">
            <h2 className="text-xl font-bold font-serif">New Article</h2>
            <button onClick={() => setIsEditing(false)} className="text-gray-400 hover:text-gray-700">
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
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  placeholder="e.g. The Ultimate Aftercare Guide"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select 
                  value={category} 
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
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
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  placeholder="A brief summary for the preview card..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Article Content</label>
                <textarea 
                  value={content} 
                  onChange={(e) => setContent(e.target.value)}
                  rows={8}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary font-mono text-sm"
                  placeholder="Write your full article here (Markdown supported if you want!)..."
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cover Image</label>
              {imageUrl ? (
                <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-gray-200 group">
                  <Image src={imageUrl} alt="Cover" fill className="object-cover" unoptimized />
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
            <div key={article.id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200 flex flex-col">
              <div className="relative w-full aspect-video bg-gray-100 group">
                <Image src={article.image_url} alt={article.title} fill className="object-cover" unoptimized />
                <div className="absolute top-2 left-2 px-2 py-1 bg-white/90 backdrop-blur-sm rounded text-[10px] font-bold uppercase text-primary">
                  {article.category}
                </div>
                <button 
                  onClick={() => handleDelete(article)}
                  className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 size={14} />
                </button>
              </div>
              <div className="p-4 flex flex-col flex-1">
                <h3 className="font-serif font-bold text-lg mb-2 line-clamp-2">{article.title}</h3>
                <p className="text-gray-500 text-sm line-clamp-3 mb-4">{article.description}</p>
                <div className="mt-auto pt-4 border-t border-gray-100 text-xs text-gray-400">
                  Published: {new Date(article.created_at).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
          
          {articles.length === 0 && !isEditing && (
            <div className="col-span-full py-12 text-center text-gray-500 bg-white rounded-xl border border-dashed border-gray-300">
              No articles published yet. Click "Add Article" to get started!
            </div>
          )}
        </div>
      )}
    </div>
  );
}
