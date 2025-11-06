import { OpenAI } from "openai";
import 'dotenv/config'

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
})




export const chat = async (req, res) => {
    try {
        const { prompt } = req.body;
        const response = await client.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "You are AI assistant for giving the information, suggestation and trending news of Finance. Always format your responses using Markdown — use headings (##), bullet points, bold text, and emojis where helpful." },
                { role: 'user', content: prompt, }
            ],


        })
        res.status(200).json({ response: response.choices[0].message.content });

    } catch (error) {
        return res.status(400).json({ message: error });
    }
}