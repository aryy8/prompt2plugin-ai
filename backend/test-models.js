const dotenv = require('dotenv');
dotenv.config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const modelNames = [
  'gemini-1.5-flash',
  'gemini-1.5-flash-latest',
  'models/gemini-1.5-flash',
  'models/gemini-1.5-flash-latest',
  'gemini-1.5-pro',
  'gemini-1.5-pro-latest',
  'models/gemini-1.5-pro',
  'models/gemini-1.5-pro-latest',
  'gemini-pro',
  'models/gemini-pro'
];

async function testModel(modelName) {
  try {
    console.log(`Testing model: ${modelName}`);
    const model = genAI.getGenerativeModel({ model: modelName });
    const result = await model.generateContent('Hello');
    console.log(`✅ ${modelName} - SUCCESS`);
    return modelName;
  } catch (error) {
    console.log(`❌ ${modelName} - FAILED: ${error.message}`);
    return null;
  }
}

async function testAllModels() {
  console.log('Testing different Gemini model names...\n');
  
  for (const modelName of modelNames) {
    const workingModel = await testModel(modelName);
    if (workingModel) {
      console.log(`\n🎉 Found working model: ${workingModel}`);
      return workingModel;
    }
  }
  
  console.log('\n❌ No working models found. Please check your API key and permissions.');
}

testAllModels(); 