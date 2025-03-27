import { log } from 'async';
import dotenv from 'dotenv';

dotenv.config();

// Dummy data arrays
const responses = {
    1: ["St. Joseph's College of Engineering and Technology, Palai is a private engineering college located in Pala, Kerala, India."],
    2: ["Dr. Rahul Shajan (HoD MCA)"],
};

export const chatbotController = async (req, res) => {
    const { message } = req.body;

    if (message === 'where is sjcet?') {
        return res.json({ reply: responses[1] });
    } else if (message === 'who is the hod of mca?') {
        return res.json({ reply: responses[2] });
    }

    // If no match, proceed with Deepseek API call
    try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
                "HTTP-Referer": "collegechatbot",
                "X-Title": "chatbot for college",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "model": "deepseek/deepseek-r1-zero:free",
                "messages": [
                    {
                        "role": "user",
                        "content": message,
                    }
                ]
            })
        });

        const data = await response.json();
        console.log('API Response:', data);

        const deepseekReply = data.choices?.[0]?.message?.content || "Sorry, I couldn't process your request.";

        // Remove LaTeX-specific syntax like `\boxed{}` 
        const cleanedReply = deepseekReply.replace(/\\boxed{(.*?)}/g, '$1');

        return res.json({ reply: cleanedReply.trim() });


    } catch (error) {
        console.error('Error fetching Deepseek API response:', error);
        return res.status(500).json({ reply: "I'm facing some technical difficulties right now." });
    }
};
