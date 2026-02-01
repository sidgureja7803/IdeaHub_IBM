import React from 'react';
import { CheckCircle, AlertTriangle, Settings, DollarSign, AlertCircle } from 'lucide-react';

interface FeasibilityProps {
  data?: {
    technicalFeasibility?: string | { score?: number; assessment?: string; details?: string };
    operationalFeasibility?: string | { score?: number; assessment?: string; details?: string };
    financialFeasibility?: string | { score?: number; assessment?: string; details?: string };
    marketFeasibility?: string | { score?: number; assessment?: string; details?: string };
    overallScore?: number;
    opportunities?: string[];
    challenges?: string[];
    risks?: string[];
    recommendations?: string[];
  };
}

const FeasibilitySection: React.FC<FeasibilityProps> = ({ data }) => {
  if (!data) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white mb-2">Feasibility Evaluation</h2>
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-8 text-center">
          <AlertCircle size={48} className="mx-auto mb-4 text-gray-600" />
          <p className="text-gray-400">No feasibility data available</p>
        </div>
      </div>
    );
  }

  const parseFeasibility = (feas: any) => {
    if (typeof feas === 'string') {
      return { assessment: feas, score: undefined };
    }
    return {
      score: feas?.score,
      assessment: feas?.assessment || feas?.details || 'No details available'
    };
  };

  const technical = parseFeasibility(data.technicalFeasibility);
  const operational = parseFeasibility(data.operationalFeasibility);
  const financial = parseFeasibility(data.financialFeasibility);

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-500';
    if (score >= 6) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Feasibility Evaluation</h2>
        <p className="text-sm text-gray-500">Technical, operational, and financial assessment</p>
      </div>

      {/* Opportunities and Challenges */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Opportunities */}
        {data.opportunities && data.opportunities.length > 0 && (
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle size={18} className="text-green-500" />
              <h3 className="text-lg font-bold text-white">Opportunities</h3>
            </div>
            <ul className="space-y-2">
              {data.opportunities.map((opportunity, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-gray-300">
                  <span className="text-green-500 mt-0.5 flex-shrink-0">✓</span>
                  <span>{opportunity}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Challenges */}
        {data.challenges && data.challenges.length > 0 && (
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle size={18} className="text-yellow-500" />
              <h3 className="text-lg font-bold text-white">Challenges</h3>
            </div>
            <ul className="space-y-2">
              {data.challenges.map((challenge, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-gray-300">
                  <span className="text-yellow-500 mt-0.5 flex-shrink-0">⚠</span>
                  <span>{challenge}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Feasibility Scores */}
      <div className="space-y-4">
        {/* Technical Feasibility */}
        {data.technicalFeasibility && (
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Settings size={18} className="text-white" />
                <h3 className="text-base font-bold text-white">Technical Feasibility</h3>
              </div>
              {technical.score !== undefined && (
                <div className={`text-2xl font-bold ${getScoreColor(technical.score)}`}>
                  {technical.score}/10
                </div>
              )}
            </div>
            {technical.score !== undefined && (
              <div className="mb-4 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                <div
                  className={`h-full ${technical.score >= 8 ? 'bg-green-500' : technical.score >= 6 ? 'bg-yellow-500' : 'bg-red-500'}`}
                  style={{ width: `${technical.score * 10}%` }}
                />
              </div>
            )}
            <p className="text-sm text-gray-400 leading-relaxed">{technical.assessment}</p>
          </div>
        )}

        {/* Operational Feasibility */}
        {data.operationalFeasibility && (
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Settings size={18} className="text-white" />
                <h3 className="text-base font-bold text-white">Operational Feasibility</h3>
              </div>
              {operational.score !== undefined && (
                <div className={`text-2xl font-bold ${getScoreColor(operational.score)}`}>
                  {operational.score}/10
                </div>
              )}
            </div>
            {operational.score !== undefined && (
              <div className="mb-4 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                <div
                  className={`h-full ${operational.score >= 8 ? 'bg-green-500' : operational.score >= 6 ? 'bg-yellow-500' : 'bg-red-500'}`}
                  style={{ width: `${operational.score * 10}%` }}
                />
              </div>
            )}
            <p className="text-sm text-gray-400 leading-relaxed">{operational.assessment}</p>
          </div>
        )}

        {/* Financial Feasibility */}
        {data.financialFeasibility && (
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <DollarSign size={18} className="text-white" />
                <h3 className="text-base font-bold text-white">Financial Feasibility</h3>
              </div>
              {financial.score !== undefined && (
                <div className={`text-2xl font-bold ${getScoreColor(financial.score)}`}>
                  {financial.score}/10
                </div>
              )}
            </div>
            {financial.score !== undefined && (
              <div className="mb-4 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                <div
                  className={`h-full ${financial.score >= 8 ? 'bg-green-500' : financial.score >= 6 ? 'bg-yellow-500' : 'bg-red-500'}`}
                  style={{ width: `${financial.score * 10}%` }}
                />
              </div>
            )}
            <p className="text-sm text-gray-400 leading-relaxed">{financial.assessment}</p>
          </div>
        )}
      </div>

      {/* Recommendations */}
      {data.recommendations && data.recommendations.length > 0 && (
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-bold text-white mb-4">Recommendations</h3>
          <ul className="space-y-2">
            {data.recommendations.map((rec, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-gray-300">
                <span className="text-blue-500 mt-0.5">•</span>
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FeasibilitySection;
