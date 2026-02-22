
fetch('navbar.html')
  .then(res => res.text())
  .then(data => {
    // console.log(data);
    if (!data) {
      console.warn("Navbar konnte nicht geladen werden.");
      return;
    }

    const header = document.getElementById("site-header");
    if (!header) {
      console.warn("site-header nicht gefunden!");
      return;
    }
    header.innerHTML = data;
    console.log(header);

    const containerLogo = header.querySelector('.container-logo');
    if (containerLogo) {
      containerLogo.addEventListener('click', () => {
        
        let card = document.querySelector('.card-invitation');
        
        if (!card) {
          card = document.createElement('div');
          card.className = 'card-invitation';
          card.textContent = "Ich freue mich auf die Einladung!";
          document.body.appendChild(card);
        }

        
        card.style.display = 'block';
        card.style.animation = 'none';     
        card.style.animation = 'floatCard 5s ease-in-out';
    

        
        setTimeout(() => {
          card.style.display = 'none';
        }, 3000);
      });

      
    }












    

/** <!-- <div id="container-mond" class="moon">

        </div> -->
        <!-- <button class="mond">

            <i class="fa-solid fa-moon"></i>
        </button>
<i class="fa-solid fa-sun"></i> --> */
    const containerMond = header.querySelector("#container-mond");
    if (containerMond) {
      containerMond.addEventListener("click", () => {
        document.body.classList.toggle("dark");
      });
    }

   
    const hamburger = header.querySelector(".hamburger-menu");
    const navMenu = header.querySelector(".navlist");
    if (hamburger && navMenu) {
      hamburger.addEventListener("click", () => {
        navMenu.classList.toggle("show-hamburger-menu");
      });
    }

 
    const searchInput = header.querySelector("#search");
    if (searchInput) {
      searchInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          const value = searchInput.value.trim();
          //Falls nicht project.html seite , dann  weiterleiten
          if (!window.location.pathname.includes("project.html")) {
            window.location.href = "project.html?search=" + 
            //encodeURIComponent() kodiert Sonderzeichen korrekt für eine URL(lesen)
            encodeURIComponent(value);

          } else {
            filterProjectCards(value);
          }
        }
      });
    }
  });


//ich hole die Projecte als wäre von Datenbank
async function fetchProjectTitle(i) {
  try {
    const res = await fetch(`/ilkays_project${i}/index.html`);
    console.log(res)
    if (!res.ok){
      console.warn(`Project ${i} nicht gefunden!`);
      
      return null;
    } 
    const html = await res.text();
    const doc = new DOMParser().parseFromString(html,"text/html");
    console.log(doc);

    // const doc = new DOMParser().parseFromString(await res.text(), "text/html");
    const title = doc.querySelector("title") || document.querySelector("h1");
    return title ? title.textContent.trim() : null;
    // const title = doc.querySelector("title, h1")?.textContent;
    // return title?.trim() ?? null;

  } catch(err) {
    console.error("Fetch fehler (Title):",err);
    return null;
  }
}



document.addEventListener("DOMContentLoaded", async () => {

  const projectContainer = document.querySelector("#project-container");


  if (projectContainer) {
    const projectCount = 12;

    for (let i = 1; i <= projectCount; i++) {
      const card = createProjectCard(i);
      projectContainer.appendChild(card);

      const title = await fetchProjectTitle(i) || `Project ${i}`;
      const h = card.querySelector(".project-title");
      if (h) h.textContent = title;
    }

  /**Quelle Mdn Reference
   URLSearchParams-Objekte sind iterierbar, sodass sie direkt in einer for...of-Struktur verwendet werden können, um über Schlüssel/Wert-Paare in der gleichen Reihenfolge zu iterieren, wie sie in der Abfragezeichenfolge erscheinen/URLSearchParams macht es einfach, einzelne Parameter auszulesen.
   URL = http://127.0.0.1:5501/ilkays_projectWebdesing/index.html?search=todo
   */
    const params = new URLSearchParams(window.location.search);
    const searchValue = params.get("search")?.toLowerCase() || "";
    const searchInput = document.getElementById("search");
    if (searchInput) searchInput.value = searchValue;

    filterProjectCards(searchValue);

  
    if (searchInput) {
      searchInput.addEventListener("input", () => {
        const value = searchInput.value.trim().toLowerCase();
        filterProjectCards(value);
      });
    }
  }

});


//value zB = todo 
function filterProjectCards(value) {
  const cards = document.querySelectorAll(".card");
  cards.forEach(card => {
    const title = card.querySelector(".project-title")?.textContent.toLowerCase() || "";
    card.style.display = title.includes(value) ? "block" : "none";
  });
}



function createProjectCard(i) {
  const div = document.createElement("div");
  div.className = "card";

  const h1 = document.createElement("h1");
  h1.className = "project-title";
  h1.textContent = "Ilkay`s Project";

  const a = document.createElement("a");
  a.href = `/ilkays_project${i}/index.html`;
  a.target = "_blank";

  const img = document.createElement("img");
  img.src = `photos/projectBild${i}.png`;
  img.className = "project-img";
  img.alt = `Project Bild ${i}`;

  a.appendChild(img);
  div.appendChild(h1);
  div.appendChild(a);

  return div;
}



  