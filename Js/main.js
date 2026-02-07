// hamburger menu
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");

  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });

});

//newletterEmails
function saveNewsletterEmail() {

  const emailInput = document.getElementById("newsletterEmail");
  const message = document.getElementById("newsletterMsg");

  const email = emailInput.value.trim();

  if (email === "") {
    message.textContent = "Please enter an email!";
    return;
  }

  // Save to localStorage
  localStorage.setItem("newsletterEmail", email);

  message.textContent = "Subscribed successfully!";
  emailInput.value = "";

}

//Progressive Web App (PWA)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js')
      .then(() => console.log("PWA Active!"))
      .catch(() => console.log("PWA Failed"));
  });
}
