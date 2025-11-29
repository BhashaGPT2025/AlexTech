import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Send } from 'lucide-react';

export const Contact = () => {
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission
    setTimeout(() => {
        setIsSubmitted(true);
        setFormState({ name: '', email: '', subject: '', message: '' });
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-16">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold text-primary tracking-tight mb-6">Let's Collaborate.</h1>
        <p className="text-lg text-secondary mb-12 max-w-md">
          Interested in a sponsorship, review unit, or speaking engagement? 
          Drop a line below. I prioritize partnerships that align with my audience's interests.
        </p>

        <div className="space-y-8">
          <div className="flex items-start">
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-primary mt-1">
              <Mail size={20} />
            </div>
            <div className="ml-4">
              <h3 className="font-bold text-primary">Email</h3>
              <p className="text-secondary">business@alextech.com</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-primary mt-1">
              <MapPin size={20} />
            </div>
            <div className="ml-4">
              <h3 className="font-bold text-primary">Studio Location</h3>
              <p className="text-secondary">San Francisco, CA</p>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm"
      >
        {isSubmitted ? (
          <div className="h-full flex flex-col items-center justify-center text-center py-12">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
              <Send size={32} />
            </div>
            <h3 className="text-2xl font-bold text-primary">Message Sent!</h3>
            <p className="text-secondary mt-2">I'll get back to you within 48 hours.</p>
            <button 
                onClick={() => setIsSubmitted(false)}
                className="mt-6 text-accent font-medium hover:underline"
            >
                Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-secondary mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formState.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-transparent transition-all"
                  placeholder="Jane Doe"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-secondary mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formState.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-transparent transition-all"
                  placeholder="jane@example.com"
                />
              </div>
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-secondary mb-2">Subject</label>
              <select
                id="subject"
                name="subject"
                required
                value={formState.subject}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-transparent transition-all"
              >
                <option value="" disabled>Select a topic</option>
                <option value="Sponsorship">Sponsorship Opportunity</option>
                <option value="Review">Product Review Request</option>
                <option value="Speaking">Speaking Engagement</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-secondary mb-2">Message</label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                value={formState.message}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-transparent transition-all resize-none"
                placeholder="Tell me about your project..."
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full py-4 bg-primary text-white rounded-lg font-bold hover:bg-gray-800 transition-colors flex justify-center items-center"
            >
              Send Message <Send className="ml-2 w-4 h-4" />
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
};