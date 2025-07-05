const { GoogleGenerativeAI } = require('@google/generative-ai');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

async function testGeminiAPI() {
  try {
    console.log('🔑 Testing Gemini API key...');
    console.log('API Key (first 10 chars):', process.env.GEMINI_API_KEY?.substring(0, 10) + '...');
    
    if (!process.env.GEMINI_API_KEY) {
      console.log('❌ No API key found in environment variables');
      return;
    }

    // Initialize Gemini
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    console.log('🤖 Sending test request to Gemini...');
    
    // Simple test prompt
    const result = await model.generateContent('Say "Hello, Gemini is working!"');
    const response = await result.response;
    const text = response.text();
    
    console.log('✅ Gemini API is working!');
    console.log('📝 Response:', text);
    
  } catch (error) {
    console.log('❌ Gemini API Error:', error.message);
    
    if (error.message.includes('API key')) {
      console.log('💡 This might be an API key issue. Check:');
      console.log('   - Key is valid and not expired');
      console.log('   - Key has access to Gemini API');
      console.log('   - Billing is enabled if required');
    } else if (error.message.includes('quota')) {
      console.log('💡 This might be a quota issue. Check:');
      console.log('   - Daily/monthly quota limits');
      console.log('   - Billing status');
    } else {
      console.log('💡 This might be a network or service issue.');
    }
  }
}

// Run the test
testGeminiAPI(); 