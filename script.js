const socket = io('http://localhost:3000');
const messageContainer = document.getElementById("message-container");
const form = document.getElementById("send-container");
const messageInput = document.getElementById("message-input");

const nameInputDiv = document.getElementById("name-input");
const nameInput = document.querySelector("#name-input > form");
const nname = document.getElementById("name");
const sendName = document.getElementById("send-name");
nameInput.addEventListener('submit', e => {
    e.preventDefault();
    const namE = nname.value;
    appendMessage("You joined !");
    socket.emit('new-user', namE);
    nameInputDiv.style.display = "none";
});


socket.on('chat-message', data => {
    appendMessage(`${data.name}`, `${data.message}`, "incoming-message", "incoming");
});
socket.on('user-connected', data => {
    appendMessage(`${data} connected !`,"");
});
socket.on('user-disconnected', data => {
    appendMessage(`${data} disconnected !`,"");
});

form.addEventListener('submit', e =>{
    e.preventDefault();
    const message = messageInput.value;
    appendMessage(`You`, `${message}`, "outgoing-message", "outgoing");
    socket.emit('send-chat-message', message);
    messageInput.value = '';
});

function appendMessage(name, message, className, parent){
    const messageElem = document.createElement('div');
    const parentElem = document.createElement('div');
    const messageHeader = document.createElement('div');
    messageElem.classList.add(className);
    parentElem.classList.add(parent);
    messageHeader.classList.add(parent+'-header');
    messageElem.innerText = message;
    messageHeader.innerText = name;
    messageContainer.append(parentElem);
    parentElem.append(messageHeader);
    parentElem.append(messageElem);
}