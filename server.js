const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

app.post('/groq-proxy', async (req, res) => {
    const apiKey = process.env.GROQ_API_KEY;
    const groqApiUrl = 'https://api.groq.com/openai/v1/chat/completions';
    const promptData = req.body;

    try {
        const response = await axios.post(groqApiUrl, promptData, {
            headers: { 'Authorization': `Bearer ${apiKey}` }
        });
        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(error.response ? error.response.status : 500).json({
            message: 'Error forwarding request',
            error: error.message
        });
    }
});

module.exports = app;
