import React, { useState } from 'react';
import './ChatAI.css';

const ChatAI = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { type: 'user', text: input }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            contents: [
              {
                role: 'user',
                parts: [{ text: input }]
              }
            ]
          })
        }
      );

      const data = await response.json();
      const botReply = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response';
      setMessages((prev) => [...prev, { type: 'bot', text: botReply }]);
    } catch (err) {
      console.error('Error:', err);
      setMessages((prev) => [...prev, { type: 'bot', text: 'Something went wrong!' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="chat-wrapper">
    <div className="container">
      {/* Top Header - Always Visible */}
      <div className="fixed-header">
        <div className="header">Chat AI</div>
        <div className="sub-header">Welcome to Chat AI! 👋</div>
      </div>

      {/* Conditional Welcome Info - Hidden after conversation starts */}
      {messages.length === 0 && (
        <>
          <p className="description">I'm here to help you with anything you'd like to know. You can ask me about:</p>
          <div className="buttons">
            <button className="btn yellow">💡 General knowledge</button>
            <button className="btn purple">🔧 Technical questions</button>
            <button className="btn pink">📝 Writing assistance</button>
            <button className="btn orange">🧠 Problem solving</button>
          </div>
        </>
      )}

      <div className="chat-box">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.type}`}>
            <span>{msg.text}</span>
          </div>
        ))}
        {loading && <div className="loading">Thinking...</div>}
      </div>

      <div className="input-container">
        <input
          type="text"
          className="input"
          placeholder="Ask anything..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button className="send-button" onClick={handleSend}>Send</button>
      </div>
    </div>
  </div>
);

};

export default ChatAI;
