const express = require('express');
const { generateMeta, generateImage } = require('./controllers/openaiController');

// app setup
const app = express();
const PORT = process.env.PORT || 4000;

// middleware
app.use(express.json());
app.use(express.static('public'));

// routes
app.post('/openai/meta', generateMeta); // Handler for POST requests to /openai/meta
app.post('/openai/image', generateImage);

// Catch-all route for other paths
app.all('*', (req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

app.listen(PORT, () => console.log(`listening to requests on port ${PORT}`));
