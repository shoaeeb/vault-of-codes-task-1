'use strict';
const sendChatBtn = document.querySelector('.chat-input span');
const chatInput = document.querySelector('.chat-input textarea');
const chatBox = document.querySelector('.chatbox');
const chatToggler = document.querySelector('.chatbot-toggler');
const closeBtn = document.querySelector('.close-btn');
const chatInputHeight = chatInput.scrollHeight;
let userMessage;
const API_KEY = ' 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';
let createMessage = (message, className) => {
  //create li element and append the message in the li and return
  const chatLi = document.createElement('li');
  chatLi.classList.add('chat', className);
  let chatContent =
    className === 'outgoing'
      ? `<p></p>`
      : ` <span class="material-symbols-outlined">smart_toy</span>
    <p>    
    </p>`;
  chatLi.innerHTML = chatContent;
  chatLi.querySelector('p').textContent = message;
  return chatLi;
};
const generateResponse = incomingChat => {
  let message = incomingChat.querySelector('p');
  const API_URL = 'https://api.openai.com/v1/chat/completions ';
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: userMessage }],
    }),
  };
  //Send POST request to API,get Response
  fetch(API_URL, requestOptions)
    .then(res => res.json())
    .then(data => {
      message.textContent = data.choices[0].message.content;
    })
    .catch(error => {
      message.classList.add('error');
      //as my quota is reached so it gives error message all the time
      message.textContent = 'Oops! Something, Went Wrong';
    })
    .finally(() => chatBox.scrollTo(0, chatBox.scrollHeight));
};
const handleChat = () => {
  userMessage = chatInput.value.trim();
  if (!userMessage) return;
  chatInput.style.height = `${chatInputHeight}px`;
  chatInput.value = '';
  //append the message in the chat box
  chatBox.append(createMessage(userMessage, 'outgoing'));
  chatBox.scrollTo(0, chatBox.scrollHeight);
  setTimeout(() => {
    let incomingChat = createMessage('Thinking...', 'incoming');
    chatBox.append(incomingChat);
    chatBox.scrollTo(0, chatBox.scrollHeight);

    generateResponse(incomingChat);
  }, 600);
  console.log(userMessage);
};
sendChatBtn.addEventListener('click', handleChat);
chatToggler.addEventListener('click', () =>
  document.body.classList.toggle('show-chatbot')
);
closeBtn.addEventListener('click', () =>
  document.body.classList.remove('show-chatbot')
);

chatInput.addEventListener('input', () => {
  //Adjust the height of the textarea according to the input size
  chatInput.style.height = `${chatInputHeight}px`;
  chatInput.style.height = `${chatInput.scrollHeight}px`;
});
