import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, ArrowRight, Smartphone, Laptop, Zap } from 'lucide-react';
import { getVideos, getBlogPosts } from '../services/data';
import { VideoModal } from '../components/VideoModal';
import { Video } from '../types';

export const Home = () => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [featuredVideos, setFeaturedVideos] = useState<Video[]>([]);
  const [latestVideo, setLatestVideo] = useState<Video | null>(null);

  useEffect(() => {
    const allVideos = getVideos();
    setFeaturedVideos(allVideos.slice(0, 3));
    setLatestVideo(allVideos[0]);
  }, []);

  return (
    <>
      <VideoModal videoId={selectedVideo} onClose={() => setSelectedVideo(null)} />
      
      {/* Hero Section */}
      <section className="relative px-6 py-12 md:py-24 max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-accent text-xs font-semibold tracking-wide mb-6">
            TECH CONTENT CREATOR
          </span>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[1.1] mb-6 text-primary">
            Decoding the <br/> 
            <span className="text-secondary">Future of Tech.</span>
          </h1>
          <p className="text-lg md:text-xl text-secondary mb-8 max-w-md leading-relaxed">
            Honest reviews, deep dives, and a glimpse into tomorrow's gadgets. 
            Join 250,000+ others on the journey.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link 
              to="/videos" 
              className="px-8 py-4 bg-primary text-white rounded-full font-medium hover:bg-gray-800 transition-all flex items-center group"
            >
              Watch Videos
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              to="/about" 
              className="px-8 py-4 bg-white border border-gray-200 text-primary rounded-full font-medium hover:bg-gray-50 transition-colors"
            >
              About Me
            </Link>
          </div>
          
          <div className="mt-12 flex items-center space-x-8">
            <div>
              <p className="text-3xl font-bold text-primary">250K+</p>
              <p className="text-sm text-secondary">Subscribers</p>
            </div>
            <div className="h-8 w-px bg-gray-200"></div>
            <div>
              <p className="text-3xl font-bold text-primary">50M+</p>
              <p className="text-sm text-secondary">Views</p>
            </div>
          </div>
        </motion.div>

        {/* Hero Visual / Latest Video Preview */}
        {latestVideo && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative group cursor-pointer"
            onClick={() => setSelectedVideo(latestVideo.youtubeId)}
          >
            <div className="relative overflow-hidden rounded-2xl aspect-[4/3] shadow-2xl">
              <img 
                src={latestVideo.thumbnail} 
                alt={latestVideo.title}
                className="object-cover w-full h-full transform transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/40 group-hover:scale-110 transition-transform">
                  <Play className="w-8 h-8 text-white fill-current ml-1" />
                </div>
              </div>
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-white/80 text-xs font-medium uppercase tracking-wider">Latest Upload</span>
                <h3 className="text-white text-xl md:text-2xl font-bold mt-2 leading-tight">
                  {latestVideo.title}
                </h3>
              </div>
            </div>
          </motion.div>
        )}
      </section>

      {/* Expertise Section */}
      <section className="bg-white border-y border-gray-100 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12 text-center">
            {[
              { icon: Smartphone, title: 'Smartphones', desc: 'In-depth analysis of the latest flagships and hidden gems.' },
              { icon: Laptop, title: 'Computing', desc: 'Real-world workflow tests for creatives and professionals.' },
              { icon: Zap, title: 'Future Tech', desc: 'Exploring AI, VR, and the bleeding edge of innovation.' }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex flex-col items-center"
              >
                <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-6 text-primary">
                  <item.icon size={24} strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-bold text-primary mb-3">{item.title}</h3>
                <p className="text-secondary leading-relaxed max-w-xs">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Videos Carousel */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-primary">Latest Uploads</h2>
            <p className="text-secondary mt-2">Fresh from the studio.</p>
          </div>
          <Link to="/videos" className="text-sm font-medium text-accent hover:text-blue-700 flex items-center">
            View All <ArrowRight className="ml-1 w-4 h-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {featuredVideos.map((video, idx) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group cursor-pointer"
              onClick={() => setSelectedVideo(video.youtubeId)}
            >
              <div className="relative aspect-video rounded-xl overflow-hidden mb-4 bg-gray-100">
                <img 
                  src={video.thumbnail} 
                  alt={video.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
                  12:45
                </div>
              </div>
              <h3 className="text-lg font-bold text-primary group-hover:text-accent transition-colors leading-snug mb-1">
                {video.title}
              </h3>
              <p className="text-sm text-secondary">
                {video.views} views • {video.date}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* About Teaser */}
      <section className="py-24 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">Technologist first. <br/>Creator second.</h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              My mission is to cut through the marketing noise and tell you what technology actually means for your daily life. No fluff, just facts and aesthetic visuals.
            </p>
            <Link 
              to="/about" 
              className="inline-block px-8 py-3 bg-white text-primary rounded-full font-medium hover:bg-gray-100 transition-colors"
            >
              Read My Story
            </Link>
          </div>
          <div className="relative">
             <div className="aspect-square bg-gray-800 rounded-2xl overflow-hidden opacity-80">
                {/* Placeholder for portrait */}
                <img src="https://picsum.photos/seed/portrait/800/800" alt="Alex Portrait" className="w-full h-full object-cover mix-blend-overlay" />
             </div>
          </div>
        </div>
      </section>
    </>
  );
};