import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getBlogPosts } from '../services/data';
import { ArrowUpRight } from 'lucide-react';
import { BlogPost as BlogPostType } from '../types';

export const Blog = () => {
  const [posts, setPosts] = useState<BlogPostType[]>([]);

  useEffect(() => {
    setPosts(getBlogPosts());
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="mb-16 border-b border-gray-100 pb-8">
        <h1 className="text-4xl font-bold text-primary tracking-tight">Written Insights</h1>
        <p className="text-secondary mt-2">Thoughts that needed more than a video description.</p>
      </div>

      <div className="grid gap-12">
        {posts.map((post, idx) => (
          <motion.article
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="group grid md:grid-cols-12 gap-8 items-start cursor-pointer"
          >
            <div className="md:col-span-4 aspect-[4/3] rounded-lg overflow-hidden bg-gray-100">
               <img 
                 src={post.image} 
                 alt={post.title}
                 className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                 loading="lazy"
               />
            </div>
            <div className="md:col-span-8 flex flex-col h-full justify-center">
              <div className="flex items-center text-xs font-semibold tracking-wider text-accent uppercase mb-3">
                 <span>Article</span>
                 <span className="mx-2 text-gray-300">•</span>
                 <span>{post.date}</span>
              </div>
              <Link to={`/blog/${post.slug}`} className="block">
                <h2 className="text-2xl md:text-3xl font-bold text-primary mb-3 group-hover:text-accent transition-colors leading-tight">
                  {post.title}
                </h2>
              </Link>
              <p className="text-secondary leading-relaxed mb-4 line-clamp-2">
                {post.excerpt}
              </p>
              <Link 
                to={`/blog/${post.slug}`} 
                className="inline-flex items-center text-sm font-medium text-primary border-b border-primary/20 pb-0.5 hover:border-primary transition-colors w-max"
              >
                Read Article <ArrowUpRight className="ml-1 w-3 h-3" />
              </Link>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
};