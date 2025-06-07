import React, { useState } from 'react';
import { generateResponse } from './services/geminiService'; // Add this import
import './ChatAI.css';

const ChatComponent = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const TRIGGER_WORD = '!gemini';

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { text: inputMessage, sender: 'user' }]);
    setInputMessage('');

    if (inputMessage.toLowerCase().startsWith(TRIGGER_WORD.toLowerCase())) {
      const prompt = inputMessage.slice(TRIGGER_WORD.length).trim();
      
      // Add loading message
      setMessages(prev => [...prev, { 
        text: 'Thinking...', 
        sender: 'bot', 
        isLoading: true 
      }]);

      // Get response from Gemini
      const response = await generateResponse(prompt);
      
      // Update messages
      setMessages(prev => [
        ...prev.filter(msg => !msg.isLoading),
        { text: response, sender: 'bot' }
      ]);
    }
  };

  // ... rest of your component remains the same ...
};

export default ChatComponent;