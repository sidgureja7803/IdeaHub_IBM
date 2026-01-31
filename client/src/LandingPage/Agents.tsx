import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Calculator, Search, CheckCircle, Lightbulb, ArrowRight, ArrowDown, Workflow } from 'lucide-react';

interface Agent {
  id: number;
  name: string;
  role: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  outputs: string[];
}

const Agents: React.FC = () => {
  const [selectedAgent, setSelectedAgent] = useState<number | null>(null);

  const agents: Agent[] = [
    {
      id: 1,
      name: "Market Analyst",
      role: "Market Intelligence",
      description: "Analyzes market trends, identifies target audiences, and assesses market opportunities using real-time data.",
      icon: <TrendingUp className="w-8 h-8" strokeWidth={2} />,
      color: "from-blue-500 to-cyan-500",
      outputs: ["Target Market Analysis", "Market Trends Report", "Opportunities & Threats"]
    },
    {
      id: 2,
      name: "TAM/SAM Estimator",
      role: "Market Sizing",
      description: "Calculates Total Addressable Market, Serviceable Available Market, and realistic revenue projections.",
      icon: <Calculator className="w-8 h-8" strokeWidth={2} />,
      color: "from-purple-500 to-pink-500",
      outputs: ["TAM/SAM/SOM Metrics", "Revenue Projections", "Market Share Analysis"]
    },
    {
      id: 3,
      name: "Competitor Scanner",
      role: "Competitive Intelligence",
      description: "Scans for direct and indirect competitors, analyzes their strengths/weaknesses, and identifies your competitive edge.",
      icon: <Search className="w-8 h-8" strokeWidth={2} />,
      color: "from-orange-500 to-red-500",
      outputs: ["Competitor Landscape", "SWOT Analysis", "Competitive Advantages"]
    },
    {
      id: 4,
      name: "Feasibility Evaluator",
      role: "Viability Assessment",
      description: "Evaluates technical, financial, and operational feasibility. Identifies risks and resource requirements.",
      icon: <CheckCircle className="w-8 h-8" strokeWidth={2} />,
      color: "from-green-500 to-emerald-500",
      outputs: ["Feasibility Score", "Risk Assessment", "Resource Requirements"]
    },
    {
      id: 5,
      name: "Strategy Recommender",
      role: "Strategic Planning",
      description: "Synthesizes all insights to create comprehensive go-to-market strategies and actionable recommendations.",
      icon: <Lightbulb className="w-8 h-8" strokeWidth={2} />,
      color: "from-yellow-500 to-amber-500",
      outputs: ["Go-to-Market Strategy", "Action Plan", "Success Metrics"]
    }
  ];

  return (
    <section className="py-24 relative w-full overflow-hidden bg-black">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
            <Workflow className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-medium text-gray-400">Multi-Agent Orchestration</span>
          </div>
          <h2 className="font-display text-5xl md:text-6xl font-black mb-6 text-white">
            5 Specialized AI Agents
          </h2>
          <p className="font-body text-xl text-gray-500 max-w-3xl mx-auto leading-relaxed">
            Powered by IBM Granite AI, each agent specializes in one domain for deeper, more accurate analysis.
            Watch them work together in perfect orchestration.
          </p>
        </motion.div>

        {/* Agents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {agents.map((agent, index) => (
            <motion.div
              key={agent.id}
              className={`relative group cursor-pointer ${agent.id === 5 ? 'lg:col-span-3 lg:max-w-md lg:mx-auto' : ''}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => setSelectedAgent(selectedAgent === agent.id ? null : agent.id)}
            >
              <div className={`
                p-6 rounded-xl border transition-all duration-300
                ${selectedAgent === agent.id
                  ? 'bg-white/10 border-white/30 scale-105'
                  : 'bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/8'}
              `}>
                {/* Agent Number Badge */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`
                    w-12 h-12 rounded-lg bg-gradient-to-br ${agent.color} 
                    flex items-center justify-center text-white
                    group-hover:scale-110 transition-transform
                  `}>
                    {agent.icon}
                  </div>
                  <span className="px-3 py-1 rounded-full bg-white/10 text-white text-xs font-bold">
                    Agent {agent.id}
                  </span>
                </div>

                {/* Agent Info */}
                <h3 className="text-xl font-black text-white mb-2">{agent.name}</h3>
                <p className="text-sm text-blue-400 font-medium mb-3">{agent.role}</p>
                <p className="text-sm text-gray-400 leading-relaxed mb-4">
                  {agent.description}
                </p>

                {/* Outputs - Show when selected */}
                {selectedAgent === agent.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-4 pt-4 border-t border-white/10"
                  >
                    <p className="text-xs font-bold text-gray-500 mb-2">KEY OUTPUTS:</p>
                    <ul className="space-y-1">
                      {agent.outputs.map((output, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-gray-400">
                          <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${agent.color} mt-1.5 flex-shrink-0`} />
                          {output}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}

                {/* Click to expand hint */}
                {selectedAgent !== agent.id && (
                  <div className="text-xs text-gray-600 mt-2">
                    Click to see outputs →
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Orchestration Flow Diagram */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-20"
        >
          <h3 className="text-3xl font-black text-center text-white mb-12">
            How Agents Work Together
          </h3>

          <div className="max-w-4xl mx-auto">
            {/* Flow Visualization */}
            <div className="relative">
              {/* Parallel Processing: Agents 1-4 */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                {agents.slice(0, 4).map((agent, index) => (
                  <div key={agent.id} className="relative">
                    <div className={`
                      p-4 rounded-lg border border-white/20 bg-gradient-to-br ${agent.color} bg-opacity-10
                      text-center
                    `}>
                      <div className="w-10 h-10 mx-auto mb-2 rounded-lg bg-white/20 flex items-center justify-center">
                        {React.cloneElement(agent.icon as React.ReactElement, { className: "w-5 h-5 text-white" })}
                      </div>
                      <p className="text-sm font-bold text-white">{agent.name}</p>
                      <p className="text-xs text-gray-400 mt-1">Agent {agent.id}</p>
                    </div>

                    {/* Arrow down */}
                    <div className="flex justify-center mt-2">
                      <ArrowDown className="w-5 h-5 text-gray-600" />
                    </div>
                  </div>
                ))}
              </div>

              {/* Convergence indicator */}
              <div className="flex justify-center mb-8">
                <div className="px-6 py-2 rounded-full bg-white/5 border border-white/10">
                  <p className="text-sm text-gray-400 font-medium">All insights converge ↓</p>
                </div>
              </div>

              {/* Strategy Recommender - Agent 5 */}
              <div className="max-w-md mx-auto">
                <div className={`
                  p-6 rounded-xl border-2 border-white/30 bg-gradient-to-br ${agents[4].color} bg-opacity-10
                  text-center
                `}>
                  <div className="w-16 h-16 mx-auto mb-3 rounded-xl bg-white/20 flex items-center justify-center">
                    {React.cloneElement(agents[4].icon as React.ReactElement, { className: "w-8 h-8 text-white" })}
                  </div>
                  <p className="text-xl font-black text-white mb-2">{agents[4].name}</p>
                  <p className="text-sm text-gray-400">
                    Synthesizes all agent insights into actionable strategy
                  </p>
                  <div className="mt-4 pt-4 border-t border-white/20">
                    <p className="text-xs font-bold text-gray-500 mb-2">FINAL DELIVERABLE</p>
                    <div className="text-sm text-white font-medium">
                      Comprehensive Business Plan
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Key Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="p-6 rounded-lg bg-white/5 border border-white/10">
            <div className="text-3xl mb-3">⚡</div>
            <h4 className="text-lg font-bold text-white mb-2">Specialized Expertise</h4>
            <p className="text-sm text-gray-400">
              Each agent is a domain expert, providing deeper insights than a single AI model.
            </p>
          </div>
          <div className="p-6 rounded-lg bg-white/5 border border-white/10">
            <div className="text-3xl mb-3">🎯</div>
            <h4 className="text-lg font-bold text-white mb-2">Parallel Processing</h4>
            <p className="text-sm text-gray-400">
              Agents 1-4 run simultaneously for faster analysis, while Agent 5 synthesizes results.
            </p>
          </div>
          <div className="p-6 rounded-lg bg-white/5 border border-white/10">
            <div className="text-3xl mb-3">🔄</div>
            <h4 className="text-lg font-bold text-white mb-2">IBM Orchestrate Ready</h4>
            <p className="text-sm text-gray-400">
              Architecture designed for IBM watsonx Orchestrate deployment and scaling.
            </p>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.8 }}
        >
          <h2 className="font-display text-4xl md:text-5xl font-black mb-6 text-white">
            See Our Agents In Action
          </h2>
          <p className="font-body text-xl text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed">
            Submit your startup idea and watch all 5 agents analyze it in real-time
          </p>

          <a
            href="/validate-idea"
            className="group inline-flex items-center gap-2 px-8 py-4 bg-white hover:bg-gray-200 rounded-lg text-black font-bold text-lg transition-all duration-200"
          >
            Start Analysis Now
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Agents;
