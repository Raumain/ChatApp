const socket = io('http://localhost:3000');
const messageContainer = document.getElementById("message-container");
const form = document.getElementById("send-container");
const messageInput = document.getElementById("message-input");

const namE = prompt("What's your name ?");
appendMessage("You joined !");
socket.emit('new-user', namE);

socket.on('chat-message', data => {
    appendMessage(`${data.name}: ${data.message}`);
});
socket.on('user-connected', data => {
    appendMessage(`${data} connected !`);
});
socket.on('user-disconnected', data => {
    appendMessage(`${data} disconnected !`);
});

form.addEventListener('submit', e =>{
    e.preventDefault();
    const message = messageInput.value;
    appendMessage(`You: ${message}`);
    socket.emit('send-chat-message', message);
    messageInput.value = '';
});

function appendMessage(message){
    const messageElem = document.createElement('div');
    messageElem.innerText = message;
    messageContainer.append(messageElem);
}