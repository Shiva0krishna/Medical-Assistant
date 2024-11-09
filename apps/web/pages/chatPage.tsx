import React, { useState } from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../../../packages/ui/src/firebase";
import axios from 'axios';
import './chatpage.css'
 
const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<{ text: string, from: string }[]>([]);  
  const [userInput, setUserInput] = useState<string>('');  

  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        // User is signed in, proceed to dashboard
        setLoading(false);
      } else {
        // No user, redirect to sign-in page
        setLoading(false);
        router.push("/"); // Make sure to stop loading here as well
      }
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return <p>Loading...</p>;
  }

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;  
    setMessages([...messages, { text: userInput, from: 'user' }]);
    setUserInput('');  

    setLoading(true);  

    try {
       const response = await axios.post('http://localhost:3001/api/chat', { message: userInput });

      setMessages((prevMessages) => [
        ...prevMessages,
        { text: response.data.reply, from: 'bot' }
      ]);
    } catch (error) {
      console.error('Error while sending message:', error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: 'Sorry, there was an error. Please try again.', from: 'bot' }
      ]);
    } finally {
      setLoading(false); 
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

        {/* Input and button */}
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
