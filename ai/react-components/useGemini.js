
const GEMINI_API_KEY = "AIzaSyAFEJqImmugmw473BfWMQw4UeLPcoVBhrI";
const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";

export const useGemini = () => {
  const sendMessage = async (message, history = []) => {
    try {
      const response = await fetch(`${API_URL}?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            ...history.map(msg => ({
              role: msg.sender === 'user' ? 'user' : 'model',
              parts: [{ text: msg.text }]
            })),
            { role: 'user', parts: [{ text: message }] }
          ]
        })
      });

      const data = await response.json();
      return data.candidates[0].content.parts[0].text;
    } catch (error) {
      console.error('Gemini API error:', error);
      return "I'm having trouble connecting to the AI service.";
    }
  };

  return { sendMessage };
};