import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getVideos } from '../services/data';
import { VideoModal } from '../components/VideoModal';
import { Play } from 'lucide-react';
import { Video } from '../types';

const CATEGORIES = ['All', 'Smartphones', 'Laptops', 'Gadgets', 'Reviews'];

export const Videos = () => {
  const [filter, setFilter] = useState('All');
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [allVideos, setAllVideos] = useState<Video[]>([]);

  useEffect(() => {
    setAllVideos(getVideos());
  }, []);

  const filteredVideos = filter === 'All' 
    ? allVideos 
    : allVideos.filter(v => v.category === filter);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <VideoModal videoId={selectedVideo} onClose={() => setSelectedVideo(null)} />

      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-primary tracking-tight mb-4">My Library</h1>
        <p className="text-lg text-secondary max-w-2xl mx-auto">
          Deep dives, unboxings, and honest opinions on the tech that matters.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
              filter === cat 
                ? 'bg-primary text-white shadow-lg scale-105' 
                : 'bg-white text-secondary hover:bg-gray-100 border border-gray-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Video Grid */}
      <motion.div 
        layout
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <AnimatePresence mode='popLayout'>
          {filteredVideos.map((video) => (
            <motion.div
              layout
              key={video.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="group cursor-pointer"
              onClick={() => setSelectedVideo(video.youtubeId)}
            >
              <div className="relative aspect-video rounded-xl overflow-hidden mb-4 bg-gray-100 shadow-sm group-hover:shadow-xl transition-all duration-300">
                <img 
                  src={video.thumbnail} 
                  alt={video.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                   <div className="w-12 h-12 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity transform scale-75 group-hover:scale-100">
                      <Play className="w-5 h-5 text-white fill-current ml-1" />
                   </div>
                </div>
                <div className="absolute top-3 left-3">
                  <span className="px-2 py-1 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider rounded">
                    {video.category}
                  </span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-primary group-hover:text-accent transition-colors leading-tight mb-2">
                {video.title}
              </h3>
              <p className="text-sm text-secondary flex items-center gap-2">
                <span>{video.views} views</span>
                <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                <span>{video.date}</span>
              </p>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};