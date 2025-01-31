import { useState } from "react";
import "./StoryGenerator.css";

const StoryGenerator = () => {
  const [step, setStep] = useState(1);
  const [age, setAge] = useState("");
  const [length, setLength] = useState("");
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
    setAge(inputAge < 0 ? 0 : inputAge);
  };

  const resetStoryGenerator = () => {
    setStory("");
    setStep(1);
    setAge("");
    setLength("");
    setCharacters("");
    setSetting("");
    setTheme("");
  };

  const handleSend = async (customRequest = false) => {
    setStep(6); // ✅ Move to loading step
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
        setStep(7); // ✅ Move to story display step
      } else {
        setError("Failed to generate story. Please try again.");
        setStep(5); // ✅ Go back to last input step if error occurs
      }
    } catch (error) {
      console.error("❌ Fetch Error:", error);
      setError(
        "An error occurred. Please check your connection and try again."
      );
      setStep(5);
    }
  };

  return (
    <div className="story-generator">
      <h2>Bedtime Story Generator</h2>

      {/* ✅ Step 7: Show the generated story */}
      {step === 7 && story ? (
        <div className="story-display">
          <h3>Your Story:</h3>
          <p>{story}</p>
          <button onClick={resetStoryGenerator}>Create Another Story</button>
        </div>
      ) : (
        <div className="input-step">
          {step === 1 && (
            <>
              <label>What age should this story be written for?</label>
              <input
                className="ageInput"
                type="number"
                value={age}
                onChange={handleAgeChange}
                min="0"
              />
              <button onClick={nextStep}>Next</button>
            </>
          )}

          {step === 2 && (
            <>
              <label>How long should this story be?</label>
              <div className="length-buttons">
                <button
                  className={`length-button ${
                    length === "Short" ? "selected" : ""
                  }`}
                  onClick={() => setLength("Short")}
                >
                  Short
                </button>
                <button
                  className={`length-button ${
                    length === "Medium" ? "selected" : ""
                  }`}
                  onClick={() => setLength("Medium")}
                >
                  Medium
                </button>
                <button
                  className={`length-button ${
                    length === "Long" ? "selected" : ""
                  }`}
                  onClick={() => setLength("Long")}
                >
                  Long
                </button>
              </div>

              <button onClick={nextStep} disabled={!length}>
                Next
              </button>
              <button onClick={prevStep}>Back</button>
            </>
          )}

          {step === 3 && (
            <>
              <label>
                Do you have character names? (Leave blank for AI to generate)
              </label>
              <input
                type="text"
                value={characters}
                onChange={(e) => setCharacters(e.target.value)}
              />
              <button onClick={nextStep}>Next</button>
              <button onClick={prevStep}>Back</button>
            </>
          )}

          {step === 4 && (
            <>
              <label>Where should the story take place? (Optional)</label>
              <input
                type="text"
                value={setting}
                onChange={(e) => setSetting(e.target.value)}
              />
              <button onClick={nextStep}>Next</button>
              <button onClick={prevStep}>Back</button>
            </>
          )}

          {step === 5 && (
            <>
              <label>
                What is the theme of the story? (Adventure, Friendship, etc.)
              </label>
              <input
                type="text"
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
              />
              <button onClick={() => handleSend(false)}>Generate Story</button>
              <button onClick={prevStep}>Back</button>
            </>
          )}

          {/* ✅ Step 6: Dedicated Loading Screen */}
          {step === 6 && (
            <div className="loading-container">
              <span className="loading-text">Generating story</span>
              <div className="loading-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}

          {error && <p className="error-message">{error}</p>}

          {/* Quick Story Button */}
          {step < 5 && (
            <button
              className="quick-story-button"
              onClick={() => handleSend(true)}
            >
              Quick Story (Stella & Sofia)
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default StoryGenerator;
