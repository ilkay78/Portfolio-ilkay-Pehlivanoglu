const firstContainer = document.querySelector("#container")[0];
const delCard = document.querySelector(".del-card");
const addCard = document.querySelector(".add-card");
const saveCard = document.querySelector(".save");
const closeCard = document.querySelector(".close");
const containerSection = document.querySelector(".container-section");

const question = document.querySelector("#question");
const answer = document.querySelector("#answer");
const questionCards = document.querySelector(".question-cards");

let containArray = localStorage.getItem("items")
  ? JSON.parse(localStorage.getItem("items"))
  : [];

const createCard = (text) => {
  const divFirst = document.createElement("div");
  divFirst.className = "question-card";
  const divSecond = document.createElement("div");
  divSecond.className = "question-content";
  const firstP = document.createElement("p");
  firstP.setAttribute(
    "style",
    "border-bottom:3px solid tan; margin:10px;padding:12px;"
  );
  firstP.textContent = text.ask;
  const secondP = document.createElement("p");
  secondP.textContent = text.ans;
  secondP.setAttribute(
    "style",
    "display:none; color:green;margin:10px;padding:12px;"
  );
  divSecond.appendChild(firstP);
  divSecond.appendChild(secondP);
  divFirst.appendChild(divSecond);
  questionCards.appendChild(divFirst);

  const divEdiX = document.createElement("div");
  divEdiX.className = "edix";
  const firstA = document.createElement("a");
  firstA.setAttribute("href", "#");
  const firstI = document.createElement("i");
  firstI.innerHTML = "EDIT";
  const secondA = document.createElement("a");
  secondA.setAttribute("href", "#");
  const secondI = document.createElement("i");
  secondI.innerHTML = "X";

  secondA.appendChild(secondI);
  firstA.appendChild(firstI);
  divEdiX.appendChild(firstA);
  divEdiX.appendChild(secondA);
  divFirst.appendChild(divEdiX);
  firstP.addEventListener("click", () => {
    if ((secondP.style.display = "none")) {
      secondP.style.display = "block";
    } else {
      secondP.style.display = "none";
    }
  
  });
  /*firstA.addEventListener('click',(e)=>{
text.ask.value.replace(e.target.value);
text.ans.value.replace(e.target.value);


  });*/
  secondA.addEventListener('click',()=>{
  divFirst.remove();
  containArray.map((card,index)=>{
    if(card || secondI.innerHTML === 'X'){
      containArray.splice(index,1)
      
    }
    localStorage.setItem('items',JSON.stringify(containArray))
  })
  });


};


//containArray.forEach(createCard);
const addCardToUI = () => {
 
  let questionObj = {
    ask: question.value,
    ans: answer.value,
  };
  containArray.push(questionObj);
  localStorage.setItem("items", JSON.stringify(containArray));
  createCard(containArray[containArray.length - 1], containArray.length - 1);

  questionCards.style.display = "block";
  question.value = "";
  answer.value = "";
};


saveCard.addEventListener("click", addCardToUI);

closeCard.addEventListener("click", () => {
  containerSection.style.display = "none";
});
addCard.addEventListener("click", () => {
  containerSection.style.display = "block";
  
});

const deleteCard = () => {
  
  if(containArray.length = 0)
    containArray.map((card)=>{
     card.splice(0,10)
    })
   localStorage.setItem('items',JSON.stringify(containArray));
   location.reload();
   
  }
  delCard.addEventListener("click", deleteCard);

