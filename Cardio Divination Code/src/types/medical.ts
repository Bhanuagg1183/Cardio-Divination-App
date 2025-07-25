export interface PatientData {
  age: number;
  sex: 'M' | 'F';
  chestPainType: 'typical' | 'atypical' | 'non-anginal' | 'asymptomatic';
  restingBP: number;
  cholesterol: number;
  fastingBS: boolean;
  restingECG: 'normal' | 'st-t-wave' | 'lv-hypertrophy';
  maxHR: number;
  exerciseAngina: boolean;
  stDepression: number;
  stSlope: 'upsloping' | 'flat' | 'downsloping';
  majorVessels: number;
  thalassemia: 'normal' | 'fixed-defect' | 'reversible-defect';
}

export interface PredictionResult {
  probability: number;
  riskLevel: 'low' | 'moderate' | 'high';
  confidence: number;
  modelUsed: string;
  featureContributions: FeatureContribution[];
  recommendations: string[];
}

export interface FeatureContribution {
  feature: string;
  importance: number;
  value: string | number;
  impact: 'positive' | 'negative' | 'neutral';
}

export interface ModelMetrics {
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  rocAuc: number;
  specificity: number;
}

export interface FeatureImportanceData {
  feature: string;
  importance: number;
  description: string;
}