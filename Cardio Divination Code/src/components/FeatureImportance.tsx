import React from 'react';
import { BarChart3, TrendingUp, AlertCircle } from 'lucide-react';

const FeatureImportance: React.FC = () => {
  const featureImportanceData = [
    { feature: 'ST Depression', importance: 0.18, description: 'Exercise-induced ST depression relative to rest', category: 'ECG' },
    { feature: 'Chest Pain Type', importance: 0.16, description: 'Type of chest pain experienced by patient', category: 'Symptoms' },
    { feature: 'Major Vessels', importance: 0.14, description: 'Number of major vessels colored by fluoroscopy', category: 'Imaging' },
    { feature: 'Thalassemia', importance: 0.12, description: 'Blood disorder affecting hemoglobin', category: 'Blood Test' },
    { feature: 'Max Heart Rate', importance: 0.11, description: 'Maximum heart rate achieved during exercise', category: 'Exercise' },
    { feature: 'Exercise Angina', importance: 0.10, description: 'Exercise-induced angina presence', category: 'Exercise' },
    { feature: 'Age', importance: 0.08, description: 'Patient age in years', category: 'Demographics' },
    { feature: 'ST Slope', importance: 0.06, description: 'Slope of peak exercise ST segment', category: 'ECG' },
    { feature: 'Sex', importance: 0.05, description: 'Patient biological sex', category: 'Demographics' },
    { feature: 'Resting BP', importance: 0.04, description: 'Resting blood pressure in mmHg', category: 'Vitals' },
    { feature: 'Cholesterol', importance: 0.03, description: 'Serum cholesterol level in mg/dl', category: 'Blood Test' },
    { feature: 'Fasting Blood Sugar', importance: 0.02, description: 'Fasting blood sugar > 120 mg/dl', category: 'Blood Test' },
    { feature: 'Resting ECG', importance: 0.01, description: 'Resting electrocardiographic results', category: 'ECG' }
  ];

  const categories = {
    'ECG': { color: 'bg-blue-500', bgColor: 'bg-blue-50', textColor: 'text-blue-700' },
    'Symptoms': { color: 'bg-red-500', bgColor: 'bg-red-50', textColor: 'text-red-700' },
    'Imaging': { color: 'bg-purple-500', bgColor: 'bg-purple-50', textColor: 'text-purple-700' },
    'Blood Test': { color: 'bg-green-500', bgColor: 'bg-green-50', textColor: 'text-green-700' },
    'Exercise': { color: 'bg-orange-500', bgColor: 'bg-orange-50', textColor: 'text-orange-700' },
    'Demographics': { color: 'bg-teal-500', bgColor: 'bg-teal-50', textColor: 'text-teal-700' },
    'Vitals': { color: 'bg-pink-500', bgColor: 'bg-pink-50', textColor: 'text-pink-700' }
  };

  const getTopFeatures = (n: number) => {
    return featureImportanceData.slice(0, n);
  };

  const getCategoryImportance = () => {
    const categoryTotals: { [key: string]: number } = {};
    featureImportanceData.forEach(item => {
      categoryTotals[item.category] = (categoryTotals[item.category] || 0) + item.importance;
    });
    return Object.entries(categoryTotals)
      .map(([category, importance]) => ({ category, importance }))
      .sort((a, b) => b.importance - a.importance);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Feature Importance Analysis</h2>
        <p className="text-lg text-gray-600">Understanding which clinical factors most influence heart disease prediction</p>
      </div>

      {/* Top Features Overview */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
          <div className="flex items-center space-x-3">
            <TrendingUp className="h-5 w-5 text-white" />
            <h3 className="text-lg font-semibold text-white">Top 5 Most Important Features</h3>
          </div>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {getTopFeatures(5).map((feature, index) => (
              <div key={index} className={`p-4 rounded-lg border-2 ${categories[feature.category as keyof typeof categories].bgColor} ${categories[feature.category as keyof typeof categories].textColor.replace('text-', 'border-')}`}>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">{feature.feature}</h4>
                  <span className="text-sm font-medium">{(feature.importance * 100).toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div
                    className={`h-2 rounded-full ${categories[feature.category as keyof typeof categories].color}`}
                    style={{ width: `${feature.importance * 100}%` }}
                  />
                </div>
                <p className="text-xs opacity-75">{feature.description}</p>
                <span className={`inline-block mt-2 px-2 py-1 rounded-full text-xs font-medium ${categories[feature.category as keyof typeof categories].bgColor} ${categories[feature.category as keyof typeof categories].textColor}`}>
                  {feature.category}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* All Features Ranking */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-green-600 to-teal-600 px-6 py-4">
          <div className="flex items-center space-x-3">
            <BarChart3 className="h-5 w-5 text-white" />
            <h3 className="text-lg font-semibold text-white">Complete Feature Ranking</h3>
          </div>
        </div>
        
        <div className="p-6">
          <div className="space-y-3">
            {featureImportanceData.map((feature, index) => (
              <div key={index} className="flex items-center space-x-4 p-3 rounded-lg bg-gray-50 border border-gray-200 hover:bg-gray-100 transition-colors">
                <div className="flex-shrink-0 w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-sm font-medium text-gray-700">
                  {index + 1}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium text-gray-900">{feature.feature}</h4>
                    <span className="text-sm font-medium text-gray-700">{(feature.importance * 100).toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                    <div
                      className={`h-2 rounded-full ${categories[feature.category as keyof typeof categories].color}`}
                      style={{ width: `${(feature.importance / featureImportanceData[0].importance) * 100}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-600">{feature.description}</p>
                </div>
                
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${categories[feature.category as keyof typeof categories].bgColor} ${categories[feature.category as keyof typeof categories].textColor}`}>
                  {feature.category}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Category Analysis */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-4">
          <div className="flex items-center space-x-3">
            <BarChart3 className="h-5 w-5 text-white" />
            <h3 className="text-lg font-semibold text-white">Feature Category Analysis</h3>
          </div>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-700 mb-4">Category Importance</h4>
              <div className="space-y-3">
                {getCategoryImportance().map(({ category, importance }, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded ${categories[category as keyof typeof categories].color}`} />
                    <span className="flex-1 text-sm font-medium text-gray-700">{category}</span>
                    <span className="text-sm font-medium text-gray-900">{(importance * 100).toFixed(1)}%</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-700 mb-4">Clinical Insights</h4>
              <div className="space-y-3">
                <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-blue-900">ECG Findings</p>
                    <p className="text-xs text-blue-700">ST depression and slope are critical indicators</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-red-50 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-red-900">Symptom Analysis</p>
                    <p className="text-xs text-red-700">Chest pain type is a strong predictor</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-purple-50 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-purple-900">Imaging Results</p>
                    <p className="text-xs text-purple-700">Vessel involvement significantly impacts risk</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Methodology Note */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200 p-6">
        <div className="flex items-start space-x-3">
          <AlertCircle className="h-5 w-5 text-gray-600 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-gray-900 mb-1">Feature Importance Methodology</h4>
            <p className="text-sm text-gray-700">
              Feature importance scores were calculated using Random Forest's built-in feature importance, 
              which measures the average decrease in impurity when a feature is used for splitting across all trees. 
              SHAP (SHapley Additive exPlanations) values were also computed to provide model-agnostic explanations 
              and understand individual prediction contributions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureImportance;