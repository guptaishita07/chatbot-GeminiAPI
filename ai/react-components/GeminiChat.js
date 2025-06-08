import React, { useState } from 'react';
import { useGemini } from './useGemini';
import styles from './styles.module.css';

export const GeminiChat = ({ position = 'bottom-right' }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { sendMessage } = useGemini();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const aiResponse = await sendMessage(input, messages);
      const aiMessage = { text: aiResponse, sender: 'ai' };
      setMessages(prev => [...prev, aiMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`${styles.chatContainer} ${styles[position]}`}>
      <div className={styles.messages}>
        {messages.map((msg, index) => (
          <div key={index} className={`${styles.message} ${styles[msg.sender]}`}>
            {msg.text}
          </div>
        ))}
        {isLoading && <div className={styles.message}>Thinking...</div>}
      </div>
      <form onSubmit={handleSubmit} className={styles.inputForm}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className={styles.inputField}
        />
        <button type="submit" className={styles.submitButton}>
          Send
        </button>
      </form>
    </div>
  );
};