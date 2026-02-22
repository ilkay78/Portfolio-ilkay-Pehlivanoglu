const messageInput = document.querySelector("#message-input");

messageInput.addEventListener("keydown",(event)=>{
  console.log(event)
  if(event.key == "Enter") 
    getMessage();
});

function getMessage() {
  messageOutput = document.querySelector("#message-output");
  messageOutput.innerHTML = messageInput.value.trim();
  console.log(messageInput.value)
  messageInput.value = "";
}
