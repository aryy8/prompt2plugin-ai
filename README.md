# Prompt2Plugin - AI-Powered Chrome Extension & n8n Workflow Generator


## Features

### Chrome Extension Generator (FREE)
- **AI-Powered Generation**: Uses Google Gemini AI to create complete Chrome Extensions
- **Manifest V3 Support**: Generates modern Chrome Extensions using the latest manifest version
- **Automatic Packaging**: Creates downloadable ZIP files with all necessary extension files
- **No Code Required**: Just describe your extension idea in natural language

###  n8n Workflow Generator (NEW)
- **AI-Generated Workflows**: Creates importable n8n workflow JSON from descriptions
- **Realistic Node Integration**: Uses proper n8n node types and configurations
- **Copy & Download**: Copy JSON to clipboard or download as file
- **Direct Import**: Ready to import into n8n automation platform

### Modern UI/UX
- **Responsive Design**: Works perfectly on desktop and mobile
- **Dark/Light Mode**: Beautiful theme switching with smooth transitions
- **Authentication System**: User registration and login functionality
- **Real-time Feedback**: Toast notifications and loading states

---

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **shadcn/ui** for beautiful components
- **Framer Motion** for animations
- **React Router** for navigation

### Backend
- **Node.js** with Express.js
- **Google Gemini AI** for content generation
- **CORS** enabled for frontend integration
- **Environment-based configuration**

### Deployment
- **Frontend**: Vercel/Netlify ready
- **Backend**: Deployed on Render
- **Environment Variables**: Secure API key management

---

## Project Structure

```
prompt2plugin-ai/
├── src/                          # Frontend React application
│   ├── components/               # Reusable UI components
│   │   ├── ExtensionGenerator.tsx    # Chrome extension generator
│   │   ├── N8nWorkflowGenerator.tsx  # n8n workflow generator
│   │   ├── HeroSection.tsx           # Landing page hero
│   │   ├── Navbar.tsx               # Navigation bar
│   │   ├── Footer.tsx               # Footer with attribution
│   │   └── ui/                      # shadcn/ui components
│   ├── pages/                   # Page components
│   │   ├── Index.tsx            # Main landing page
│   │   ├── About.tsx            # About page
│   │   ├── Login.tsx            # Login page
│   │   └── Signup.tsx           # Signup page
│   ├── contexts/                # React contexts
│   │   └── AuthContext.tsx      # Authentication context
│   └── hooks/                   # Custom React hooks
├── backend/                     # Express.js backend
│   ├── server.js               # Main server file
│   ├── services/               # Business logic
│   │   └── extensionGenerator.js   # Chrome extension generation
│   ├── package.json            # Backend dependencies
│   └── env.example             # Environment variables template
├── public/                     # Static assets
├── package.json                # Frontend dependencies
└── README.md                   # This file
```

---

##  Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Google Gemini API key

### 1. Clone the Repository
```bash
git clone https://github.com/aryy8/prompt2plugin-ai.git
cd prompt2plugin-ai
```

### 2. Frontend Setup
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will be available at `http://localhost:8080`

### 3. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Set up environment variables
cp env.example .env
```

Edit `.env` and add your Gemini API key:
```env
GEMINI_API_KEY=your_gemini_api_key_here
PORT=3001
NODE_ENV=development
```

```bash
# Start backend server
npm start
```

The backend will be available at `http://localhost:3001`

---

## API Endpoints

### Health Check
```http
GET /health
```

### Generate Chrome Extension
```http
POST /generate-extension
Content-Type: application/json

{
  "prompt": "Create a Chrome extension that changes all images to cats"
}
```

**Response**: ZIP file download

### Generate n8n Workflow
```http
POST /generate-n8n-workflow
Content-Type: application/json

{
  "prompt": "Create a workflow that monitors Gmail and sends Slack notifications"
}
```

**Response**: JSON workflow for n8n import

---

## Usage Examples

### Chrome Extension Generation
1. Visit the website and navigate to the Chrome Extension Generator
2. Describe your extension idea (e.g., "Create a dark mode toggle extension")
3. Click "Generate Extension"
4. Download the ZIP file
5. Load it in Chrome via `chrome://extensions/`

### n8n Workflow Generation
1. Navigate to the n8n Workflow Generator
2. Describe your automation workflow
3. Click "Generate Workflow"
4. Copy the JSON or download the file
5. Import into n8n.io

---

##  Environment Variables

### Frontend (.env)
```env
VITE_API_URL=https://prompt2plugin-ai.onrender.com
```

### Backend (.env)
```env
PORT=3001
GEMINI_API_KEY=your_gemini_api_key_here
NODE_ENV=development
```

---

##  Deployment

### Frontend Deployment
The frontend is ready for deployment on Vercel, Netlify, or any static hosting service.

### Backend Deployment
The backend is deployed on Render:
- **URL**: https://prompt2plugin-ai.onrender.com
- **Health Check**: https://prompt2plugin-ai.onrender.com/health

---

##  Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

##  License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

##  Acknowledgments

- **Google Gemini AI** for powering the content generation
- **n8n** for the amazing automation platform
- **shadcn/ui** for the beautiful component library
- **Tailwind CSS** for the utility-first styling

---


<div align="center">

Made with 🖤 by [@aryy8](https://github.com/aryy8)

</div>
