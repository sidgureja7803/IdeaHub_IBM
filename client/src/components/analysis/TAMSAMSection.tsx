import React from 'react';
import { DollarSign, BarChart3 } from 'lucide-react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface TAMSAMProps {
  tam: { value: string; percentage: number };
  sam: { value: string; percentage: number };
  som: { value: string; percentage: number };
  segments?: Array<{ name: string; description: string; value: string }>;
}

const TAMSAMSection: React.FC<TAMSAMProps> = ({
  tam,
  sam,
  som,
  segments = []
}) => {
  // Professional donut chart configuration
  const chartData = {
    labels: ['TAM', 'SAM', 'SOM'],
    datasets: [
      {
        data: [tam.percentage, sam.percentage, som.percentage],
        backgroundColor: [
          'rgba(139, 92, 246, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)'
        ],
        borderColor: [
          'rgba(139, 92, 246, 1)',
          'rgba(59, 130, 246, 1)',
          'rgba(16, 185, 129, 1)'
        ],
        borderWidth: 2,
        cutout: '65%'
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: 'rgba(139, 92, 246, 0.5)',
        borderWidth: 1,
        padding: 12,
        callbacks: {
          label: function (context: any) {
            return `${context.label}: ${context.parsed}%`;
          }
        }
      }
    }
  };

  // Mock segment data if not provided
  const segmentData = segments.length > 0 ? segments : [
    { name: 'Budgeting Gamified Lessons', description: 'Lessons: 148,247', value: '$0.2B' },
    { name: 'Goal Management Frameworks', description: 'Lessons: 148,247', value: '$0.1B' },
    { name: 'Invest Education and Challenges', description: 'Lessons: 148,247', value: '$0.1B' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">TAM/SAM/SOM Analysis</h2>
        <p className="text-sm text-gray-500">Market size distribution and segments</p>
      </div>

      {/* Market Size Distribution */}
      <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
        <div className="flex items-center gap-2 mb-6">
          <DollarSign size={18} className="text-white" />
          <h3 className="text-lg font-bold text-white">Market Size Distribution</h3>
        </div>

        <div className="flex items-center justify-between">
          {/* Chart */}
          <div className="w-48 h-48">
            <Doughnut data={chartData} options={chartOptions} />
          </div>

          {/* Market Breakdown */}
          <div className="flex-1 ml-8 space-y-4">
            <p className="text-sm font-bold text-gray-400 mb-4">Market Breakdown</p>

            {/* TAM */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                <div>
                  <p className="text-sm font-medium text-white">TAM</p>
                  <p className="text-xs text-gray-500">Total Addressable Market ({tam.percentage}%)</p>
                </div>
              </div>
              <p className="text-lg font-bold text-white">{tam.value}</p>
            </div>

            {/* SAM */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <div>
                  <p className="text-sm font-medium text-white">SAM</p>
                  <p className="text-xs text-gray-500">Serviceable Addressable Market ({sam.percentage}%)</p>
                </div>
              </div>
              <p className="text-lg font-bold text-white">{sam.value}</p>
            </div>

            {/* SOM */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <div>
                  <p className="text-sm font-medium text-white">SOM</p>
                  <p className="text-xs text-gray-500">Serviceable Obtainable Market ({som.percentage}%)</p>
                </div>
              </div>
              <p className="text-lg font-bold text-white">{som.value}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Market Segments */}
      <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
        <div className="flex items-center gap-2 mb-6">
          <BarChart3 size={18} className="text-white" />
          <h3 className="text-lg font-bold text-white">Market Segments</h3>
        </div>

        <div className="mb-4">
          <p className="text-sm font-bold text-gray-400 mb-1">Segment Breakdown</p>
        </div>

        <div className="space-y-4">
          {segmentData.map((segment, index) => (
            <div key={index} className="flex items-center justify-between border-b border-gray-800 last:border-0 pb-3 last:pb-0">
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <div>
                  <p className="text-sm font-medium text-white">{segment.name}</p>
                  <p className="text-xs text-gray-500">{segment.description}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-white">{segment.value}</p>
                <div className="w-32 h-1.5 bg-gray-800 rounded-full mt-1">
                  <div
                    className="h-full bg-blue-500 rounded-full"
                    style={{ width: `${(100 / (index + 1))}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TAMSAMSection;
