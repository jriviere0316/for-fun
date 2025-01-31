import { useState } from "react";
import "./StoryGenerator.css";

const StoryGenerator = () => {
  const [step, setStep] = useState(1);
  const [age, setAge] = useState("");
  const [length, setLength] = useState(""); // Short, Medium, Long
  const [characters, setCharacters] = useState("");
  const [setting, setSetting] = useState("");
  const [theme, setTheme] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [story, setStory] = useState("");
  const [error, setError] = useState("");

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  // ✅ Prevent negative age values
  const handleAgeChange = (e) => {
    const inputAge = parseInt(e.target.value, 10);
    setAge(inputAge < 0 ? 0 : inputAge); // Prevent negative values
  };

  const handleSend = async (customRequest = false) => {
    setIsGenerating(true);
    setStory("");
    setError("");

    const requestData = customRequest
      ? {
          age: "5",
          length: "Short",
          characters: "Stella, Sofia",
          setting: "California",
          theme: "Fun",
        }
      : { age, length, characters, setting, theme };

    try {
      const response = await fetch("http://localhost:5001/generate-story", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      });

      const data = await response.json();

      if (response.ok && data.story) {
        setStory(data.story);
      } else {
        setError("Failed to generate story. Please try again.");
      }
    } catch (error) {
      console.error("❌ Fetch Error:", error);
      setError("An error occurred. Please check your connection and try again.");
    }

    setIsGenerating(false);
  };

  return (
    <div className="story-generator">
      <h2>Children's Bedtime Story Generator</h2>

      {story ? (
        <div className="story-display">
          <h3>Your Story:</h3>
          <p>{story}</p>
          <button onClick={() => setStory("")}>Create Another Story</button>
        </div>
      ) : (
        <div className="input-step">
          {step === 1 && (
            <>
              <label>What is the child's age?</label>
              <input
                type="number"
                value={age}
                onChange={handleAgeChange}
                min="0" // Prevents negative numbers
              />
              <button onClick={nextStep}>Next</button>
            </>
          )}

          {step === 2 && (
            <>
              <label>How long should the story be?</label>
              <div className="length-buttons">
                <button onClick={() => { setLength("Short"); nextStep(); }}>Short</button>
                <button onClick={() => { setLength("Medium"); nextStep(); }}>Medium</button>
                <button onClick={() => { setLength("Long"); nextStep(); }}>Long</button>
              </div>
              <button onClick={prevStep}>Back</button>
            </>
          )}

          {step === 3 && (
            <>
              <label>Do you have character names? (Leave blank for AI to generate)</label>
              <input type="text" value={characters} onChange={(e) => setCharacters(e.target.value)} />
              <button onClick={prevStep}>Back</button>
              <button onClick={nextStep}>Next</button>
            </>
          )}

          {step === 4 && (
            <>
              <label>Where should the story take place? (Optional)</label>
              <input type="text" value={setting} onChange={(e) => setSetting(e.target.value)} />
              <button onClick={prevStep}>Back</button>
              <button onClick={nextStep}>Next</button>
            </>
          )}

          {step === 5 && (
            <>
              <label>What is the theme of the story? (Adventure, Friendship, etc.)</label>
              <input type="text" value={theme} onChange={(e) => setTheme(e.target.value)} />
              <button onClick={prevStep}>Back</button>
              <button onClick={() => handleSend(false)}>Generate Story</button>
            </>
          )}

          {isGenerating && <p>Generating story... Please wait.</p>}
          {error && <p className="error-message">{error}</p>}

          {/* ✅ Quick Story Button */}
          <button className="quick-story-button" onClick={() => handleSend(true)}>
            Quick Story (Stella & Sofia)
          </button>
        </div>
      )}
    </div>
  );
};

export default StoryGenerator;
