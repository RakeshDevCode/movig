import OpenAI from "openai";
import "dotenv/config";

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_KEY || process.env.OPENAI_API_KEY,
  dangerouslyAllowBrowser: true, // Only for testing in frontend — DO NOT use in production
});

console.log("OpenAI Key:", process.env.REACT_APP_OPENAI_KEY);

export default openai;
