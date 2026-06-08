import { renderMessage } from "./chatbotRenderer";
import { sendMessage } from "./chatbotServices";
import { state } from "../../core/state";

export function activateEvents(chatbot) {
  const chatToggle = chatbot.querySelector(".chatbot__toggle");
  const closeButton = chatbot.querySelector(".chatbot__close");

  const chatWindow = chatbot.querySelector(".chatbot__window");
  const chatFeed = chatWindow.querySelector(".chatbot__chat-feed");

  const chatForm = chatWindow.querySelector(".chatbot__message-area");
  const chatInput = chatForm.querySelector(".chatbot__input");
  const chatSubmit = chatForm.querySelector(".chatbot__submit");

  chatForm.addEventListener("submit", onChatSubmit);
  closeButton.addEventListener("click", onCloseButtonClick);
  chatToggle.addEventListener("click", onToggleButtonClick);

  let isSubmitted = false;

  async function onChatSubmit(e) {
    e.preventDefault();
    if (!isSubmitted) {
      const userMessage = { role: "user", content: chatInput.value };
      isSubmitted = true;

      chatSubmit.disabled = true;
      chatInput.value = "";

      renderMessage(chatFeed, userMessage);

      const assistantReply = await sendMessage(chatInput.value);

      renderMessage(chatFeed, assistantReply);

      isSubmitted = false;
      chatSubmit.disabled = false;
      return;
    }
  }

  function onToggleButtonClick(e) {
    chatWindow.classList.toggle("is-open");
  }

  function onCloseButtonClick(e) {
    chatWindow.classList.remove("is-open");
  }
}

// .chatbot__
