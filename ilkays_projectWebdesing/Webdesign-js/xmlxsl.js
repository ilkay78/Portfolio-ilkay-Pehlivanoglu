function loadAndShowXSLCard() {
    Promise.all([
      fetch("kontaktformular.xml").then(r => r.text()),
      fetch("kontaktformular.xsl").then(r => r.text())
    ]).then(([xmlText, xslText]) => {
  //parseFromString wandelt einen Text in ein DOM-Dokument um
      const parser = new DOMParser();
      const xml = parser.parseFromString(xmlText, "text/xml");
      const xsl = parser.parseFromString(xslText, "text/xml");
  
      //Hier ist die Umwandlung, Wandle das XML mithilfe des XSL um
      const processor = new XSLTProcessor();
      processor.importStylesheet(xsl);
  
      const result = processor.transformToFragment(xml, document);
  
      
      const card = document.createElement("div");
      card.className = "card shadow-lg border-success";
      card.innerHTML = `
        <div class="card-header bg-success text-white">
          DANKE
        </div>
        <div class="card-body"></div>
      `;
  
      card.querySelector(".card-body").appendChild(result);
      document.getElementById("confirmContainer").appendChild(card);
  
  card.style.position = "fixed";
  card.style.left = "50%";
  card.style.bottom = "-300px";
  card.style.transform = "translateX(-50%)";
  card.style.opacity = "0";
  card.style.transition = "bottom 0.9s ease, opacity 0.6s ease";
  
  setTimeout(() => {
    card.style.bottom = "80%";
    card.style.opacity = "1";
  }, 50);
  
  setTimeout(() => {
    card.style.bottom = "-300px";
    card.style.opacity = "0";
    setTimeout(() => card.remove(), 800);
  }, 5500);
    });
  }
  document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contactForm");
  form.addEventListener("submit", function (e) {
      e.preventDefault(); 
  loadAndShowXSLCard();
    });
  });