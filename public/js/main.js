const socket=io();
console.log(socket);
const input = document.getElementById("input");
const enviar = document.getElementById("enviar");
enviar.addEventListener("click",()=>{
    socket.emit("message",input.value);
    input.value="";
});

enviar.addEventListener("click", () => {
  socket.emit("message", input.value);

  input.value = "";
});

socket.on("mensajes", (mensajes) => {
  const mensajesUl = document.getElementById("mensajes");

  mensajesUl.innerHTML = "";

  mensajes.forEach((mensajes) => {
    const li = document.createElement("li");
    li.innerText = `${mensajes.socketid}: ${mensajes.mensaje}`;

    mensajesUl.appendChild(li);
  });
});