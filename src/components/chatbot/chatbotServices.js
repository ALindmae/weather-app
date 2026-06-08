import { createChatCompletion } from "../../API/chatbotApi";
import { state } from "../../core/state";

export async function sendMessage(value) {
  const userMessage = { role: "user", content: value };

  state.chatbot.messages.push(userMessage);

  const response = await createChatCompletion(state.chatbot.messages);
  let assistantMessage;

  if (!response) {
    state.chatbot.messages.pop();
    assistantMessage = {
      role: "error",
      content: "Error retrieving response, please try again.",
    };
  } else {
    assistantMessage = response.choices[0].message;
    state.chatbot.messages.push(assistantMessage);
  }

  return assistantMessage;
}
