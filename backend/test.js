const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Prompt2Plugin Backend is running' });
});

// Test endpoint that returns a mock extension
app.post('/generate-extension', async (req, res) => {
  try {
    const { prompt } = req.body;

    // Validate request
    if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
      return res.status(400).json({
        error: 'Invalid request',
        message: 'Prompt is required and must be a non-empty string'
      });
    }

    console.log('Received prompt:', prompt);

    // Return a mock response for testing
    res.json({
      message: 'Test mode - Extension generation would happen here',
      receivedPrompt: prompt,
      note: 'This is a test endpoint. In production, this would return a ZIP file.'
    });

  } catch (error) {
    console.error('Error in test endpoint:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Test endpoint error'
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    error: 'Internal Server Error',
    message: 'Something went wrong on the server'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: 'The requested endpoint does not exist'
  });
});

app.listen(PORT, () => {
  console.log(`🧪 Prompt2Plugin Backend (TEST MODE) running on port ${PORT}`);
  console.log(`📡 Health check: http://localhost:${PORT}/health`);
  console.log(`🔧 Test endpoint: POST http://localhost:${PORT}/generate-extension`);
  console.log(`⚠️  This is a test server - no actual AI generation will occur`);
});

module.exports = app; 