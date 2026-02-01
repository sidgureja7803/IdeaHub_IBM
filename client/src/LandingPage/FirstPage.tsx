import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Zap, Shield, TrendingUp, Award } from 'lucide-react';

const ROTATING_KEYWORDS = [
  "Validate Startup Ideas",
  "Analyze Market Opportunities",
  "Estimate TAM/SAM/SOM",
  "Map Competitive Landscape",
  "Assess Feasibility",
  "Build Go-to-Market Strategy"
];

const STATS = [
  { value: "5", label: "AI Agents", sublabel: "Orchestrated by IBM watsonx" },
  { value: "2-3min", label: "Analysis Time", sublabel: "From idea to insights" },
  { value: "99%+", label: "Accuracy", sublabel: "Enterprise-grade AI" }
];

const FirstPage: React.FC = () => {
  const [currentKeywordIndex, setCurrentKeywordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentKeywordIndex((prev) => (prev + 1) % ROTATING_KEYWORDS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="min-h-screen relative flex items-center justify-center overflow-hidden bg-black">
      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:100px_100px]" />

      {/* Gradient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 container mx-auto px-6 py-20 max-w-7xl">
        <div className="flex flex-col items-center text-center space-y-12">

          {/* IBM watsonx Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full"
          >
            <Sparkles size={16} className="text-blue-400" />
            <span className="text-sm font-medium text-blue-300">Powered by IBM watsonx Orchestrate</span>
          </motion.div>

          {/* Hero Headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="space-y-6"
          >
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1] text-white">
              Validate Your Startup Idea
              <span className="block mt-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                With IBM watsonx Orchestrate
              </span>
            </h1>
          </motion.div>

          {/* Dynamic Keyword Animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-16 flex items-center justify-center"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentKeywordIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="font-heading text-2xl md:text-3xl font-semibold text-gray-400">
                  {ROTATING_KEYWORDS[currentKeywordIndex]}
                </h2>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-body text-lg md:text-xl text-gray-400 max-w-3xl leading-relaxed"
          >
            5 specialized AI agents orchestrated by <span className="text-white font-semibold">IBM watsonx</span> analyze your idea across market size, competition, feasibility, and strategy — delivering investor-ready insights in minutes.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap gap-4 justify-center pt-4"
          >
            <Link
              to="/sign-up"
              className="group px-8 py-4 bg-white hover:bg-gray-100 rounded-lg text-black font-bold text-lg transition-all duration-200 flex items-center gap-2 shadow-lg shadow-white/20"
            >
              Start Free Analysis
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              to="/sign-in"
              className="px-8 py-4 bg-transparent hover:bg-white/5 border border-white/20 hover:border-white/40 rounded-lg text-white font-semibold text-lg transition-all duration-200"
            >
              Sign In
            </Link>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-16 w-full max-w-4xl"
          >
            {STATS.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
                className="p-6 rounded-lg bg-gray-900/50 border border-gray-800 hover:border-gray-700 transition-all duration-200"
              >
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className="text-4xl font-black text-white">{stat.value}</div>
                  <div className="text-sm font-semibold text-gray-300">{stat.label}</div>
                  <div className="text-xs text-gray-500">{stat.sublabel}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Technology Features */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-12 w-full max-w-5xl"
          >
            <div className="flex items-center gap-3 p-4 rounded-lg bg-blue-500/5 border border-blue-500/20">
              <Shield size={20} className="text-blue-400 flex-shrink-0" />
              <div className="text-left">
                <div className="text-sm font-semibold text-white">IBM watsonx Orchestrate</div>
                <div className="text-xs text-gray-500">Enterprise AI Platform</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 rounded-lg bg-purple-500/5 border border-purple-500/20">
              <Zap size={20} className="text-purple-400 flex-shrink-0" />
              <div className="text-left">
                <div className="text-sm font-semibold text-white">IBM Granite 3.0</div>
                <div className="text-xs text-gray-500">Foundation Models</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 rounded-lg bg-green-500/5 border border-green-500/20">
              <TrendingUp size={20} className="text-green-400 flex-shrink-0" />
              <div className="text-left">
                <div className="text-sm font-semibold text-white">Real-Time Intelligence</div>
                <div className="text-xs text-gray-500">Tavily Market Data</div>
              </div>
            </div>
          </motion.div>

          {/* Hackathon Badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.5 }}
            className="pt-8"
          >
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-lg">
              <Award size={16} className="text-blue-400" />
              <span className="text-xs font-medium text-gray-400">
                Built for <span className="text-white font-semibold">lablab.ai × IBM watsonx Hackathon</span>
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FirstPage;
