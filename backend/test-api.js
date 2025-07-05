const fetch = require('node-fetch');

const BASE_URL = 'http://localhost:3001';

async function testHealth() {
  try {
    console.log('🏥 Testing health endpoint...');
    const response = await fetch(`${BASE_URL}/health`);
    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ Health check passed:', data);
    } else {
      console.log('❌ Health check failed:', data);
    }
  } catch (error) {
    console.log('❌ Health check error:', error.message);
  }
}

async function testGenerateExtension(prompt) {
  try {
    console.log('🔧 Testing extension generation...');
    console.log('📝 Prompt:', prompt);
    
    const response = await fetch(`${BASE_URL}/generate-extension`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt })
    });
    
    if (response.ok) {
      const contentType = response.headers.get('content-type');
      
      if (contentType && contentType.includes('application/zip')) {
        console.log('✅ Extension generation successful - ZIP file received');
        console.log('📦 Content-Type:', contentType);
        console.log('📏 Content-Length:', response.headers.get('content-length'));
      } else {
        const data = await response.json();
        console.log('✅ Extension generation response:', data);
      }
    } else {
      const error = await response.json();
      console.log('❌ Extension generation failed:', error);
    }
  } catch (error) {
    console.log('❌ Extension generation error:', error.message);
  }
}

async function testInvalidRequest() {
  try {
    console.log('🚫 Testing invalid request...');
    
    const response = await fetch(`${BASE_URL}/generate-extension`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: '' })
    });
    
    const data = await response.json();
    
    if (response.status === 400) {
      console.log('✅ Invalid request properly rejected:', data);
    } else {
      console.log('❌ Invalid request not properly handled:', data);
    }
  } catch (error) {
    console.log('❌ Invalid request test error:', error.message);
  }
}

async function runTests() {
  console.log('🧪 Starting API tests...\n');
  
  await testHealth();
  console.log('');
  
  await testInvalidRequest();
  console.log('');
  
  await testGenerateExtension('Create a simple dark mode toggle extension');
  console.log('');
  
  console.log('🏁 Tests completed!');
}

// Run tests if this file is executed directly
if (require.main === module) {
  runTests().catch(console.error);
}

module.exports = {
  testHealth,
  testGenerateExtension,
  testInvalidRequest,
  runTests
}; 