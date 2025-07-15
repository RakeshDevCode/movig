// server/local-server.mjs

import "dotenv/config"; // Auto-loads .env file
import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY,
});

app.post("/api/gpt-search", async (req, res) => {
  try {
    const { messages } = req.body;

    const gptResponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages,
    });

    res.json({
      response: gptResponse.choices[0].message.content,
    });
  } catch (err) {
    console.error("OpenAI Error:", err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`✅ Local server running at http://localhost:${port}`);
});
