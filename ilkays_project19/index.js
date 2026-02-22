
let index = 0;
let colors =["hotpink","magenta","maroon","skyblue","goldenrod","yellowgreen","bisque","blueviolet"];
let button =document.querySelector("#colors");
let body =document.querySelector("body")
let container =document.querySelector(".container");


button.addEventListener("click",()=>{

    body.style.background = colors[index++];
    if (index > colors.length - 1){
        index = 4;
 
}});



/*
let index = 0;

function changeColors(){
let colors =["red","blue","orange","yellow","green","purple"];
document.getElementsByTagName("body")[0].style.background = colors[index++];

if(index > colors.length - 1)
index=0;
let newButton = document.createElement("button");
newButton.style.background="red";
newButton.className = "btn btn-primary";
newButton.textContent = "click me";
newButton.type = "button"
newButton.id="colors"
container.replaceChild(newButton,container.childNodes[1]);
body.removeChild(body.children[0])
console.log(body.children[0])
}
*/
