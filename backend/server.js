const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const { generateExtension } = require('./services/extensionGenerator');

// Load environment variables
dotenv.config();

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

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

// n8n workflow generation endpoint
app.post('/generate-n8n-workflow', async (req, res) => {
  try {
    const { prompt } = req.body;

    // Validate request
    if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
      return res.status(400).json({
        error: 'Invalid request',
        message: 'Prompt is required and must be a non-empty string'
      });
    }

    // Create Gemini model instance
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    // Construct the prompt for n8n workflow generation
    const systemPrompt = `You are a technical assistant. Generate a valid n8n workflow JSON based on the user's request below.

User Request:
"${prompt}"

Instructions:

Output ONLY raw JSON, no explanations.
JSON must be valid and importable into n8n.
Use realistic node names (e.g., Gmail Trigger, Slack).
Ensure it includes: name, nodes, parameters, credentials (dummy names), positions, and connections.`;

    // Generate workflow using Gemini
    const result = await model.generateContent(systemPrompt);
    const response = await result.response;
    const workflowText = response.text();

    // Try to parse the response as JSON
    let workflowJson;
    try {
      // Clean the response to extract only JSON (remove any markdown formatting)
      const jsonMatch = workflowText.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No valid JSON found in response');
      }
      
      workflowJson = JSON.parse(jsonMatch[0]);
    } catch (parseError) {
      console.error('Failed to parse workflow JSON:', parseError);
      return res.status(500).json({
        error: 'Invalid Response',
        message: 'Failed to generate valid n8n workflow JSON. Please try again.'
      });
    }

    // Return the workflow JSON
    res.setHeader('Content-Type', 'application/json');
    res.json(workflowJson);

  } catch (error) {
    console.error('Error generating n8n workflow:', error);
    
    // Handle specific error types
    if (error.message.includes('API key') || error.message.includes('GEMINI_API_KEY')) {
      return res.status(500).json({
        error: 'Configuration Error',
        message: 'Gemini API key is not configured properly'
      });
    }

    if (error.message.includes('Gemini') || error.message.includes('quota')) {
      return res.status(503).json({
        error: 'Service Unavailable',
        message: 'AI service is temporarily unavailable. Please try again later.'
      });
    }

    // Generic error response
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to generate n8n workflow. Please try again.'
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
  console.log(`⚡ n8n workflow generation: POST http://localhost:${PORT}/generate-n8n-workflow`);
});

module.exports = app; 