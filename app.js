const express = require('express');
const { generateMeta, generateImage } = require('./controllers/openaiController');

// app setup
const app = express();
const PORT = process.env.PORT || 4000;

// middleware
app.use(express.json());
app.use(express.static('public'));

// routes
app.post('/openai/meta', (req, res) => {
  // Call the generateMeta function from the controller
  generateMeta(req.body)
    .then((data) => {
      // Send the response with the generated data
      res.status(200).json(data);
    })
    .catch((error) => {
      // Handle any errors
      console.error('Error generating meta:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});

app.post('/openai/image', (req, res) => {
  // Call the generateImage function from the controller
  generateImage(req.body)
    .then((data) => {
      // Send the response with the generated data
      res.status(200).json(data);
    })
    .catch((error) => {
      // Handle any errors
      console.error('Error generating image:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});

// Catch-all route for other paths
app.all('*', (req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

app.listen(PORT, () => console.log(`listening to requests on port ${PORT}`));
