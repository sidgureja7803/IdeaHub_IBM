import React from 'react';
import { Users, TrendingUp, Target, Lightbulb } from 'lucide-react';

interface MarketAnalysisProps {
  marketSize: string;
  growthRate: string;
  customerNeed: string;
  projections?: Array<{ year: number; value: number }>;
  targetAudience?: string[];
  growthDrivers?: string[];
  competitiveAdvantages?: string[];
  recommendations?: string[];
}

const MarketAnalysisSection: React.FC<MarketAnalysisProps> = ({
  marketSize,
  growthRate,
  customerNeed,
  targetAudience = [],
  growthDrivers = [],
  competitiveAdvantages = [],
  recommendations = [],
}) => {

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
        {targetAudience.length > 0 && (
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
        )}

        {/* Growth Drivers */}
        {growthDrivers.length > 0 && (
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
        )}
      </div>

      {/* Competitive Advantages */}
      {competitiveAdvantages.length > 0 && (
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
      )}

      {/* Recommendations */}
      {recommendations.length > 0 && (
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
      )}
    </div>
  );
};

export default MarketAnalysisSection;
