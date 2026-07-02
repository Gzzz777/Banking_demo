import React, { useState } from 'react';
import './Chatbot.css';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{
    text: 'Hello! I\'m your AI Agent Assistant. I can help you automate tasks on this page. Just describe what you\'d like me to do!',
    sender: 'bot'
  }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [pendingTask, setPendingTask] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);

  const sendMessage = async (confirmed = false) => {
    if (!input.trim() && !confirmed) return;

    const userMessage = { text: input, sender: 'user' };
    if (!confirmed) {
      setMessages([...messages, userMessage]);
    }
    
    const taskToSend = confirmed ? pendingTask.task : input;
    const urlToSend = confirmed ? pendingTask.url : window.location.href;
    const userContext = extractUserContext();
    
    if (!confirmed) {
      setInput('');
    }
    setLoading(true);

    try {
      const isAutomationTask = /\b(click|fill|submit|navigate|open|go to|find|search|automate)\b/i.test(taskToSend);
      
      if (isAutomationTask && !confirmed) {
        const response = await fetch('http://localhost:3001/api/agent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ task: taskToSend, url: urlToSend, confirmed: false, userContext })
        });
        const data = await response.json();
        
        if (data.needsConfirmation) {
          setPendingTask({ task: taskToSend, url: urlToSend });
          setMessages(prev => [...prev, { text: data.confirmationMessage, sender: 'bot', needsConfirmation: true }]);
        }
      } else if (confirmed) {
        const response = await fetch('http://localhost:3001/api/agent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ task: taskToSend, url: urlToSend, confirmed: true, userContext })
        });
        const data = await response.json();
        setPendingTask(null);
        setMessages(prev => [...prev, { text: data.success ? data.result : `Error: ${data.error}`, sender: 'bot' }]);
      } else {
        const response = await fetch('http://localhost:3001/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: taskToSend, history: chatHistory })
        });
        const data = await response.json();
        
        if (data.success) {
          setMessages(prev => [...prev, { text: data.response, sender: 'bot' }]);
          setChatHistory(prev => [...prev, { role: 'user', content: taskToSend }, { role: 'assistant', content: data.response }]);
        } else {
          setMessages(prev => [...prev, { text: `Error: ${data.error}`, sender: 'bot' }]);
        }
      }
    } catch (error) {
      setMessages(prev => [...prev, { text: 'Error: ' + error.message, sender: 'bot' }]);
    }
    setLoading(false);
  };

  const extractUserContext = () => {
    const context = {};
    const nameElement = document.querySelector('[data-user-name], .user-name, #userName');
    const emailElement = document.querySelector('[data-user-email], .user-email, #userEmail');
    const phoneElement = document.querySelector('[data-user-phone], .user-phone, #userPhone');
    
    if (nameElement) {
      let name = nameElement.textContent.trim();
      name = name.replace(/^(Welcome,?\s*|Hello,?\s*)/i, '').replace(/!$/, '').trim();
      if (name && name !== 'John Doe') context.name = name;
    }
    if (emailElement) context.email = emailElement.textContent.trim();
    if (phoneElement) context.phone = phoneElement.textContent.trim();
    
    return Object.keys(context).length > 0 ? JSON.stringify(context) : null;
  };

  const handleConfirm = () => {
    setMessages(prev => [...prev, { text: 'Yes, proceed', sender: 'user' }]);
    sendMessage(true);
  };

  const handleCancel = () => {
    setMessages(prev => [...prev, { text: 'No, cancel', sender: 'user' }]);
    setPendingTask(null);
    setMessages(prev => [...prev, { text: 'Task cancelled.', sender: 'bot' }]);
  };

  return (
    <>
      <button className="chatbot-toggle" onClick={() => setIsOpen(!isOpen)}>
        <span className="chatbot-toggle-icon">💬</span>
        <span className="chatbot-toggle-text">AI Agent</span>
      </button>
      {isOpen && (
        <div className="chatbot-container">
          <div className="chatbot-header">
            <h3>AI Agent Assistant</h3>
            <button onClick={() => setIsOpen(false)}>×</button>
          </div>
          <div className="chatbot-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`message ${msg.sender}`}>
                {msg.text}
                {msg.needsConfirmation && !loading && (
                  <div className="confirmation-buttons">
                    <button onClick={handleConfirm} className="confirm-btn">Yes</button>
                    <button onClick={handleCancel} className="cancel-btn">No</button>
                  </div>
                )}
              </div>
            ))}
            {loading && <div className="message bot">Processing...</div>}
          </div>
          <div className="chatbot-input">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Describe automation task..."
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
