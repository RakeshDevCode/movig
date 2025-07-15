import openai from "../openai.js"; // this assumes openai.js is at root

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST method allowed" });
  }

  try {
    const { messages } = req.body;

    const gptResponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages,
      max_tokens: 100,
    });

    res.status(200).json({
      response: gptResponse.choices[0].message.content,
    });
  } catch (error) {
    console.error("OpenAI API Error:", error);
    res.status(500).json({ error: error.message });
  }
}
