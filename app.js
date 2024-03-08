const express = require('express');
const { generateMeta, generateImage } = require('./controllers/openaiController');

// App setup
const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Routes
app.post('/openai/meta', (req, res) => {
  // Implement logic for generating meta
  // Example: generateMeta(req.body).then(meta => res.json(meta)).catch(err => res.status(500).json({ error: err.message }));
});

app.post('/openai/image', (req, res) => {
  // Implement logic for generating image
  // Example: generateImage(req.body).then(image => res.json(image)).catch(err => res.status(500).json({ error: err.message }));
});

// Catch-all route for other paths
app.all('*', (req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

// Start server
app.listen(PORT, () => console.log(`Listening to requests on port ${PORT}`));
