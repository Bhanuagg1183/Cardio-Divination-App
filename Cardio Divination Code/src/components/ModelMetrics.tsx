import React from 'react';
import { BarChart3, Target, TrendingUp, Activity } from 'lucide-react';

const ModelMetrics: React.FC = () => {
  const metrics = {
    accuracy: 0.87,
    precision: 0.84,
    recall: 0.89,
    f1Score: 0.86,
    rocAuc: 0.92,
    specificity: 0.85
  };

  const modelComparison = [
    { name: 'Random Forest', accuracy: 0.87, precision: 0.84, recall: 0.89, f1: 0.86 },
    { name: 'XGBoost', accuracy: 0.85, precision: 0.82, recall: 0.87, f1: 0.84 },
    { name: 'Logistic Regression', accuracy: 0.81, precision: 0.78, recall: 0.84, f1: 0.81 },
    { name: 'SVM', accuracy: 0.83, precision: 0.80, recall: 0.86, f1: 0.83 }
  ];

  const crossValidationScores = [0.85, 0.87, 0.86, 0.88, 0.84, 0.89, 0.87, 0.85, 0.88, 0.86];

  const MetricCard = ({ icon: Icon, title, value, description, color }: any) => (
    <div className={`bg-white rounded-lg border-2 ${color} p-4`}>
      <div className="flex items-center space-x-3 mb-2">
        <Icon className="h-5 w-5" />
        <h3 className="font-semibold">{title}</h3>
      </div>
      <div className="text-2xl font-bold mb-1">{(value * 100).toFixed(1)}%</div>
      <p className="text-sm opacity-75">{description}</p>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Model Performance Metrics</h2>
        <p className="text-lg text-gray-600">Comprehensive evaluation of the heart disease prediction model</p>
      </div>

      {/* Main Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <MetricCard
          icon={Target}
          title="Accuracy"
          value={metrics.accuracy}
          description="Overall prediction correctness"
          color="border-blue-200 bg-blue-50 text-blue-700"
        />
        <MetricCard
          icon={TrendingUp}
          title="Precision"
          value={metrics.precision}
          description="True positive rate"
          color="border-green-200 bg-green-50 text-green-700"
        />
        <MetricCard
          icon={Activity}
          title="Recall"
          value={metrics.recall}
          description="Sensitivity to positive cases"
          color="border-purple-200 bg-purple-50 text-purple-700"
        />
        <MetricCard
          icon={BarChart3}
          title="F1-Score"
          value={metrics.f1Score}
          description="Harmonic mean of precision & recall"
          color="border-orange-200 bg-orange-50 text-orange-700"
        />
        <MetricCard
          icon={Target}
          title="ROC-AUC"
          value={metrics.rocAuc}
          description="Area under ROC curve"
          color="border-teal-200 bg-teal-50 text-teal-700"
        />
        <MetricCard
          icon={Activity}
          title="Specificity"
          value={metrics.specificity}
          description="True negative rate"
          color="border-red-200 bg-red-50 text-red-700"
        />
      </div>

      {/* Model Comparison */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
          <h3 className="text-lg font-semibold text-white">Model Comparison</h3>
        </div>
        
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Algorithm</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-700">Accuracy</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-700">Precision</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-700">Recall</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-700">F1-Score</th>
                </tr>
              </thead>
              <tbody>
                {modelComparison.map((model, index) => (
                  <tr key={index} className={`border-b border-gray-100 ${index === 0 ? 'bg-blue-50' : ''}`}>
                    <td className="py-3 px-4 font-medium">
                      {model.name}
                      {index === 0 && <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Best</span>}
                    </td>
                    <td className="text-center py-3 px-4">{(model.accuracy * 100).toFixed(1)}%</td>
                    <td className="text-center py-3 px-4">{(model.precision * 100).toFixed(1)}%</td>
                    <td className="text-center py-3 px-4">{(model.recall * 100).toFixed(1)}%</td>
                    <td className="text-center py-3 px-4">{(model.f1 * 100).toFixed(1)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Cross-Validation Results */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-green-600 to-teal-600 px-6 py-4">
          <h3 className="text-lg font-semibold text-white">Cross-Validation Results</h3>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-700 mb-3">10-Fold CV Scores</h4>
              <div className="space-y-2">
                {crossValidationScores.map((score, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <span className="text-sm text-gray-600 w-16">Fold {index + 1}:</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${score * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-700 w-12">{(score * 100).toFixed(1)}%</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-700 mb-3">Statistical Summary</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">Mean Score:</span>
                  <span className="font-semibold text-gray-900">
                    {(crossValidationScores.reduce((a, b) => a + b, 0) / crossValidationScores.length * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">Standard Deviation:</span>
                  <span className="font-semibold text-gray-900">±1.4%</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">Best Score:</span>
                  <span className="font-semibold text-green-700">{(Math.max(...crossValidationScores) * 100).toFixed(1)}%</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">Worst Score:</span>
                  <span className="font-semibold text-red-700">{(Math.min(...crossValidationScores) * 100).toFixed(1)}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Training Information */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-4">
          <h3 className="text-lg font-semibold text-white">Training Information</h3>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">918</div>
              <div className="text-sm text-gray-600">Training Samples</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">13</div>
              <div className="text-sm text-gray-600">Features</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">2.3s</div>
              <div className="text-sm text-gray-600">Training Time</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">v2.1</div>
              <div className="text-sm text-gray-600">Model Version</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelMetrics;