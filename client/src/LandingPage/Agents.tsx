import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Calculator, Search, CheckCircle, Lightbulb, ArrowRight } from 'lucide-react';

const Agents: React.FC = () => {
  const agents = [
    {
      id: 1,
      name: "Market Analyst",
      role: "Market Intelligence",
      description: "Analyzes market trends, identifies target audiences, and assesses market opportunities using real-time data.",
      icon: <TrendingUp className="w-6 h-6" strokeWidth={2} />
    },
    {
      id: 2,
      name: "TAM/SAM Estimator",
      role: "Market Sizing",
      description: "Calculates Total Addressable Market, Serviceable Available Market, and realistic revenue projections.",
      icon: <Calculator className="w-6 h-6" strokeWidth={2} />
    },
    {
      id: 3,
      name: "Competitor Scanner",
      role: "Competitive Intelligence",
      description: "Scans for direct and indirect competitors, analyzes their strengths/weaknesses, and identifies your competitive edge.",
      icon: <Search className="w-6 h-6" strokeWidth={2} />
    },
    {
      id: 4,
      name: "Feasibility Evaluator",
      role: "Viability Assessment",
      description: "Evaluates technical, financial, and operational feasibility. Identifies risks and resource requirements.",
      icon: <CheckCircle className="w-6 h-6" strokeWidth={2} />
    },
    {
      id: 5,
      name: "Strategy Recommender",
      role: "Strategic Planning",
      description: "Synthesizes all insights to create comprehensive go-to-market strategies and actionable recommendations.",
      icon: <Lightbulb className="w-6 h-6" strokeWidth={2} />
    }
  ];

  return (
    <section className="py-24 relative w-full overflow-hidden bg-black">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-5xl md:text-6xl font-black mb-6 text-white">
            5 Specialized AI Agents
          </h2>
          <p className="font-body text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Each agent specializes in one domain for deeper, more accurate analysis powered by IBM Granite AI.
          </p>
        </motion.div>

        {/* Agents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {agents.slice(0, 3).map((agent, index) => (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="p-6 rounded-lg border border-gray-800 bg-gray-900/50 hover:border-gray-700 transition-all duration-200 h-full">
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gray-800 flex items-center justify-center text-gray-400">
                    {agent.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-lg font-bold text-white">{agent.name}</h3>
                      <span className="text-xs text-gray-600 font-mono">Agent {agent.id}</span>
                    </div>
                    <p className="text-sm text-blue-400 font-medium">{agent.role}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {agent.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Second Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-16">
          {agents.slice(3, 5).map((agent, index) => (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (index + 3) * 0.1 }}
            >
              <div className="p-6 rounded-lg border border-gray-800 bg-gray-900/50 hover:border-gray-700 transition-all duration-200 h-full">
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gray-800 flex items-center justify-center text-gray-400">
                    {agent.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-lg font-bold text-white">{agent.name}</h3>
                      <span className="text-xs text-gray-600 font-mono">Agent {agent.id}</span>
                    </div>
                    <p className="text-sm text-blue-400 font-medium">{agent.role}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {agent.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          <h3 className="text-3xl font-black mb-4 text-white">
            See Agents In Action
          </h3>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Submit your startup idea and watch all 5 agents analyze it in real-time
          </p>

          <a
            href="/validate-idea"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white hover:bg-gray-200 rounded-lg text-black font-bold text-lg transition-all duration-200"
          >
            Start Analysis Now
            <ArrowRight size={20} />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Agents;
