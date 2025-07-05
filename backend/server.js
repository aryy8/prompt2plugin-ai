const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { generateExtension } = require('./services/extensionGenerator');

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

// Main extension generation endpoint
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

    // Generate extension
    const zipBuffer = await generateExtension(prompt);

    // Set headers for file download
    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', 'attachment; filename=extension.zip');
    res.setHeader('Content-Length', zipBuffer.length);

    // Send the zip file
    res.send(zipBuffer);

  } catch (error) {
    console.error('Error generating extension:', error);
    
    // Handle specific error types
    if (error.message.includes('API key')) {
      return res.status(500).json({
        error: 'Configuration Error',
        message: 'Gemini API key is not configured properly'
      });
    }

    if (error.message.includes('Gemini')) {
      return res.status(503).json({
        error: 'Service Unavailable',
        message: 'AI service is temporarily unavailable. Please try again later.'
      });
    }

    // Generic error response
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to generate extension. Please try again.'
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
  console.log(`🚀 Prompt2Plugin Backend running on port ${PORT}`);
  console.log(`📡 Health check: http://localhost:${PORT}/health`);
  console.log(`🔧 Extension generation: POST http://localhost:${PORT}/generate-extension`);
});

module.exports = app; 