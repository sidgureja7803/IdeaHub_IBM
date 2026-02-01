import React from 'react';
import { Users, TrendingUp, Target, Lightbulb } from 'lucide-react';

interface MarketAnalysisProps {
  marketSize: string;
  growthRate: string;
  customerNeed: string;
  projections?: Array<{ year: number; value: number }>;
}

const MarketAnalysisSection: React.FC<MarketAnalysisProps> = ({
  marketSize,
  growthRate,
  customerNeed,
}) => {
  // Mock data based on typical backend response structure
  const targetAudience = [
    "Young aged 18-35",
    "Tech-savvy recent graduates",
    "First-time budgeters/investors",
    "Savvy millennials and Gen Z users"
  ];

  const growthDrivers = [
    "8 of Financial literacy importance young adults",
    "Gamification and app ubiquity + eco gamif learning",
    "Demand for personalized goal-driven learning experiences",
    "Effectiveness of gam in enhancing engagement and retention",
    "Growing interest in early investing and debt management education"
  ];

  const competitiveAdvantages = [
    "Personal learning paths tailored to financial goals and skill levels",
    "Incentive and real-time progress through interactive features",
    "Reward offering tangible incentives to sustain user use",
    "Integration of comprehensive topics including budgeting, debt, saving, investing, retirement, and gamification with real-time progress and feedback-driven",
    "Leverages mobile-first design and smartphone popularity with accessibility reach",
    "Differentiation with tailored rewards and comprehensive content updates and feedback-driven"
  ];

  const recommendations = [
    "💰 Develop AI-driven algorithms tailored lesson and recommendations",
    "📱 Incorporate gamification including financial discounts print utilizing or",
    "🤝 Partner with educational institutions and provide reach",
    "📈 Mobile first user experience and interface optimization and reach",
    "🎯 Implement behavior-tracking to continuously refine strategies and"
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Market Analysis</h2>
        <p className="text-sm text-gray-500">Comprehensive market intelligence and insights</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp size={16} className="text-gray-400" />
            <span className="text-xs text-gray-500">Market Size</span>
          </div>
          <p className="text-xl font-bold text-white">{marketSize}</p>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp size={16} className="text-gray-400" />
            <span className="text-xs text-gray-500">Growth Rate</span>
          </div>
          <p className="text-xl font-bold text-white">{growthRate}</p>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Target size={16} className="text-gray-400" />
            <span className="text-xs text-gray-500">Customer Need</span>
          </div>
          <p className="text-xl font-bold text-white">{customerNeed}</p>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Target Audience */}
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <Users size={18} className="text-white" />
            <h3 className="text-lg font-bold text-white">Target Audience</h3>
          </div>
          <ul className="space-y-2">
            {targetAudience.map((item, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-gray-300">
                <span className="text-gray-600 mt-1">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Growth Drivers */}
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp size={18} className="text-white" />
            <h3 className="text-lg font-bold text-white">Growth Drivers</h3>
          </div>
          <ul className="space-y-2">
            {growthDrivers.map((item, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-gray-300">
                <span className="text-gray-600 mt-1">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Competitive Advantages */}
      <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <Target size={18} className="text-white" />
          <h3 className="text-lg font-bold text-white">Competitive Advantages</h3>
        </div>
        <ul className="space-y-2">
          {competitiveAdvantages.map((item, index) => (
            <li key={index} className="flex items-start gap-2 text-sm text-gray-300">
              <span className="text-gray-600 mt-1">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Recommendations */}
      <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb size={18} className="text-yellow-500" />
          <h3 className="text-lg font-bold text-white">Recommendations</h3>
        </div>
        <ul className="space-y-2">
          {recommendations.map((item, index) => (
            <li key={index} className="flex items-start gap-2 text-sm text-gray-300">
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MarketAnalysisSection;
