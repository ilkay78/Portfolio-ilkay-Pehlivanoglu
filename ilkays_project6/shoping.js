const pencil = document.querySelector("#pencil");
const allItems = document.querySelector("#allItems");
const userInput = document.querySelector("#userInput");
let containerArray = localStorage.getItem("list")
  ? JSON.parse(localStorage.getItem("list"))
  : [];

window.onload = () => {
  containerArray.forEach((item) => {
    addItem(item);
  });
};

pencil.addEventListener("click", function () {
  allItems.innerHTML = "";
  localStorage.removeItem("list");
});
// note.addEventListener("dblclick", () => {
//   let noteText = note.querySelector("h2").textContent;

//   contentArray = contentArray.filter(item => item !== noteText);
//   localStorage.setItem('stick_notes', JSON.stringify(contentArray));

//   note.remove();
eraseList = (text) => {
  containerArray = containerArray.filter((i) => i.trim() !== text.trim());
      localStorage.setItem("list", JSON.stringify(containerArray));
      
    }

userInput.addEventListener("keydown", function (event) {
  if (event.key == "Enter") {
    event.preventDefault();
    let text = "- " + event.target.value;
    containerArray.push(text);
    localStorage.setItem("list", JSON.stringify(containerArray));
    addItem(text);
  }
});
// beforebegin: Before the target element itself.
//afterbegin: Just inside the target element, before its first child.
//beforeend: Just inside the target element, after its last child.
//afterend: After the target element itself.
function addItem(text) {
  let h2 = document.createElement("h2");
  // h2.innerHTML= "- " + userInput.value;
  h2.innerHTML = text;
  h2.addEventListener("click", function () {
    h2.style.textDecoration = "line-through";
    console.log(h2.textContent);
    eraseList(h2.textContent);
    setTimeout(() => {
        h2.remove();
      }, 2000);
  });
  allItems.insertAdjacentElement("beforeend", h2);
  userInput.value = "";
}
