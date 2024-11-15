import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../../../packages/ui/src/firebase";
import axios from 'axios';
import './chatpage.css';

const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<{ text: string, from: string }[]>([]);
  const [userInput, setUserInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        setLoading(false);  // User is signed in, stop loading
      } else {
        setLoading(false);  // No user, stop loading and redirect to sign-in page
        router.push("/"); 
      }
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return <p>Loading...</p>;
  }

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;  // Don't send empty messages

    // Add the user message to the chat
    setMessages([...messages, { text: userInput, from: 'user' }]);
    setUserInput('');  // Clear input field

    setLoading(true);  // Show loading state while waiting for response

    try {
      const response = await axios.post('http://localhost:3001/api/chat', { message: userInput });
      console.log('Response from backend:', response);  // Log the response to check its structure

      setMessages((prevMessages) => [
        ...prevMessages,
        { text: response.data.reply || 'I could not understand. Please try again.', from: 'bot' }  // Handle missing reply
      ]);
    } catch (error) {
      console.error('Error while sending message:', error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: 'Sorry, there was an error. Please try again.', from: 'bot' }
      ]);
    } finally {
      setLoading(false);  // Hide loading state after response is received
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-box">
        {/* Display chat messages */}
        <div className="messages">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message ${msg.from === 'user' ? 'user' : 'bot'}`}
            >
              <p>{msg.text}</p>
            </div>
          ))}
        </div>

        {/* Input and send button */}
        <div className="input-container">
          <input
            type="text"
            placeholder="Type your message here..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            disabled={loading}
          />
          <button
            onClick={handleSendMessage}
            disabled={loading || !userInput.trim()}
          >
            {loading ? 'Sending...' : 'Send'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
