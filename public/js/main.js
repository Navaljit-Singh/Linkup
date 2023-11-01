const chatform = document.getElementById('chat-form');

const socket = io();
var demo = document.getElementById('chat-messages');
const rooooom = document.getElementById("room-name");
const userlist = document.getElementById("users");


// getting previous form data using qs from url 
const {username , room} = Qs.parse(location.search,{
    ignoreQueryPrefix :true 
});

socket.emit('join-room' , {username , room});

socket.on("welcome" , (mess)=>{
    addWelcomeMessage(mess);
    demo.scrollTop = demo.scrollHeight;
});
socket.on("add" ,(mess)=>{
   
    addWelcomeMessage(mess);
    demo.scrollTop = demo.scrollHeight;

});
socket.on("left",(mess)=>{
    addWelcomeMessage(mess);
    demo.scrollTop = demo.scrollHeight;

});
 socket.on("message",(msg)=>{
      addWelcomeMessage(msg);
       demo.scrollTop = demo.scrollHeight;
    });
// message submit
chatform.addEventListener('submit',(e)=>{
    e.preventDefault();
    const msg = e.target.elements.msg.value;
    //sending messaage to server
    socket.emit('chatMessage' , msg);
   
   
    e.target.elements.msg.value ="";
    e.target.elements.msg.focus();

});

// getting room and user details 
socket.on("userroomdata" , (msg)=>{
    rooooom.innerHTML=msg.room ; 
    addUserlist(msg.list);
});
  

  
 
 function addWelcomeMessage(msg) { 
    
    
    
    var message = document.createElement('div');
   
    message.setAttribute('class', "message");
    message.innerHTML=`<p class="meta">${msg.username} <span>${msg.time}</span></p>
    <p class="text">
        ${msg.text}
    </p> `;
    
    demo.appendChild(message);  
    
 }
 
 function addUserlist(list) {
   userlist.innerHTML = `
   ${list.map(user=>`<li>${user.username}</li>`).join('')}
   `
    
 }