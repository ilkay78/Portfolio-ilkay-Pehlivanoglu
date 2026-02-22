const container = document.getElementById('container');
const formContainer= document.getElementById('form-container');
const form = document.getElementById('form');
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const clearButton = document.getElementById('clear-button');
const buttonContainer = document.getElementById('button-container');
const imgContainer = document.getElementById('img-container');

function runEventListeners() {
  form.addEventListener("submit",search);
  clearButton.addEventListener("click",clear)

}
runEventListeners();
function clear(){
    searchInput.value="";
    imgContainer.innerHTML="";
}
/*
Authorization: Client-ID YOUR_ACCESS_KEY
You can also pass this value using a client_id query parameter:
https://api.unsplash.com/photos/?client_id=YOUR_ACCESS_KEY
*/
function search(e){
    const value = searchInput.value.trim();
    console.log(value);
   const response =  fetch(`https://api.unsplash.com/search/photos?query=${value}`,{
        method:"GET",
        headers:{
            Authorization:"Client-ID uxIQrso4x4DjPOLza3rIKiuuFmIn-jdkN1ysuUk5N3k",
        }
      })
  
    .then((res)=>res.json())
    .then((data)=>data.results.map(result=>{
        console.log(result);
        addImageToUI(result.urls.small)
    })
)
    .catch((err)=>console.log(err))
     console.log(response);
e.preventDefault();
}

function addImageToUI(url){
    const div = document.createElement("div");
    div.className="card";
    const img = document.createElement("img");
    img.setAttribute("src",url);
    img.height="300";
    img.width= "300";
    div.append(img);
    imgContainer.append(div);
}