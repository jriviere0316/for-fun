import { useState } from "react";
import { fetchChatResponse } from "./GPTAPI"; // Import the utility function

const ChatWrapper = () => {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

  const handleSend = async () => {
    const reply = await fetchChatResponse(message);
    setResponse(reply);
  };

  return (
    <div>
      <textarea 
        value={message} 
        onChange={(e) => setMessage(e.target.value)} 
        placeholder="Ask something..."
      />
      <button onClick={handleSend}>Send</button>
      <p>Response: {response}</p>
    </div>
  );
};

export default ChatWrapper;
