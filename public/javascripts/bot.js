const chatContainer = document.getElementById('chatContainer');
const userInput = document.getElementById('userInput');
let responses = [];

fetch('/bot_data.json')
  .then(response => response.json())
  .then(data => {
    responses = data;
  });

function sendMessage() {
  const userMessage = userInput.value;
  if (userMessage.trim() === '') return;

  // Append user's message to the chat
  const userMsgElement = document.createElement('p');
  userMsgElement.textContent = `You: ${userMessage}`;
  chatContainer.prepend(userMsgElement);
  userInput.value = '';

  // Placeholder for bot response
  const botMsgElement = document.createElement('p');
  botMsgElement.textContent = `Bot: ${getBotResponse(userMessage)}`;
  chatContainer.prepend(botMsgElement);
}

function getBotResponse(message) {
  // Simple bad word filter
  const badWords = ['badword1', 'badword2']; // Add more bad words here
  for (const word of badWords) {
    if (message.toLowerCase().includes(word)) {
      return 'Please use appropriate language.';
    }
  }

  // Find response in JSON data
  for (const response of responses) {
    if (message.toLowerCase().includes(response.question.toLowerCase())) {
      return response.answer;
    }
  }

  return 'I am here to help you with your queries on sustainable practices, recent tech inventions for the environment, and information about our website.';
}