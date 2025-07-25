import React, { useState } from 'react';
import { User, Activity, Heart, Stethoscope } from 'lucide-react';
import { PatientData } from '../types/medical';

interface PatientFormProps {
  onPredict: (data: PatientData) => void;
}

const PatientForm: React.FC<PatientFormProps> = ({ onPredict }) => {
  const [formData, setFormData] = useState<PatientData>({
    age: 50,
    sex: 'M',
    chestPainType: 'typical',
    restingBP: 120,
    cholesterol: 200,
    fastingBS: false,
    restingECG: 'normal',
    maxHR: 150,
    exerciseAngina: false,
    stDepression: 0,
    stSlope: 'upsloping',
    majorVessels: 0,
    thalassemia: 'normal'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onPredict(formData);
  };

  const handleChange = (field: keyof PatientData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        {/* Demographics Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
          <div className="flex items-center space-x-3">
            <User className="h-5 w-5 text-white" />
            <h3 className="text-lg font-semibold text-white">Patient Demographics</h3>
          </div>
        </div>
        
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
            <input
              type="number"
              min="1"
              max="120"
              value={formData.age}
              onChange={(e) => handleChange('age', parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Sex</label>
            <select
              value={formData.sex}
              onChange={(e) => handleChange('sex', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="M">Male</option>
              <option value="F">Female</option>
            </select>
          </div>
        </div>

        {/* Clinical Measurements Section */}
        <div className="bg-gradient-to-r from-teal-600 to-teal-700 px-6 py-4">
          <div className="flex items-center space-x-3">
            <Stethoscope className="h-5 w-5 text-white" />
            <h3 className="text-lg font-semibold text-white">Clinical Measurements</h3>
          </div>
        </div>
        
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Resting Blood Pressure (mmHg)</label>
            <input
              type="number"
              min="80"
              max="200"
              value={formData.restingBP}
              onChange={(e) => handleChange('restingBP', parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Cholesterol (mg/dl)</label>
            <input
              type="number"
              min="100"
              max="600"
              value={formData.cholesterol}
              onChange={(e) => handleChange('cholesterol', parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Max Heart Rate</label>
            <input
              type="number"
              min="60"
              max="220"
              value={formData.maxHR}
              onChange={(e) => handleChange('maxHR', parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">ST Depression</label>
            <input
              type="number"
              min="0"
              max="6"
              step="0.1"
              value={formData.stDepression}
              onChange={(e) => handleChange('stDepression', parseFloat(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Major Vessels (0-3)</label>
            <select
              value={formData.majorVessels}
              onChange={(e) => handleChange('majorVessels', parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value={0}>0</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
            </select>
          </div>
        </div>

        {/* Diagnostic Results Section */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-4">
          <div className="flex items-center space-x-3">
            <Activity className="h-5 w-5 text-white" />
            <h3 className="text-lg font-semibold text-white">Diagnostic Results</h3>
          </div>
        </div>
        
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Chest Pain Type</label>
            <select
              value={formData.chestPainType}
              onChange={(e) => handleChange('chestPainType', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="typical">Typical Angina</option>
              <option value="atypical">Atypical Angina</option>
              <option value="non-anginal">Non-Anginal Pain</option>
              <option value="asymptomatic">Asymptomatic</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Resting ECG</label>
            <select
              value={formData.restingECG}
              onChange={(e) => handleChange('restingECG', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="normal">Normal</option>
              <option value="st-t-wave">ST-T Wave Abnormality</option>
              <option value="lv-hypertrophy">LV Hypertrophy</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">ST Slope</label>
            <select
              value={formData.stSlope}
              onChange={(e) => handleChange('stSlope', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="upsloping">Upsloping</option>
              <option value="flat">Flat</option>
              <option value="downsloping">Downsloping</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Thalassemia</label>
            <select
              value={formData.thalassemia}
              onChange={(e) => handleChange('thalassemia', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="normal">Normal</option>
              <option value="fixed-defect">Fixed Defect</option>
              <option value="reversible-defect">Reversible Defect</option>
            </select>
          </div>
        </div>

        {/* Boolean Indicators Section */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 px-6 py-4">
          <div className="flex items-center space-x-3">
            <Heart className="h-5 w-5 text-white" />
            <h3 className="text-lg font-semibold text-white">Clinical Indicators</h3>
          </div>
        </div>
        
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="fastingBS"
              checked={formData.fastingBS}
              onChange={(e) => handleChange('fastingBS', e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="fastingBS" className="text-sm font-medium text-gray-700">
              Fasting Blood Sugar {'>'} 120 mg/dl
            </label>
          </div>
          
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="exerciseAngina"
              checked={formData.exerciseAngina}
              onChange={(e) => handleChange('exerciseAngina', e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="exerciseAngina" className="text-sm font-medium text-gray-700">
              Exercise Induced Angina
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-teal-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <Heart className="h-5 w-5" />
            <span>Analyze Heart Disease Risk</span>
          </button>
        </div>
      </div>
    </form>
  );
};

export default PatientForm;