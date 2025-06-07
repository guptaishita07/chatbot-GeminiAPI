require('dotenv').config();
const express = require('express');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Google Generative AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Health check endpoint
app.get('/', (req, res) => {
  res.send('Gemini API Server is running');
});

// Gemini API endpoint
app.post('/api/generate', async (req, res) => {
  try {
    const { prompt } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ 
        error: "Prompt is required" 
      });
    }

    // Get the generative model (using latest stable version)
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-pro-latest"
    });

    // Generate content
    const result = await model.generateContent({
      contents: [{
        parts: [{
          text: prompt
        }]
      }]
    });

    const response = await result.response;
    const text = response.text();

    res.json({ 
      success: true,
      response: text 
    });

  } catch (error) {
    console.error("Gemini API Error:", error);
    
    // Enhanced error handling
    let errorMessage = "Failed to generate response";
    if (error.message.includes("404 Not Found")) {
      errorMessage = "Model not found - please check the model name";
    } else if (error.message.includes("API key")) {
      errorMessage = "Invalid API key - please check your .env file";
    }

    res.status(500).json({ 
      success: false,
      error: errorMessage,
      details: error.message
    });
  }
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Gemini API Key: ${process.env.GEMINI_API_KEY ? 'Loaded' : 'Missing'}`);
});