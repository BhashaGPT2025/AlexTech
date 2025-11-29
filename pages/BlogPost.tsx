import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getBlogPosts } from '../services/data';
import { ArrowLeft, Clock, Calendar } from 'lucide-react';

export const BlogPost = () => {
  const { slug } = useParams();
  const posts = getBlogPosts();
  const post = posts.find(p => p.slug === slug);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <article className="max-w-3xl mx-auto px-6 py-12">
      <Link to="/blog" className="inline-flex items-center text-sm text-secondary hover:text-primary mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Blog
      </Link>
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl md:text-5xl font-bold text-primary tracking-tight leading-tight mb-6">
          {post.title}
        </h1>
        
        <div className="flex items-center space-x-6 text-sm text-secondary mb-10 border-b border-gray-100 pb-6">
          <span className="flex items-center"><Calendar className="w-4 h-4 mr-2" /> {post.date}</span>
          <span className="flex items-center"><Clock className="w-4 h-4 mr-2" /> {post.readTime}</span>
        </div>

        <div className="aspect-video rounded-xl overflow-hidden mb-10 bg-gray-100">
           <img 
             src={post.image} 
             alt={post.title}
             className="w-full h-full object-cover"
           />
        </div>

        <div 
          className="prose prose-lg prose-neutral max-w-none 
            prose-headings:font-bold prose-headings:tracking-tight 
            prose-a:text-accent prose-a:no-underline hover:prose-a:underline
            prose-img:rounded-xl"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        
        <div className="mt-16 pt-8 border-t border-gray-100">
          <h4 className="text-sm font-bold uppercase tracking-wider text-secondary mb-4">Share this post</h4>
          <div className="flex space-x-4">
             {/* Placeholder buttons */}
             <button className="px-4 py-2 border border-gray-200 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors">Twitter</button>
             <button className="px-4 py-2 border border-gray-200 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors">LinkedIn</button>
          </div>
        </div>
      </motion.div>
    </article>
  );
};