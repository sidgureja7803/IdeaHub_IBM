import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Shield, AlertCircle } from 'lucide-react';

interface Competitor {
  name: string;
  description?: string;
  marketShare?: string;
  strengths?: string[];
  weaknesses?: string[];
  pricing?: string;
  url?: string;
}

interface CompetitionProps {
  data?: {
    competitors?: Competitor[];
    directCompetitors?: Competitor[];
    indirectCompetitors?: Competitor[];
    marketGaps?: string[];
    competitiveAdvantage?: string;
    differentiation?: string;
    threatLevel?: string;
    recommendedStrategy?: string;
  };
}

const CompetitionSection: React.FC<CompetitionProps> = ({ data }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  if (!data) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white mb-2">Competitive Analysis</h2>
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-8 text-center">
          <AlertCircle size={48} className="mx-auto mb-4 text-gray-600" />
          <p className="text-gray-400">No competition data available</p>
        </div>
      </div>
    );
  }

  const allCompetitors = [
    ...(data.directCompetitors || []),
    ...(data.indirectCompetitors || []),
    ...(data.competitors || [])
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Competitive Analysis</h2>
        <p className="text-sm text-gray-500">Market leaders and competitive landscape</p>
      </div>

      {/* Market Leaders */}
      {allCompetitors.length > 0 && (
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
          <div className="flex items-center gap-2 mb-6">
            <Shield size={18} className="text-white" />
            <h3 className="text-lg font-bold text-white">Market Leaders</h3>
          </div>

          <div className="space-y-3">
            {allCompetitors.map((competitor, index) => (
              <div
                key={index}
                className="border border-gray-800 rounded-lg overflow-hidden"
              >
                {/* Competitor Header */}
                <button
                  onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                  className="w-full p-4 flex items-center justify-between hover:bg-gray-800/50 transition-colors"
                >
                  <div className="text-left flex-1">
                    <h4 className="text-sm font-bold text-white">
                      {competitor.name || `Competitor ${index + 1}`}
                    </h4>
                    {competitor.description && (
                      <p className="text-xs text-gray-500 mt-1">{competitor.description}</p>
                    )}
                  </div>
                  {expandedIndex === index ? (
                    <ChevronUp size={16} className="text-gray-400 flex-shrink-0 ml-2" />
                  ) : (
                    <ChevronDown size={16} className="text-gray-400 flex-shrink-0 ml-2" />
                  )}
                </button>

                {/* Expanded Content */}
                {expandedIndex === index && (
                  <div className="border-t border-gray-800 p-4 bg-gray-900/50 space-y-4">
                    {/* URL */}
                    {competitor.url && (
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Website</p>
                        <a
                          href={competitor.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-blue-400 hover:underline"
                        >
                          {competitor.url}
                        </a>
                      </div>
                    )}

                    {/* Strengths & Weaknesses */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Strengths */}
                      {competitor.strengths && competitor.strengths.length > 0 && (
                        <div className="border border-gray-800 rounded-lg p-3">
                          <p className="text-xs font-bold text-green-500 mb-2">Strengths</p>
                          <ul className="space-y-1.5">
                            {competitor.strengths.map((strength, i) => (
                              <li key={i} className="text-xs text-gray-400 flex items-start gap-2">
                                <span className="text-green-500 mt-0.5">✓</span>
                                {strength}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Weaknesses */}
                      {competitor.weaknesses && competitor.weaknesses.length > 0 && (
                        <div className="border border-gray-800 rounded-lg p-3">
                          <p className="text-xs font-bold text-red-500 mb-2">Weaknesses</p>
                          <ul className="space-y-1.5">
                            {competitor.weaknesses.map((weakness, i) => (
                              <li key={i} className="text-xs text-gray-400 flex items-start gap-2">
                                <span className="text-red-500 mt-0.5">•</span>
                                {weakness}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    {/* Pricing */}
                    {competitor.pricing && (
                      <div className="flex items-center justify-between pt-2 border-t border-gray-800">
                        <span className="text-xs text-gray-500">Pricing</span>
                        <span className="text-xs font-medium text-white">{competitor.pricing}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Market Trends */}
      {data.marketGaps && data.marketGaps.length > 0 && (
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
          <button className="w-full flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ChevronDown size={18} className="text-white" />
              <h3 className="text-lg font-bold text-white">Market Trends</h3>
            </div>
          </button>

          <div className="mt-4 space-y-2">
            {data.marketGaps.map((gap, index) => (
              <div key={index} className="flex items-start gap-2 text-sm text-gray-300">
                <span className="text-gray-600 mt-1">•</span>
                <span>{gap}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Competitive Advantage */}
      {(data.competitiveAdvantage || data.differentiation) && (
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <Shield size={18} className="text-blue-500" />
            <h3 className="text-lg font-bold text-white">Our Competitive Advantage</h3>
          </div>
          <p className="text-sm text-gray-300 leading-relaxed">
            {data.competitiveAdvantage || data.differentiation}
          </p>
          {data.recommendedStrategy && (
            <div className="mt-4 pt-4 border-t border-gray-800">
              <p className="text-xs font-bold text-gray-500 mb-2">Recommended Strategy</p>
              <p className="text-sm text-gray-400">{data.recommendedStrategy}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CompetitionSection;
