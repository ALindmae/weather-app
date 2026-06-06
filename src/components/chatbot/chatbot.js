import { createIcon } from "../../utils/icons";

export function createChatbot() {
  const widget = document.createElement("div");
  widget.classList.add("chatbot");

  widget.append(createChatbotToggle(), createChatWindow());
  return widget;
}

function createChatbotToggle() {
  const button = document.createElement("button");
  button.classList.add("chatbot__toggle");
  const icon = createIcon("speechBubble");

  button.append(icon);
  return button;
}

function createChatWindow() {
  const chatWindow = document.createElement("div");
  chatWindow.classList.add("chatbot__window");

  // chat controls
  const controls = document.createElement("div");
  controls.classList.add("chatbot__window-controls");

  const chatName = document.createElement("p");
  chatName.classList.add("chatbot__name");
  chatName.textContent = "WeatherBot";

  const close = document.createElement("button");
  close.type = "button";
  close.classList.add("chatbot__close");
  close.textContent = "X";

  controls.append(chatName, close);

  //chatFeed
  const chatFeed = document.createElement("div");
  chatFeed.classList.add("chatbot__chat-feed");

  // message area/form
  const messageArea = document.createElement("form");
  messageArea.classList.add("chatbot__message-area");

  const input = document.createElement("input");
  input.classList.add("chatbot__input");
  input.type = "text";
  input.required = true;
  input.maxLength = "5000";
  input.placeholder = "Ask questions, specifics or tips about the weather";

  const submit = document.createElement("button");
  submit.classList.add("chatbot__submit");
  submit.type = "submit";

  const submitIcon = createIcon("play");
  submit.append(submitIcon);

  messageArea.append(input, submit);

  chatWindow.append(controls, chatFeed, messageArea);

  return chatWindow;
}
