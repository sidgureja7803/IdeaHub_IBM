import React from 'react';
import { Target, DollarSign, Calendar, TrendingUp, AlertCircle, Zap } from 'lucide-react';

interface StrategyProps {
  data?: {
    recommendations?: string[] | string;
    goToMarketStrategy?: string;
    targetMarket?: string | string[];
    differentiationStrategy?: string;
    pricingStrategy?: string;
    marketingChannels?: string[];
    timeline?: string;
    keyMetrics?: string[];
    nextSteps?: string[];
    competitivePositioning?: string;
  };
}

const StrategySection: React.FC<StrategyProps> = ({ data }) => {
  if (!data) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white mb-2">Strategy & Recommendations</h2>
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-8 text-center">
          <AlertCircle size={48} className="mx-auto mb-4 text-gray-600" />
          <p className="text-gray-400">No strategy data available</p>
        </div>
      </div>
    );
  }

  // Parse recommendations - could be string or array
  const recommendations = Array.isArray(data.recommendations)
    ? data.recommendations
    : (data.recommendations ? [data.recommendations] : []);

  // Parse target market
  const targetMarkets = Array.isArray(data.targetMarket)
    ? data.targetMarket
    : (data.targetMarket ? [data.targetMarket] : []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Strategy & Recommendations</h2>
        <p className="text-sm text-gray-500">Go-to-market strategy and actionable recommendations</p>
      </div>

      {/* Go-to-Market Strategy */}
      {(data.goToMarketStrategy || data.competitivePositioning) && (
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <Target size={18} className="text-white" />
            <h3 className="text-lg font-bold text-white">Go-to-Market Strategy</h3>
          </div>

          <div className="space-y-4">
            {data.goToMarketStrategy && (
              <div>
                <h4 className="text-sm font-bold text-gray-400 mb-2">Primary Strategy</h4>
                <p className="text-sm text-gray-300 leading-relaxed">{data.goToMarketStrategy}</p>
              </div>
            )}

            {data.competitivePositioning && (
              <div className="pt-4 border-t border-gray-800">
                <h4 className="text-sm font-bold text-gray-400 mb-2">Competitive Positioning</h4>
                <p className="text-sm text-gray-300 leading-relaxed">{data.competitivePositioning}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Marketing Channels and Targets */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Marketing Channels */}
        {data.marketingChannels && data.marketingChannels.length > 0 && (
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <Zap size={18} className="text-white" />
              <h3 className="text-lg font-bold text-white">Channels</h3>
            </div>
            <ul className="space-y-2">
              {data.marketingChannels.map((channel, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-gray-300">
                  <span className="text-gray-600 mt-1">•</span>
                  <span>{channel}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Target Segments */}
        {targetMarkets.length > 0 && (
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <Target size={18} className="text-white" />
              <h3 className="text-lg font-bold text-white">Target Segments</h3>
            </div>
            <ul className="space-y-2">
              {targetMarkets.map((market, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-gray-300">
                  <span className="text-gray-600 mt-1">•</span>
                  <span>{market}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Differentiation & Pricing */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Differentiation Strategy */}
        {data.differentiationStrategy && (
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <Zap size={18} className="text-yellow-500" />
              <h3 className="text-lg font-bold text-white">Competitive Advantage</h3>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">{data.differentiationStrategy}</p>
          </div>
        )}

        {/* Pricing Strategy */}
        {data.pricingStrategy && (
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <DollarSign size={18} className="text-green-500" />
              <h3 className="text-lg font-bold text-white">Pricing Strategy</h3>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">{data.pricingStrategy}</p>
          </div>
        )}

        {/* Timeline */}
        {data.timeline && (
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <Calendar size={18} className="text-blue-500" />
              <h3 className="text-lg font-bold text-white">Timeline</h3>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">{data.timeline}</p>
          </div>
        )}
      </div>

      {/* Key Metrics */}
      {data.keyMetrics && data.keyMetrics.length > 0 && (
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp size={18} className="text-white" />
            <h3 className="text-lg font-bold text-white">Key Metrics to Track</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {data.keyMetrics.map((metric, index) => (
              <div key={index} className="flex items-start gap-2 text-sm text-gray-300">
                <span className="text-gray-600 mt-1">•</span>
                <span>{metric}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Strategic Recommendations */}
      {recommendations.length > 0 && (
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <Target size={18} className="text-blue-500" />
            <h3 className="text-lg font-bold text-white">Strategic Recommendations</h3>
          </div>
          <ul className="space-y-2">
            {recommendations.map((rec, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-gray-300">
                <span className="text-blue-500 mt-1">✓</span>
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Next Steps */}
      {data.nextSteps && data.nextSteps.length > 0 && (
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-bold text-white mb-4">Next Steps</h3>
          <ol className="space-y-2">
            {data.nextSteps.map((step, index) => (
              <li key={index} className="flex items-start gap-3 text-sm text-gray-300">
                <span className="text-blue-500 font-medium">{index + 1}.</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
};

export default StrategySection;
