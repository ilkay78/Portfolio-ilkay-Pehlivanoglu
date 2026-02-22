const flashcards = document.getElementsByClassName("flashcards")[0];
const createBox = document.getElementsByClassName("create-box")[0];
const question = document.getElementById("question");
const answer = document.getElementById("answer");
let contentArray = localStorage.getItem("items")
  ? JSON.parse(localStorage.getItem("items"))
  : [];

contentArray.forEach(divMaker);
function divMaker(text) {
  let div = document.createElement("div");
  div.className = "flashcard";
  let h2_question = document.createElement("h2");
  h2_question.setAttribute(
    "style",
    "border-bottom:1px solid red; padding: 15px; margin:30px"
  );
  h2_question.innerHTML = text.my_question;
  let h3_answer = document.createElement("h3");
  h3_answer.setAttribute(
    "style",
    "text-align:center; display:none; color:green;"
  );
  h3_answer.innerHTML = text.my_answer;

  div.appendChild(h2_question);
  div.appendChild(h3_answer);
  div.addEventListener("click", function () {
    if (h3_answer.style.display == "none")
       h3_answer.style.display = "block";
    else h3_answer.style.display == "none";
  });
  flashcards.appendChild(div);
}

function addFlashCards() {
 let flashcard_Info = {
    my_question: question.value,
    my_answer: answer.value,
  };
  contentArray.push(flashcard_Info);
  localStorage.setItem("items", JSON.stringify(contentArray));
  divMaker(contentArray[contentArray.length - 1],contentArray.length -1);
  question.value = "";
  answer.value = "";
}

function delFlashCards() {
  localStorage.clear();
  flashcards.innerHTML = "";
  contentArray = [];
}
function showcreateCardBox() {
  createBox.style.display = "block";
}

function hideCreateBox() {
  createBox.style.display = "none";
}

