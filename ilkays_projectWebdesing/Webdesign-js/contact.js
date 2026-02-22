document.addEventListener("DOMContentLoaded", () => {

  function changeFormular() {
    const animationContainer = document.querySelector(".formular-animation-container");
    // 2.Form container
    const cardContainer = document.querySelector(".formular-container");

    if (!animationContainer || !cardContainer) return;

    const isSmallScreen = window.matchMedia("(max-width: 768px)").matches;
    animationContainer.style.display = isSmallScreen ? "none" : "block";
    cardContainer.style.display = isSmallScreen ? "block" : "none";
  }

  changeFormular();
  window.addEventListener("resize", changeFormular);
//resize  führe changeFormular aus, sobald das Fenster in seiner Größe verändert wird
  const forms = document.querySelectorAll(".contact-form");

  forms.forEach(form => {
    form.addEventListener("submit", e => {
      e.preventDefault();
//Normalerweise lädt ein Formular die Seite neu und funktioniert nur bei Events, die ein Standardverhalten haben
      clearErrors(form);

      if (!validateForm(form)) return;

     
      const xmlData = createXMLData(form);

      
      downloadXML(xmlData, "kontaktformular.xml");

      
      const templateParams = {
        name: form.name?.value || "",
        surname: form.surname?.value || "",
        address: form.address?.value || "",
        plz: form.plz?.value || "",
        city: form.city?.value || "",
        phone: form.phone?.value || "",
        email: form.email?.value || "",
        comment: form.comment?.value || "",
      };

      emailjs.send('service_xulz6bk', 'template_0au4r4g', templateParams)
        .then(() => {
          alert("Danke! Ihre Nachricht wurde gesendet.");
          form.reset();
        })
        .catch((err) => {
          console.error("Fehler beim Senden:", err);
          alert("Fehler beim Senden der Nachricht.");
        });
    });
  }
);

  

  function validateForm(form) {
    let valid = true;
//ich habe hier InputName und error message gegeben
    const requiredFields = [
      ["name", "Name darf nicht leer sein"],
      ["surname", "Nachname darf nicht leer sein"],
      ["address", "Addresse darf nicht leer sein"],
      ["plz", "PLZ darf nicht leer sein"],
      ["city", "Bundesland auswählen"],
      ["email", "E-Mail darf nicht leer sein"],
      ["phone", "Telefonnummer darf nicht leer sein"]
    ];
 //hier ich habe destructing  
    requiredFields.forEach(([field, msg]) => {
      if (form[field] && form[field].value.trim() === "") {
        showError(form[field], msg);
        valid = false;
      }
    });

    if (form.email && form.email.value &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.value)) {
      showError(form.email, "Ungültige E-Mail-Addresse");
      valid = false;
    }

    if (form.phone && form.phone.value &&
        !/^[0-9]{6,15}$/.test(form.phone.value)) {
      showError(form.phone, "Telefonnummer ungültig");
      valid = false;
    }

    const genderInputs = form.querySelectorAll('input[name="geschlecht"]');
    if (genderInputs.length && !form.querySelector('input[name="geschlecht"]:checked')) {
      showError(genderInputs[0], "Geschlecht wählen");
      valid = false;
    }

    const kontaktInputs = form.querySelectorAll('input[name="kontakt[]"]');
    if (kontaktInputs.length && !form.querySelector('input[name="kontakt[]"]:checked')) {
      showError(kontaktInputs[0], "Kontaktart wählen");
      valid = false;
    }

    return valid;
  }

  function showError(input, message) {
    const error = input.closest("li, td")?.querySelector(".error");
    if (error) error.textContent = message;
  }

  function clearErrors(form) {
    setTimeout(() => {
      form.querySelectorAll(".error").forEach(e => e.textContent = "");
    }, 3000);
    
  }

  
  function createXMLData(form) {
    const datum = new Date().toISOString().split('T')[0]; 
    return `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="kontaktformular.xsl"?>

<kontaktformular>
  <name>${form.name?.value || ""}</name>
  <surname>${form.surname?.value || ""}</surname>
  <address>${form.address?.value || ""}</address>
  <plz>${form.plz?.value || ""}</plz>
  <city>${form.city?.value || ""}</city>
  <phone>${form.phone?.value || ""}</phone>
  <email>${form.email?.value || ""}</email>
  <comment>${form.comment?.value || ""}</comment>
  <datum>${datum}</datum>
</kontaktformular>`;
  }

 
  function downloadXML(data, filename) {
    const blob = new Blob([data], { type: "text/xml;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    a.click();
  }
});




