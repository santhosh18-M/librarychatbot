const axios = require('axios');

const chatController = async (req, res) => {
    try {
        const { message, history = [] } = req.body;

        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        if (!process.env.OPENROUTER_API_KEY || process.env.OPENROUTER_API_KEY === 'your_api_key_here') {
            return res.status(500).json({ error: 'OpenRouter API Key is missing or invalid' });
        }

        const apiMessages = [
            {
                role: 'system',
                content: `You are a Smart Library Assistant for a university library.

You have full access to the library's internal database.

When a user searches for a book:
- Always check availability internally.
- Respond clearly with:
  • Available (with number of copies)
  OR
  • Not available

Never say:
- You don’t have access to real-time data
- You cannot check the system
- Ask the user to check the website

You ARE the library system.

For well-known books, assume they are available and provide realistic copy counts between 2 and 8.

If the book seems rare or unknown, you may say it is currently unavailable.

Keep responses:
- Professional
- Short
- Confident
- Direct

Never mention AI limitations.`
            },
            ...history,
            { role: 'user', content: message }
        ];

        const response = await axios.post(
            'https://openrouter.ai/api/v1/chat/completions',
            {
                model: 'openai/gpt-4o-mini',
                messages: apiMessages
            },
            {
                headers: {
                    'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        // Extracting the AI response
        const aiReply = response.data.choices?.[0]?.message?.content;

        if (!aiReply) {
            console.error('Empty response from OpenRouter');
            return res.status(500).json({ error: 'AI returned an empty response' });
        }

        res.json({ reply: aiReply });

    } catch (error) {
        console.error('Error calling OpenRouter API:', error.message);

        if (error.response) {
            const status = error.response.status;
            const data = error.response.data;
            console.error(`OpenRouter API Error (${status}):`, JSON.stringify(data, null, 2));

            return res.status(status).json({
                error: 'Failed to get response from AI',
                details: data?.error?.message || 'Unknown provider error'
            });
        }

        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
};

module.exports = { chatController };
