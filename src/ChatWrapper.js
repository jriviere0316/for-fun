import { useState } from "react";
import { fetchChatResponse } from "./GPTAPI"; // Import the API function
import "./ChatWrapper.css"; // Import the CSS file

const ChatWrapper = () => {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Track loading state

  const handleSend = async () => {
    if (!message.trim()) return; // Prevent empty messages

    setIsLoading(true); // Start loading
    setResponse(""); // Clear previous response

    const reply = await fetchChatResponse(message);
    
    setResponse(reply);
    setIsLoading(false); // Stop loading
  };

  return (
    <div className="chat-wrapper">
      <h2 className="chat-header">Chat with AI</h2>
      <textarea 
        className="chat-input"
        value={message} 
        onChange={(e) => setMessage(e.target.value)} 
        placeholder="Ask something..."
        disabled={isLoading} // Disable input while loading
      />
      <button 
        className="chat-button" 
        onClick={handleSend}
        disabled={isLoading} // Disable button while loading
      >
        {isLoading ? "Loading..." : "Send"}
      </button>

      {/* Show a loading spinner while waiting for response */}
      {isLoading && <div className="spinner"></div>}

      <p className="chat-response">{response}</p>
    </div>
  );
};

export default ChatWrapper;
