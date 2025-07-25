import React, { useState } from 'react';
import { Heart, Activity, BarChart3, User, AlertCircle, CheckCircle } from 'lucide-react';
import PatientForm from './components/PatientForm';
import PredictionResults from './components/PredictionResults';
import ModelMetrics from './components/ModelMetrics';
import FeatureImportance from './components/FeatureImportance';
import { PatientData, PredictionResult } from './types/medical';
import { predictHeartDisease } from './utils/mlModel';

function App() {
  const [patientData, setPatientData] = useState<PatientData | null>(null);
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [activeTab, setActiveTab] = useState<'input' | 'results' | 'metrics' | 'features'>('input');

  const handlePredict = (data: PatientData) => {
    setPatientData(data);
    const result = predictHeartDisease(data);
    setPrediction(result);
    setActiveTab('results');
  };

  const tabs = [
    { id: 'input', label: 'Patient Input', icon: User },
    { id: 'results', label: 'Prediction Results', icon: Heart },
    { id: 'metrics', label: 'Model Metrics', icon: BarChart3 },
    { id: 'features', label: 'Feature Importance', icon: Activity },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-teal-600 rounded-lg">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">CardioPredict AI</h1>
                <p className="text-sm text-gray-600">Heart Disease Risk Assessment</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1 text-sm text-gray-600">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>Model v2.1 Active</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              const isDisabled = tab.id !== 'input' && !prediction;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => !isDisabled && setActiveTab(tab.id as any)}
                  disabled={isDisabled}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    isActive
                      ? 'border-blue-500 text-blue-600'
                      : isDisabled
                      ? 'border-transparent text-gray-400 cursor-not-allowed'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'input' && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Patient Risk Assessment</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Enter patient clinical data to assess heart disease risk using our advanced ML model trained on clinical datasets.
              </p>
            </div>
            <PatientForm onPredict={handlePredict} />
          </div>
        )}

        {activeTab === 'results' && prediction && (
          <PredictionResults prediction={prediction} patientData={patientData!} />
        )}

        {activeTab === 'metrics' && (
          <ModelMetrics />
        )}

        {activeTab === 'features' && (
          <FeatureImportance />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <AlertCircle className="h-4 w-4" />
              <span className="text-sm font-medium">Clinical Decision Support Tool</span>
            </div>
            <p className="text-xs">
              This system is designed to assist healthcare professionals and should not replace clinical judgment. 
              Always consult with qualified medical professionals for diagnosis and treatment decisions.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;