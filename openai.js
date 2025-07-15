import OpenAI from 'openai';


const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_KEY,
  dangerouslyAllowBrowser: true, // Only for testing in frontend — DO NOT use in production
});

export default openai;
