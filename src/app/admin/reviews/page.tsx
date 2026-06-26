"use client";

import { useState, useEffect } from "react";
import { supabase, Review } from "@/lib/supabase";
import { Trash2, Plus, Star, X, Save } from "lucide-react";

export default function AdminReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  // Form State
  const [clientName, setClientName] = useState("");
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");
  const [tattooStyle, setTattooStyle] = useState("");

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (error) console.error("Error fetching reviews:", error);
    else if (data) setReviews(data);
    setLoading(false);
  };

  const handleSave = async () => {
    if (!clientName || !text) {
      alert("Please fill out client name and the review text.");
      return;
    }

    const { data, error } = await supabase
      .from('reviews')
      .insert({ 
        client_name: clientName, 
        rating, 
        text, 
        tattoo_style: tattooStyle 
      })
      .select()
      .single();

    if (error) {
      alert("Error saving: " + error.message);
    } else if (data) {
      setReviews([data, ...reviews]);
      setIsEditing(false);
      
      // Reset form
      setClientName("");
      setRating(5);
      setText("");
      setTattooStyle("");
    }
  };

  const handleDelete = async (reviewId: string) => {
    if (!confirm("Delete this review?")) return;
    setReviews(reviews.filter(r => r.id !== reviewId));
    await supabase.from('reviews').delete().eq('id', reviewId);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold font-serif text-gray-900 mb-2">Client Reviews</h1>
          <p className="text-gray-500">Manage reviews to display on the homepage.</p>
        </div>
        
        {!isEditing && (
          <button 
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-medium shadow-sm"
          >
            <Plus size={18} />
            Add Review
          </button>
        )}
      </div>

      {isEditing && (
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
          <div className="flex justify-between items-center border-b border-gray-100 pb-4">
            <h2 className="text-xl font-bold font-serif">New Client Review</h2>
            <button onClick={() => setIsEditing(false)} className="text-gray-400 hover:text-gray-700">
              <X size={20} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Client Name</label>
                <input 
                  type="text" 
                  value={clientName} 
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  placeholder="e.g. John Doe"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tattoo Style (Optional)</label>
                <input 
                  type="text" 
                  value={tattooStyle} 
                  onChange={(e) => setTattooStyle(e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  placeholder="e.g. Fine Line, Realism"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                <select 
                  value={rating} 
                  onChange={(e) => setRating(Number(e.target.value))}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                >
                  <option value={5}>5 Stars - Excellent</option>
                  <option value={4}>4 Stars - Good</option>
                  <option value={3}>3 Stars - Average</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Review Text</label>
                <textarea 
                  value={text} 
                  onChange={(e) => setText(e.target.value)}
                  rows={8}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  placeholder="Paste the Google review here..."
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-gray-100">
            <button 
              onClick={handleSave}
              className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-medium shadow-sm"
            >
              <Save size={18} />
              Save Review
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="p-8 text-center text-gray-500">Loading reviews...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 flex flex-col relative group">
              <button 
                onClick={() => handleDelete(review.id)}
                className="absolute top-4 right-4 p-1.5 bg-red-50 text-red-500 rounded opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-100"
              >
                <Trash2 size={16} />
              </button>
              
              <div className="flex text-yellow-400 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill={i < review.rating ? "currentColor" : "none"} className={i >= review.rating ? "text-gray-300" : ""} />
                ))}
              </div>
              
              <p className="text-gray-600 mb-6 italic text-sm flex-1 leading-relaxed">
                "{review.text}"
              </p>
              
              <div className="mt-auto pt-4 border-t border-gray-100">
                <p className="font-bold text-gray-900 font-serif">{review.client_name}</p>
                {review.tattoo_style && (
                  <p className="text-xs text-gray-400 uppercase tracking-widest mt-1">
                    {review.tattoo_style}
                  </p>
                )}
              </div>
            </div>
          ))}
          
          {reviews.length === 0 && !isEditing && (
            <div className="col-span-full py-12 text-center text-gray-500 bg-white rounded-xl border border-dashed border-gray-300">
              No reviews added yet. Click "Add Review" to paste a Google review!
            </div>
          )}
        </div>
      )}
    </div>
  );
}
