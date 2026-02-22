document.addEventListener('DOMContentLoaded', () => {
    const dateElement = document.querySelector('.date');
    const today = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'Europe/Vienna' };
    dateElement.textContent = `Wien, ${today.toLocaleDateString('de-DE', options)}`;
    console.log(dateElement.textContent);

    const card = document.querySelector('.card');
    const buttons = document.querySelectorAll('.change-btn');

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            card.classList.toggle('change-btn');
        });
    });
  });


 