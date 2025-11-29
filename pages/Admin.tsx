import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Plus, Video, FileText, Check, AlertCircle } from 'lucide-react';
import { addVideo, addBlogPost } from '../services/data';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'video' | 'blog'>('video');
  const [notification, setNotification] = useState<string | null>(null);

  // New Video State
  const [videoForm, setVideoForm] = useState({
    title: '',
    youtubeId: '',
    category: 'Reviews',
    thumbnail: ''
  });

  // New Blog State
  const [blogForm, setBlogForm] = useState({
    title: '',
    excerpt: '',
    content: '',
    image: '',
    readTime: '5 min read'
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, verify against server. 
    // Credentials hardcoded for demonstration as requested.
    if (username === 'alex_creator' && password === 'portfolio2024') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid credentials');
    }
  };

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleVideoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoForm.title || !videoForm.youtubeId) return;

    addVideo({
      id: Date.now().toString(),
      title: videoForm.title,
      youtubeId: videoForm.youtubeId,
      category: videoForm.category as any,
      thumbnail: videoForm.thumbnail || `https://img.youtube.com/vi/${videoForm.youtubeId}/maxresdefault.jpg`,
      views: '0',
      date: 'Just now'
    });
    
    setVideoForm({ title: '', youtubeId: '', category: 'Reviews', thumbnail: '' });
    showNotification('Video added successfully');
  };

  const handleBlogSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!blogForm.title || !blogForm.content) return;

    const slug = blogForm.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    addBlogPost({
      id: Date.now().toString(),
      slug,
      title: blogForm.title,
      excerpt: blogForm.excerpt,
      content: blogForm.content,
      image: blogForm.image || 'https://picsum.photos/800/600',
      readTime: blogForm.readTime,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    });

    setBlogForm({ title: '', excerpt: '', content: '', image: '', readTime: '5 min read' });
    showNotification('Blog post published');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full border border-gray-100"
        >
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-primary rounded-full text-white">
              <Lock size={24} />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-center text-primary mb-6">Creator Access</h2>
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg flex items-center">
              <AlertCircle size={16} className="mr-2" /> {error}
            </div>
          )}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-secondary mb-1">Username</label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary mb-1">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              />
            </div>
            <button 
              type="submit" 
              className="w-full py-3 bg-primary text-white rounded-lg font-bold hover:bg-gray-800 transition-colors"
            >
              Enter Dashboard
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-12">
        <h1 className="text-3xl font-bold text-primary">Content Manager</h1>
        <div className="flex space-x-4 bg-white p-1 rounded-lg border border-gray-100 shadow-sm">
          <button 
            onClick={() => setActiveTab('video')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center ${activeTab === 'video' ? 'bg-primary text-white' : 'text-secondary hover:text-primary'}`}
          >
            <Video size={16} className="mr-2" /> Add Video
          </button>
          <button 
            onClick={() => setActiveTab('blog')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center ${activeTab === 'blog' ? 'bg-primary text-white' : 'text-secondary hover:text-primary'}`}
          >
            <FileText size={16} className="mr-2" /> Write Blog
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {notification && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="fixed top-24 right-6 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center z-50"
          >
            <Check size={18} className="mr-2" /> {notification}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        key={activeTab}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm"
      >
        {activeTab === 'video' ? (
          <form onSubmit={handleVideoSubmit} className="space-y-6">
            <h2 className="text-xl font-bold text-primary mb-4">Embed New Video</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-secondary mb-1">Video Title</label>
                <input 
                  required
                  value={videoForm.title}
                  onChange={e => setVideoForm({...videoForm, title: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent outline-none"
                  placeholder="e.g., iPhone 16 Review"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary mb-1">YouTube ID</label>
                <input 
                  required
                  value={videoForm.youtubeId}
                  onChange={e => setVideoForm({...videoForm, youtubeId: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent outline-none"
                  placeholder="e.g., dQw4w9WgXcQ"
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-secondary mb-1">Category</label>
                <select 
                  value={videoForm.category}
                  onChange={e => setVideoForm({...videoForm, category: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent outline-none"
                >
                  <option>Reviews</option>
                  <option>Smartphones</option>
                  <option>Laptops</option>
                  <option>Gadgets</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary mb-1">Thumbnail URL (Optional)</label>
                <input 
                  value={videoForm.thumbnail}
                  onChange={e => setVideoForm({...videoForm, thumbnail: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent outline-none"
                  placeholder="Leave empty for auto-generated"
                />
              </div>
            </div>
            <button type="submit" className="px-6 py-3 bg-accent text-white rounded-lg font-bold hover:bg-blue-600 transition-colors flex items-center">
              <Plus size={18} className="mr-2" /> Push to Library
            </button>
          </form>
        ) : (
          <form onSubmit={handleBlogSubmit} className="space-y-6">
            <h2 className="text-xl font-bold text-primary mb-4">Draft New Article</h2>
            <div>
              <label className="block text-sm font-medium text-secondary mb-1">Title</label>
              <input 
                required
                value={blogForm.title}
                onChange={e => setBlogForm({...blogForm, title: e.target.value})}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary mb-1">Excerpt</label>
              <textarea 
                required
                rows={2}
                value={blogForm.excerpt}
                onChange={e => setBlogForm({...blogForm, excerpt: e.target.value})}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary mb-1">Content (HTML Support)</label>
              <textarea 
                required
                rows={8}
                value={blogForm.content}
                onChange={e => setBlogForm({...blogForm, content: e.target.value})}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent outline-none font-mono text-sm"
                placeholder="<p>Write your content here...</p>"
              />
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-secondary mb-1">Image URL</label>
                <input 
                  value={blogForm.image}
                  onChange={e => setBlogForm({...blogForm, image: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent outline-none"
                  placeholder="https://..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary mb-1">Read Time</label>
                <input 
                  value={blogForm.readTime}
                  onChange={e => setBlogForm({...blogForm, readTime: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent outline-none"
                  placeholder="e.g. 5 min read"
                />
              </div>
            </div>
            <button type="submit" className="px-6 py-3 bg-accent text-white rounded-lg font-bold hover:bg-blue-600 transition-colors flex items-center">
              <Plus size={18} className="mr-2" /> Publish Article
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
};

export default Admin;