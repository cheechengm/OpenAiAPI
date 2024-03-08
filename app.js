const express = require('express');
const { generateMeta, generateImage } = require('./controllers/openaiController');

// app setup
const app = express();
const PORT = process.env.PORT || 4000;

// Middleware for remote logging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Other middleware
app.use(express.json());
app.use(express.static('public'));

// Routes
app.post('/openai/meta', generateMeta); // Handler for POST requests to /openai/meta
app.post('/openai/image', generateImage);

// Catch-all route for other paths
app.all('*', (req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(PORT, () => console.log(`Listening to requests on port ${PORT}`));
