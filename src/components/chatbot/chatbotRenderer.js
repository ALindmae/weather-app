function createChatMessage({ role, content }) {
  const message = document.createElement("p");
  message.classList.add("chatbot__message");

  if (role === "user") {
    message.classList.add("chatbot__message--user");
  } else message.classList.add("chatbot__message--assistant");

  message.textContent = content;

  return message;
}

export function renderMessage(chatFeed, message) {
  chatFeed.append(createChatMessage(message));
}
