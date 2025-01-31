export const fetchChatResponse = async (message) => {
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`, // Uses your API key
        },
        body: JSON.stringify({
          model: "gpt-4",
          messages: [{ role: "user", content: message }],
        }),
      });
  
      const data = await response.json();
      return data.choices?.[0]?.message?.content || "No response";
    } catch (error) {
      console.error("Error fetching response:", error);
      return "Error fetching response.";
    }
  };
  