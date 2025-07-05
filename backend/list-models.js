const dotenv = require('dotenv');
dotenv.config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function listModels() {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const models = await genAI.listModels();
    console.log('Available models:');
    for (const model of models.models) {
      console.log('-', model.name);
    }
  } catch (error) {
    console.error('Error listing models:', error.message);
  }
}

listModels(); 