const socket = io('http://localhost:8000');
const form = document.getElementById('send-container');

const message = document.getElementById('messageInp');

const messageContainer = document.querySelector(".container");
var audio = new Audio('ting.mp3')
const append = (message,position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position=='left' || position=='middle'){
        audio.play()
    }

}

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message = messageInp.value;
    append(`You: ${message}` , 'right');
    socket.emit('send' , message);
    messageInp.value = ''
})

const name = prompt("Enter your name to join" , "User")
socket.emit('new-user-joined' , name);

socket.on('user-joined', name=>{
    append(`${name} joined the chat!` , 'middle')
})

socket.on('receive', data=>{
append(`${data.name} : ${data.message}` , 'left')
})
socket.on('left', name=>{
    append(`${name} left the chat!` , 'middle')
}) 
 
