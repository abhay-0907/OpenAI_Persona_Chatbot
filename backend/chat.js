import { OpenAI } from "openai";
import 'dotenv/config'
const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
})

const response = await client.chat.completions.create({
    model:"gpt-3.5-turbo",
    messages:[
        {role:"system",content:"You are AI assistant for giving the information, suggestation and trending news of Finance."},
        {role:'user',content:"How i start a trading",}
    ],
    
    
})

console.log(response.choices[0].message.content);