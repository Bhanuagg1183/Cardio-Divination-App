import React from 'react';
import { Heart, TrendingUp, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import { PredictionResult, PatientData } from '../types/medical';

interface PredictionResultsProps {
  prediction: PredictionResult;
  patientData: PatientData;
}

const PredictionResults: React.FC<PredictionResultsProps> = ({ prediction, patientData }) => {
  const getRiskColor = (level: string) => {
    switch (level) {
      case 'low': return 'text-green-700 bg-green-100 border-green-200';
      case 'moderate': return 'text-yellow-700 bg-yellow-100 border-yellow-200';
      case 'high': return 'text-red-700 bg-red-100 border-red-200';
      default: return 'text-gray-700 bg-gray-100 border-gray-200';
    }
  };

  const getRiskIcon = (level: string) => {
    switch (level) {
      case 'low': return <CheckCircle className="h-5 w-5" />;
      case 'moderate': return <AlertTriangle className="h-5 w-5" />;
      case 'high': return <Heart className="h-5 w-5" />;
      default: return <Info className="h-5 w-5" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Main Prediction Card */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
          <h2 className="text-xl font-bold text-white">Risk Assessment Results</h2>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Risk Level */}
            <div className={`p-4 rounded-lg border-2 ${getRiskColor(prediction.riskLevel)}`}>
              <div className="flex items-center space-x-3">
                {getRiskIcon(prediction.riskLevel)}
                <div>
                  <h3 className="font-semibold text-lg capitalize">{prediction.riskLevel} Risk</h3>
                  <p className="text-sm opacity-75">Heart Disease Probability</p>
                </div>
              </div>
              <div className="mt-3">
                <div className="text-3xl font-bold">{Math.round(prediction.probability * 100)}%</div>
              </div>
            </div>

            {/* Confidence Score */}
            <div className="p-4 rounded-lg border-2 border-blue-200 bg-blue-50">
              <div className="flex items-center space-x-3">
                <TrendingUp className="h-5 w-5 text-blue-700" />
                <div>
                  <h3 className="font-semibold text-lg text-blue-700">Confidence</h3>
                  <p className="text-sm text-blue-600">Model Certainty</p>
                </div>
              </div>
              <div className="mt-3">
                <div className="text-3xl font-bold text-blue-700">{Math.round(prediction.confidence * 100)}%</div>
              </div>
            </div>

            {/* Model Used */}
            <div className="p-4 rounded-lg border-2 border-gray-200 bg-gray-50">
              <div className="flex items-center space-x-3">
                <Info className="h-5 w-5 text-gray-700" />
                <div>
                  <h3 className="font-semibold text-lg text-gray-700">Model</h3>
                  <p className="text-sm text-gray-600">Algorithm Used</p>
                </div>
              </div>
              <div className="mt-3">
                <div className="text-lg font-bold text-gray-700">{prediction.modelUsed}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Contributions */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-teal-600 to-green-600 px-6 py-4">
          <h3 className="text-lg font-semibold text-white">Feature Impact Analysis</h3>
        </div>
        
        <div className="p-6">
          <div className="space-y-4">
            {prediction.featureContributions.map((contribution, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 border border-gray-200">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{contribution.feature}</h4>
                  <p className="text-sm text-gray-600">Value: {contribution.value}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        contribution.impact === 'positive' ? 'bg-red-500' :
                        contribution.impact === 'negative' ? 'bg-green-500' : 'bg-gray-400'
                      }`}
                      style={{ width: `${Math.abs(contribution.importance) * 100}%` }}
                    />
                  </div>
                  <span className={`text-sm font-medium ${
                    contribution.impact === 'positive' ? 'text-red-600' :
                    contribution.impact === 'negative' ? 'text-green-600' : 'text-gray-600'
                  }`}>
                    {contribution.importance > 0 ? '+' : ''}{(contribution.importance * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-green-600 to-teal-600 px-6 py-4">
          <h3 className="text-lg font-semibold text-white">Clinical Recommendations</h3>
        </div>
        
        <div className="p-6">
          <div className="space-y-3">
            {prediction.recommendations.map((recommendation, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-green-50 border border-green-200">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <p className="text-gray-700">{recommendation}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Patient Summary */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-4">
          <h3 className="text-lg font-semibold text-white">Patient Summary</h3>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Age:</span>
              <span className="ml-2 font-medium">{patientData.age} years</span>
            </div>
            <div>
              <span className="text-gray-600">Sex:</span>
              <span className="ml-2 font-medium">{patientData.sex === 'M' ? 'Male' : 'Female'}</span>
            </div>
            <div>
              <span className="text-gray-600">BP:</span>
              <span className="ml-2 font-medium">{patientData.restingBP} mmHg</span>
            </div>
            <div>
              <span className="text-gray-600">Cholesterol:</span>
              <span className="ml-2 font-medium">{patientData.cholesterol} mg/dl</span>
            </div>
            <div>
              <span className="text-gray-600">Max HR:</span>
              <span className="ml-2 font-medium">{patientData.maxHR} bpm</span>
            </div>
            <div>
              <span className="text-gray-600">Chest Pain:</span>
              <span className="ml-2 font-medium capitalize">{patientData.chestPainType.replace('-', ' ')}</span>
            </div>
            <div>
              <span className="text-gray-600">Exercise Angina:</span>
              <span className="ml-2 font-medium">{patientData.exerciseAngina ? 'Yes' : 'No'}</span>
            </div>
            <div>
              <span className="text-gray-600">Major Vessels:</span>
              <span className="ml-2 font-medium">{patientData.majorVessels}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictionResults;