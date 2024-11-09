import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config(); 

const openai = new OpenAI({
  apiKey:process.env.OPENAI_API_KEY
});

export async function callapi(message) {
  try {
    const response = await openai.chat.completions.create({
      model: "babbage-002",
      messages: [{ role: "user", content: message }],
    });
    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error in ChatGPT API request:", error);
    throw new Error("ChatGPT API request failed");
  }
}
