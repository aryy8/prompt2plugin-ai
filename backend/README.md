# Prompt2Plugin Backend

An Express.js backend service that generates Chrome Extensions from natural language prompts using Google's Gemini AI.

## Features

- 🤖 **AI-Powered Generation**: Uses Google Gemini AI to generate complete Chrome Extensions and n8n workflows
- 📦 **Automatic Packaging**: Creates downloadable ZIP files with all necessary extension files
- 🔧 **Manifest V3 Support**: Generates modern Chrome Extensions using Manifest V3
- ⚡ **n8n Workflow Generation**: Creates importable n8n workflow JSON from natural language descriptions
- 🌐 **CORS Enabled**: Ready to work with React, Next.js, or any frontend
- ⚡ **Production Ready**: Includes error handling, validation, and logging

## Quick Start

### Prerequisites

- Node.js 16+ 
- Google Gemini API key

### Installation

1. **Clone and navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp env.example .env
   ```
   
   Edit `.env` and add your Gemini API key:
   ```env
   GEMINI_API_KEY=your_actual_api_key_here
   PORT=3001
   ```

4. **Start the server:**
   ```bash
   # Development mode (with auto-restart)
   npm run dev
   
   # Production mode
   npm start
   ```

The server will start on `http://localhost:3001`

## API Endpoints

### Health Check
```
GET /health
```
Returns server status and basic information.

**Response:**
```json
{
  "status": "OK",
  "message": "Prompt2Plugin Backend is running"
}
```

### Generate Extension
```
POST /generate-extension
```

**Request Body:**
```json
{
  "prompt": "Create a Chrome extension that changes all images on a webpage to cats"
}
```

**Response:**
- **Success**: Returns a downloadable ZIP file containing the Chrome Extension
- **Error**: Returns JSON with error details

**Headers Set:**
- `Content-Type: application/zip`
- `Content-Disposition: attachment; filename=extension.zip`

### Generate n8n Workflow
```
POST /generate-n8n-workflow
```

**Request Body:**
```json
{
  "prompt": "Create a workflow that monitors Gmail for new emails and sends notifications to Slack"
}
```

**Response:**
- **Success**: Returns JSON with a complete n8n workflow structure
- **Error**: Returns JSON with error details

**Headers Set:**
- `Content-Type: application/json`

**Example Response:**
```json
{
  "name": "Gmail to Slack Notification",
  "nodes": [
    {
      "id": "gmail-trigger",
      "name": "Gmail Trigger",
      "type": "n8n-nodes-base.gmailTrigger",
      "position": [240, 300],
      "parameters": {
        "authentication": "oAuth2",
        "resource": "message",
        "operation": "getAll"
      }
    }
  ],
  "connections": {
    "Gmail Trigger": {
      "main": [
        [
          {
            "node": "Slack",
            "type": "main",
            "index": 0
          }
        ]
      ]
    }
  }
}
```

## Usage Examples

### Using cURL
```bash
curl -X POST http://localhost:3001/generate-extension \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Create a dark mode toggle extension"}' \
  --output extension.zip
```

### Using JavaScript/Fetch
```javascript
const response = await fetch('http://localhost:3001/generate-extension', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    prompt: 'Create a Chrome extension that highlights all links on a page'
  })
});

if (response.ok) {
  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'extension.zip';
  a.click();
} else {
  const error = await response.json();
  console.error('Error:', error);
}
```

### Using Python
```python
import requests

response = requests.post(
    'http://localhost:3001/generate-extension',
    json={'prompt': 'Create a weather extension that shows current temperature'}
)

if response.status_code == 200:
    with open('extension.zip', 'wb') as f:
        f.write(response.content)
    print('Extension downloaded successfully!')
else:
    print('Error:', response.json())
```

### Testing n8n Workflow Generation
```bash
# Using the provided test script
node test-n8n-workflow.js

# Using cURL
curl -X POST http://localhost:3001/generate-n8n-workflow \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Create a workflow that monitors Gmail and sends Slack notifications"}' \
  | jq .

# Using JavaScript/Fetch
const response = await fetch('http://localhost:3001/generate-n8n-workflow', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    prompt: 'Create a workflow that processes CSV files and sends email reports'
  })
});

if (response.ok) {
  const workflow = await response.json();
  console.log('Generated workflow:', workflow);
} else {
  const error = await response.json();
  console.error('Error:', error);
}
```

## Error Handling

The API returns appropriate HTTP status codes and error messages:

- **400 Bad Request**: Invalid prompt or missing required fields
- **500 Internal Server Error**: Server-side errors
- **503 Service Unavailable**: Gemini API issues

Error response format:
```json
{
  "error": "Error Type",
  "message": "Detailed error message"
}
```

## Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `PORT` | Server port | `3001` | No |
| `GEMINI_API_KEY` | Google Gemini API key | - | Yes |
| `NODE_ENV` | Environment mode | `development` | No |

## Development

### Project Structure
```
backend/
├── server.js              # Main Express server
├── services/
│   └── extensionGenerator.js  # AI integration and zip creation
├── package.json
├── env.example
└── README.md
```

### Available Scripts
- `npm start`: Start production server
- `npm run dev`: Start development server with auto-restart
- `npm test`: Run tests (not implemented yet)

## Security Considerations

- API keys are stored in environment variables
- Input validation prevents malicious prompts
- CORS is configured for frontend integration
- Error messages don't expose sensitive information

## Troubleshooting

### Common Issues

1. **"Gemini API key is not configured"**
   - Ensure `.env` file exists with `GEMINI_API_KEY`
   - Verify the API key is valid and has proper permissions

2. **"AI service is temporarily unavailable"**
   - Check your Gemini API quota
   - Verify internet connectivity
   - Check Gemini service status

3. **"Failed to create zip file"**
   - Ensure sufficient disk space
   - Check file permissions in the project directory

### Getting a Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Create a new API key
4. Copy the key to your `.env` file

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

ISC License - see LICENSE file for details. 