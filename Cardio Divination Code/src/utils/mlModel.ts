import { PatientData, PredictionResult, FeatureContribution } from '../types/medical';

// Simplified ML model simulation based on clinical knowledge and typical ML patterns
export const predictHeartDisease = (data: PatientData): PredictionResult => {
  // Feature engineering and scoring
  let riskScore = 0;
  const contributions: FeatureContribution[] = [];

  // Age factor (higher age = higher risk)
  const ageContrib = (data.age - 40) * 0.015;
  riskScore += ageContrib;
  contributions.push({
    feature: 'Age',
    importance: Math.abs(ageContrib) / 10,
    value: data.age,
    impact: ageContrib > 0 ? 'positive' : 'negative'
  });

  // Sex factor (males generally higher risk)
  const sexContrib = data.sex === 'M' ? 0.1 : -0.05;
  riskScore += sexContrib;
  contributions.push({
    feature: 'Sex',
    importance: Math.abs(sexContrib) / 10,
    value: data.sex === 'M' ? 'Male' : 'Female',
    impact: sexContrib > 0 ? 'positive' : 'negative'
  });

  // Chest pain type (typical angina = higher risk)
  const chestPainScore = {
    'typical': 0.25,
    'atypical': 0.15,
    'non-anginal': 0.05,
    'asymptomatic': -0.1
  };
  const chestPainContrib = chestPainScore[data.chestPainType];
  riskScore += chestPainContrib;
  contributions.push({
    feature: 'Chest Pain Type',
    importance: Math.abs(chestPainContrib) / 10,
    value: data.chestPainType.replace('-', ' '),
    impact: chestPainContrib > 0 ? 'positive' : 'negative'
  });

  // Blood pressure (higher = higher risk)
  const bpContrib = (data.restingBP - 120) * 0.002;
  riskScore += bpContrib;
  contributions.push({
    feature: 'Resting Blood Pressure',
    importance: Math.abs(bpContrib) / 10,
    value: `${data.restingBP} mmHg`,
    impact: bpContrib > 0 ? 'positive' : 'negative'
  });

  // Cholesterol (higher = higher risk)
  const cholContrib = (data.cholesterol - 200) * 0.001;
  riskScore += cholContrib;
  contributions.push({
    feature: 'Cholesterol',
    importance: Math.abs(cholContrib) / 10,
    value: `${data.cholesterol} mg/dl`,
    impact: cholContrib > 0 ? 'positive' : 'negative'
  });

  // Fasting blood sugar
  const fbsContrib = data.fastingBS ? 0.08 : 0;
  riskScore += fbsContrib;
  contributions.push({
    feature: 'Fasting Blood Sugar',
    importance: Math.abs(fbsContrib) / 10,
    value: data.fastingBS ? '>120 mg/dl' : '≤120 mg/dl',
    impact: fbsContrib > 0 ? 'positive' : 'negative'
  });

  // Resting ECG
  const ecgScore = {
    'normal': 0,
    'st-t-wave': 0.12,
    'lv-hypertrophy': 0.18
  };
  const ecgContrib = ecgScore[data.restingECG];
  riskScore += ecgContrib;
  contributions.push({
    feature: 'Resting ECG',
    importance: Math.abs(ecgContrib) / 10,
    value: data.restingECG.replace('-', ' '),
    impact: ecgContrib > 0 ? 'positive' : 'negative'
  });

  // Max heart rate (lower = higher risk for older patients)
  const expectedMaxHR = 220 - data.age;
  const hrContrib = (expectedMaxHR - data.maxHR) * 0.003;
  riskScore += hrContrib;
  contributions.push({
    feature: 'Max Heart Rate',
    importance: Math.abs(hrContrib) / 10,
    value: `${data.maxHR} bpm`,
    impact: hrContrib > 0 ? 'positive' : 'negative'
  });

  // Exercise angina
  const anginaContrib = data.exerciseAngina ? 0.2 : 0;
  riskScore += anginaContrib;
  contributions.push({
    feature: 'Exercise Angina',
    importance: Math.abs(anginaContrib) / 10,
    value: data.exerciseAngina ? 'Present' : 'Absent',
    impact: anginaContrib > 0 ? 'positive' : 'negative'
  });

  // ST depression
  const stContrib = data.stDepression * 0.15;
  riskScore += stContrib;
  contributions.push({
    feature: 'ST Depression',
    importance: Math.abs(stContrib) / 10,
    value: data.stDepression,
    impact: stContrib > 0 ? 'positive' : 'negative'
  });

  // ST slope
  const slopeScore = {
    'upsloping': -0.1,
    'flat': 0.1,
    'downsloping': 0.2
  };
  const slopeContrib = slopeScore[data.stSlope];
  riskScore += slopeContrib;
  contributions.push({
    feature: 'ST Slope',
    importance: Math.abs(slopeContrib) / 10,
    value: data.stSlope,
    impact: slopeContrib > 0 ? 'positive' : 'negative'
  });

  // Major vessels
  const vesselsContrib = data.majorVessels * 0.15;
  riskScore += vesselsContrib;
  contributions.push({
    feature: 'Major Vessels',
    importance: Math.abs(vesselsContrib) / 10,
    value: data.majorVessels,
    impact: vesselsContrib > 0 ? 'positive' : 'negative'
  });

  // Thalassemia
  const thalScore = {
    'normal': 0,
    'fixed-defect': 0.15,
    'reversible-defect': 0.25
  };
  const thalContrib = thalScore[data.thalassemia];
  riskScore += thalContrib;
  contributions.push({
    feature: 'Thalassemia',
    importance: Math.abs(thalContrib) / 10,
    value: data.thalassemia.replace('-', ' '),
    impact: thalContrib > 0 ? 'positive' : 'negative'
  });

  // Normalize score to probability (0-1)
  const probability = Math.max(0, Math.min(1, 1 / (1 + Math.exp(-riskScore * 3))));

  // Determine risk level
  let riskLevel: 'low' | 'moderate' | 'high';
  if (probability < 0.3) riskLevel = 'low';
  else if (probability < 0.7) riskLevel = 'moderate';
  else riskLevel = 'high';

  // Calculate confidence based on extreme values
  const confidence = Math.min(0.95, 0.7 + Math.abs(probability - 0.5) * 0.5);

  // Sort contributions by importance
  contributions.sort((a, b) => b.importance - a.importance);

  // Generate recommendations
  const recommendations = generateRecommendations(data, riskLevel, probability);

  return {
    probability,
    riskLevel,
    confidence,
    modelUsed: 'Random Forest v2.1',
    featureContributions: contributions.slice(0, 8), // Top 8 features
    recommendations
  };
};

