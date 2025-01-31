const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const OpenAI = require("openai");

dotenv.config(); // Load environment variables

const app = express();
app.use(express.json());

// ✅ Correct CORS setup
app.use(cors({
  origin: "http://localhost:3000",  // Allow frontend requests
  methods: "GET,POST,OPTIONS",
  allowedHeaders: "Content-Type",
  credentials: true
}));

// ✅ Handle preflight (OPTIONS method)
app.options("/generate-story", cors());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Make sure .env contains OPENAI_API_KEY
});

// ✅ Route to generate a bedtime story
app.post("/generate-story", async (req, res) => {
  const { age, length, characters, setting, theme } = req.body;

  console.log("📩 Received Request Data:", req.body);  // Debugging

  const prompt = `Generate a bedtime story for a ${age}-year-old.
    Length: ${length}
    Characters: ${characters || 'AI-generated'}
    Setting: ${setting || 'fantasy world'}
    Theme: ${theme || 'adventure'}
  `;

  //console.log("📜 Sending to ChatGPT:", prompt);

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 1500,
    });

    //console.log("🤖 AI Response:", response.choices[0]?.message?.content);

    res.status(200).json({ story: response.choices[0]?.message?.content || "No response." });
  } catch (error) {
    console.error("❌ Error generating story:", error);
    res.status(500).json({ error: "Failed to generate story." });
  }
});

// ✅ Start the backend server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
