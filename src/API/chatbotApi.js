import { fetchJSON } from "../utils/fetchJSON";

const URL = "https://api.groq.com/openai/v1/chat/completions";

export async function createChatCompletion(messages) {
  console.log(messages);
  return await fetchJSON(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${process.env.GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: "llama-3.1-8b-instant",
      messages: messages,
    }),
  });
}
