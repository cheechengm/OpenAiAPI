const OpenAI = require('openai'); // Import OpenAI class from openai package
require('dotenv').config();

// Initialize OpenAI instance with API key
const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_KEY,
});

module.exports = openai; // Export the initialized OpenAI instance
