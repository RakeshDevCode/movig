// server/index.js

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const OpenAI = require("openai");

dotenv.config();

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/api/gpt-search", async (req, res) => {
  try {
    const { messages } = req.body;

    console.log("Received GPT Messages:", messages); 

    const gptResponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", 
      messages,
      max_tokens: 100, 

    });

    res.json({
      response: gptResponse.choices[0].message.content,
    });
  } catch (err) {
    console.error("OpenAI Error:", err); // 👈 Show full error
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
