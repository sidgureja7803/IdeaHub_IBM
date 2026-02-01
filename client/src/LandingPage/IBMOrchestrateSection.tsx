import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Network, Brain, Zap, Shield, GitBranch, TrendingUp, CheckCircle } from 'lucide-react';

const ORCHESTRATION_FEATURES = [
    {
        icon: Network,
        title: "Multi-Agent Orchestration",
        description: "5 specialized AI agents work together seamlessly, orchestrated by IBM watsonx for comprehensive analysis"
    },
    {
        icon: Brain,
        title: "IBM Granite Intelligence",
        description: "Enterprise-grade foundation models power each agent with advanced reasoning and business intelligence"
    },
    {
        icon: Zap,
        title: "Parallel Processing",
        description: "Agents execute tasks simultaneously, delivering complete startup validation in under 3 minutes"
    },
    {
        icon: Shield,
        title: "Enterprise Security",
        description: "Built on IBM's secure cloud infrastructure with OAuth 2.0 authentication and encrypted data"
    }
];

const AGENT_WORKFLOW = [
    { name: "Market Analyst", color: "blue", task: "Market size, trends, and opportunities", icon: TrendingUp },
    { name: "TAM/SAM Estimator", color: "purple", task: "Total & serviceable market calculations", icon: GitBranch },
    { name: "Competitor Scanner", color: "green", task: "Competitive landscape and gaps", icon: Shield },
    { name: "Feasibility Evaluator", color: "orange", task: "Technical, operational, financial viability", icon: CheckCircle },
    { name: "Strategy Recommender", color: "pink", task: "Go-to-market and differentiation strategy", icon: Sparkles }
];

const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; border: string; text: string }> = {
        blue: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-400' },
        purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-400' },
        green: { bg: 'bg-green-500/10', border: 'border-green-500/30', text: 'text-green-400' },
        orange: { bg: 'bg-orange-500/10', border: 'border-orange-500/30', text: 'text-orange-400' },
        pink: { bg: 'bg-pink-500/10', border: 'border-pink-500/30', text: 'text-pink-400' }
    };
    return colors[color] || colors.blue;
};

const IBMOrchestrateSection: React.FC = () => {
    return (
        <section className="relative py-24 bg-black overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:100px_100px]" />

            {/* Gradient Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-[150px] pointer-events-none" />

            <div className="relative z-10 container mx-auto px-6 max-w-7xl">

                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full mb-6">
                        <Sparkles size={16} className="text-blue-400" />
                        <span className="text-sm font-medium text-blue-300">Enterprise AI Platform</span>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                        Powered by IBM watsonx Orchestrate
                    </h2>
                    <p className="text-lg text-gray-400 max-w-3xl mx-auto">
                        Enterprise-grade multi-agent AI system that coordinates specialized agents to deliver comprehensive startup validation
                    </p>
                </motion.div>

                {/* Orchestration Features Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20"
                >
                    {ORCHESTRATION_FEATURES.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                            className="p-6 rounded-xl bg-gray-900/50 border border-gray-800 hover:border-gray-700 transition-all duration-300"
                        >
                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20 flex-shrink-0">
                                    <feature.icon size={24} className="text-blue-400" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                                    <p className="text-sm text-gray-400 leading-relaxed">{feature.description}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Agent Workflow Visualization */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="mb-12"
                >
                    <h3 className="text-2xl md:text-3xl font-bold text-white text-center mb-8">
                        5 Specialized AI Agents
                    </h3>
                    <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
                        Each agent is powered by IBM Granite 3.0 and orchestrated to provide comprehensive business intelligence
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {AGENT_WORKFLOW.map((agent, index) => {
                            const colors = getColorClasses(agent.color);
                            return (
                                <motion.div
                                    key={agent.name}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                                    className={`p-5 rounded-lg border ${colors.bg} ${colors.border} hover:scale-105 transition-transform duration-300`}
                                >
                                    <div className="flex items-start gap-3 mb-3">
                                        <agent.icon size={20} className={colors.text} />
                                        <h4 className="text-base font-bold text-white">{agent.name}</h4>
                                    </div>
                                    <p className="text-xs text-gray-400">{agent.task}</p>

                                    {/* Agent Number Badge */}
                                    <div className="mt-3 pt-3 border-t border-gray-800 flex items-center justify-between">
                                        <span className="text-xs text-gray-600">Agent {index + 1}/5</span>
                                        <div className={`w-2 h-2 rounded-full ${colors.bg} ${colors.border} border`} />
                                    </div>
                                </motion.div>
                            );
                        })}

                        {/* Orchestration Center */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 1 }}
                            className="md:col-span-2 lg:col-span-3 p-6 rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30"
                        >
                            <div className="flex items-center gap-4 mb-3">
                                <div className="p-3 rounded-lg bg-blue-500/20 border border-blue-500/30">
                                    <Network size={24} className="text-blue-400" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-white">IBM watsonx Orchestrate</h4>
                                    <p className="text-sm text-gray-400">Coordinates all agents for seamless, parallel execution</p>
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-2 mt-4">
                                <span className="text-xs px-3 py-1 bg-white/5 border border-white/10 rounded-full text-gray-400">
                                    Parallel Processing
                                </span>
                                <span className="text-xs px-3 py-1 bg-white/5 border border-white/10 rounded-full text-gray-400">
                                    Context Sharing
                                </span>
                                <span className="text-xs px-3 py-1 bg-white/5 border border-white/10 rounded-full text-gray-400">
                                    Error Handling
                                </span>
                                <span className="text-xs px-3 py-1 bg-white/5 border border-white/10 rounded-full text-gray-400">
                                    Real-time Updates
                                </span>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Technology Stack */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="mt-16 p-8 rounded-xl bg-gray-900/50 border border-gray-800"
                >
                    <h3 className="text-xl font-bold text-white text-center mb-6">Enterprise Technology Stack</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-blue-400 mb-1">IBM watsonx</div>
                            <div className="text-xs text-gray-500">AI Orchestration</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-purple-400 mb-1">Granite 3.0</div>
                            <div className="text-xs text-gray-500">Foundation Model</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-green-400 mb-1">Tavily</div>
                            <div className="text-xs text-gray-500">Market Intelligence</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-orange-400 mb-1">Appwrite</div>
                            <div className="text-xs text-gray-500">Backend Services</div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default IBMOrchestrateSection;
