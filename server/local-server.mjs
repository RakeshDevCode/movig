// server/local-server.mjs

import dotenv from "dotenv";

import express from "express";
import cors from "cors";
import openai from "../openai.js"; // assumes openai.js is in root

dotenv.config({ path: "./server/.env" });
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.post("/api/gpt-search", async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res
        .status(400)
        .json({ error: "Invalid or missing 'messages' array" });
    }

    const gptResponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages,
      max_tokens: 100,
    });

    res.status(200).json({
      response: gptResponse.choices[0].message.content,
    });
    const gptText = gptResponse.choices[0].message.content?.trim();

    // ✅ Log GPT response clearly
    console.log("\n🎬 GPT Movie Suggestions (raw):");
    console.log(gptText);
  } catch (error) {
    console.error("OpenAI API Error:", error);
    res.status(500).json({ error: error.message });
  }
});

app.all("/api/gpt-search", (req, res) => {
  res.status(405).json({ error: "Only POST method allowed" });
});

app.listen(port, () => {
  console.log(`✅ Local server running at http://localhost:${port}`);
});
