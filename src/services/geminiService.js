const { GoogleGenAI } = require('@google/genai');

console.log('Gemini API key loaded:', !!process.env.GEMINI_API_KEY);
console.log('Gemini model:', process.env.GEMINI_MODEL);

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// Generates a personalized workout recommendation using Google Gemini
const generateWorkoutRecommendation = async (age, fitnessGoal, experience) => {
  try {
    const prompt = `Generate a personalized workout recommendation for a person with the following details:
- Age: ${age}
- Fitness Goal: ${fitnessGoal}
- Experience Level: ${experience}

Please keep the recommendation extremely direct, practical, and concise (within 2-3 paragraphs). Do not include any greeting, markdown bold stars (*), bullet points, or introductory phrases. Speak directly and provide a clear step-by-step execution plan.`;

    const response = await ai.models.generateContent({
      model: process.env.GEMINI_MODEL || 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text
      ? response.text.trim()
      : 'No recommendation could be generated.';
  } catch (error) {
    console.error('Gemini Recommendation Error:', error);

    throw new Error(
      `Gemini API Error: ${error.message || 'Unknown error'}`
    );
  }
};

// Generates personalized fitness insights using Google Gemini
const generateFitnessInsights = async (
  totalWorkouts,
  averageDuration,
  totalCaloriesBurned
) => {
  try {
    const prompt = `Analyze this user's fitness progress and generate a highly personalized, encouraging fitness insight:
- Total Workouts Logged: ${totalWorkouts}
- Average Workout Duration: ${averageDuration} minutes
- Total Calories Burned: ${totalCaloriesBurned} kcal

Please keep the insight extremely direct, actionable, and concise (within 2-3 sentences). Do not include any greeting, markdown bold stars (*), bullet points, or introductory phrases. Provide guidance on what to adjust or continue.`;

    const response = await ai.models.generateContent({
      model: process.env.GEMINI_MODEL || 'gemini-3.6-flash',
      contents: prompt,
    });

    return response.text
      ? response.text.trim()
      : 'No insight could be generated.';
  } catch (error) {
    console.error('Gemini Insights Error:', error);

    throw new Error(
      `Gemini API Error: ${error.message || 'Unknown error'}`
    );
  }
};

module.exports = {
  generateWorkoutRecommendation,
  generateFitnessInsights,
};
