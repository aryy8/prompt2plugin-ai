const { GoogleGenerativeAI } = require('@google/generative-ai');
const JSZip = require('jszip');

/**
 * Generate a Chrome Extension based on user prompt using Gemini AI
 * @param {string} prompt - User's prompt describing the extension
 * @returns {Promise<Buffer>} - Zip file buffer containing the extension
 */
async function generateExtension(prompt) {
  try {
    // Validate API key
    if (!process.env.GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY is not configured in environment variables');
    }

    // Initialize Gemini AI client here to ensure env is loaded
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    // Construct the prompt for Gemini
    const geminiPrompt = `You are a coding assistant. Generate a complete Chrome Extension based on the following user prompt:

"${prompt}"

Provide output as raw code blocks labeled with file names. Use this format:

manifest.json:
<code>

popup.html:
<code>

background.js:
<code>

content.js:
<code>

Only include required files. Use Manifest V3 format. Do not wrap code in markdown or explanations.`;

    // Generate content using Gemini
    const result = await model.generateContent(geminiPrompt);
    const response = await result.response;
    const text = response.text();

    // Parse the response to extract files
    const files = parseGeminiResponse(text);

    // Create zip file
    const zipBuffer = await createZipFile(files);

    return zipBuffer;

  } catch (error) {
    console.error('Error in generateExtension:', error);
    
    // Re-throw with more specific error messages
    if (error.message.includes('API key')) {
      throw new Error('Gemini API key is not configured properly');
    }
    
    if (error.message.includes('quota') || error.message.includes('rate limit')) {
      throw new Error('Gemini API quota exceeded or rate limited');
    }
    
    throw new Error(`Gemini API error: ${error.message}`);
  }
}

/**
 * Parse Gemini response to extract filename and content pairs
 * @param {string} response - Raw response from Gemini
 * @returns {Object} - Object with filename as key and content as value
 */
function parseGeminiResponse(response) {
  const files = {};
  
  // Regex to match filename: followed by code block
  const filePattern = /(\w+\.(?:json|html|js|css|png|jpg|jpeg|svg)):\s*\n([\s\S]*?)(?=\n\w+\.|$)/g;
  
  let match;
  while ((match = filePattern.exec(response)) !== null) {
    const filename = match[1].trim();
    let content = match[2].trim();
    
    // Remove any markdown code block markers if present
    content = content.replace(/^```[\w]*\n?/, '').replace(/\n?```$/, '');
    
    // Only add if we have valid content
    if (content && content.length > 0) {
      files[filename] = content;
    }
  }

  // If no files were parsed, try alternative parsing
  if (Object.keys(files).length === 0) {
    console.warn('Standard parsing failed, attempting alternative parsing...');
    return parseAlternativeResponse(response);
  }

  return files;
}

/**
 * Alternative parsing method for different response formats
 * @param {string} response - Raw response from Gemini
 * @returns {Object} - Object with filename as key and content as value
 */
function parseAlternativeResponse(response) {
  const files = {};
  
  // Split by common file extensions and look for patterns
  const patterns = [
    /manifest\.json[:\s]*\n?([\s\S]*?)(?=\n\w+\.|$)/i,
    /popup\.html[:\s]*\n?([\s\S]*?)(?=\n\w+\.|$)/i,
    /background\.js[:\s]*\n?([\s\S]*?)(?=\n\w+\.|$)/i,
    /content\.js[:\s]*\n?([\s\S]*?)(?=\n\w+\.|$)/i,
    /style\.css[:\s]*\n?([\s\S]*?)(?=\n\w+\.|$)/i
  ];

  const filenames = ['manifest.json', 'popup.html', 'background.js', 'content.js', 'style.css'];

  patterns.forEach((pattern, index) => {
    const match = response.match(pattern);
    if (match && match[1]) {
      let content = match[1].trim();
      content = content.replace(/^```[\w]*\n?/, '').replace(/\n?```$/, '');
      
      if (content && content.length > 0) {
        files[filenames[index]] = content;
      }
    }
  });

  return files;
}

/**
 * Create a zip file from the parsed files
 * @param {Object} files - Object with filename as key and content as value
 * @returns {Promise<Buffer>} - Zip file buffer
 */
async function createZipFile(files) {
  try {
    const zip = new JSZip();

    // Add each file to the zip
    for (const [filename, content] of Object.entries(files)) {
      zip.file(filename, content);
    }

    // Generate zip buffer
    const zipBuffer = await zip.generateAsync({ type: 'nodebuffer' });
    
    console.log(`Created zip with ${Object.keys(files).length} files:`, Object.keys(files));
    
    return zipBuffer;

  } catch (error) {
    console.error('Error creating zip file:', error);
    throw new Error(`Failed to create zip file: ${error.message}`);
  }
}

module.exports = {
  generateExtension
}; 