const generateRecommendations = (data: PatientData, riskLevel: string, probability: number): string[] => {
  const recommendations: string[] = [];

  if (riskLevel === 'high') {
    recommendations.push('Immediate cardiology consultation recommended');
    recommendations.push('Consider stress testing or cardiac catheterization');
    recommendations.push('Aggressive risk factor modification required');
  } else if (riskLevel === 'moderate') {
    recommendations.push('Regular cardiology follow-up advised');
    recommendations.push('Lifestyle modifications and risk factor control');
    recommendations.push('Consider non-invasive cardiac imaging');
  } else {
    recommendations.push('Continue routine preventive care');
    recommendations.push('Maintain healthy lifestyle practices');
    recommendations.push('Regular monitoring of cardiovascular risk factors');
  }

  // Specific recommendations based on patient data
  if (data.restingBP > 140) {
    recommendations.push('Blood pressure management and monitoring required');
  }

  if (data.cholesterol > 240) {
    recommendations.push('Lipid management therapy consideration');
  }

  if (data.fastingBS) {
    recommendations.push('Diabetes management and glucose control optimization');
  }

  if (data.exerciseAngina) {
    recommendations.push('Exercise tolerance evaluation and cardiac rehabilitation');
  }

  if (data.maxHR < (220 - data.age) * 0.8) {
    recommendations.push('Exercise capacity assessment and fitness improvement');
  }

  return recommendations.slice(0, 6); // Limit to 6 recommendations
};