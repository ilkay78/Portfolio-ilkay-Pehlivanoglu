let random_margin = ["-5px", "1px", "5px", "10px", "7px"];
let random_colors = ["greenyellow", "darkgoldenrod", "darkmagenta", "maroon", "sandybrown", "skyblue", "hotpink"];
let random_degree = ["rotate(-3deg)", "rotate(-36deg)", "rotate(-9deg)", "rotate(-12deg)", "rotate(-15deg)", "rotate(-18deg)"];
let index = 0;
let contentArray = localStorage.getItem('stick_notes') ? JSON.parse(localStorage.getItem('stick_notes')) : [];


window.onload = () => {
  contentArray.forEach(note => {
    createStickyNote(note);
  });
};

document.querySelector("#add_note").addEventListener("click", () => {
  document.querySelector("#modal").style.display = "block";
});

document.querySelector("#hide").addEventListener("click", () => {
  document.querySelector("#modal").style.display = "none";
});

document.querySelector("#user_input").addEventListener('keydown', (event) => {
  if(event.key === 'Enter'){
    const text = document.querySelector("#user_input");
    contentArray.push(text.value);
    localStorage.setItem('stick_notes', JSON.stringify(contentArray));
    createStickyNote(contentArray[contentArray.length -1]);
    text.value = "";
  }
});



createStickyNote = (text) => {
  let note = document.createElement("div");
  let details = document.createElement("div");
  let noteText = document.createElement("h2");

  note.className = "note";
  details.className = "details";
  noteText.textContent = text;

  details.appendChild(noteText);
  note.appendChild(details);

  if(index > random_colors.length - 1)
    index = 0;

  note.setAttribute("style", `margin:${random_margin[Math.floor(Math.random() * random_margin.length)]}; 
  background-color:${random_colors[index++]}; transform:${random_degree[Math.floor(Math.random() * random_degree.length)]}`);

note.addEventListener("dblclick", () => {
  let noteText = note.querySelector("h2").textContent;

  contentArray = contentArray.filter(item => item !== noteText);
  localStorage.setItem('stick_notes', JSON.stringify(contentArray));

  note.remove();
});


  document.querySelector("#all_notes").appendChild(note);
}



