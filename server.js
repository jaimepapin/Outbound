const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

app.post('/groq-proxy', async (req, res) => {
    const apiKey = process.env.GROQ_API_KEY;
    const groqApiUrl = 'https://your-groq-api-endpoint.com'; // Replace with your Groq API endpoint
    const promptData = req.body;

    try {
        const response = await axios.post(groqApiUrl, promptData, { 
            headers: { 'Authorization': `Bearer ${apiKey}` } 
        });
        res.status(response.status).json(response.data);
    } catch (error) {
        console.error('Error forwarding request to Groq API:', error);
        res.status(error.response ? error.response.status : 500).json({ message: 'Error forwarding request', error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
