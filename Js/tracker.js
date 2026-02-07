document.addEventListener("DOMContentLoaded", function () {

  const form = document.getElementById("progressForm");

  // Inputs
  const titleInput = document.getElementById("bookTitle");
  const totalInput = document.getElementById("totalPages");
  const readInput = document.getElementById("pagesRead");
  const speedInput = document.getElementById("speed");

  // Display elements
  const progressFill = document.getElementById("progressFill");
  const percentLabel = document.getElementById("percentLabel");
  const pagesLabel = document.getElementById("pagesLabel");
  const remainingEl = document.getElementById("remainingPages");
  const daysEl = document.getElementById("daysToFinish");
  const rateEl = document.getElementById("completionRate");
  const messageBox = document.getElementById("message");

  // Load saved data
  loadSaved();

  // Update when typing
  form.addEventListener("input", updateProgress);

  // Load book suggestions
  const books = JSON.parse(localStorage.getItem("books") || "[]");
  const datalist = document.getElementById("bookSuggestions");

  books.forEach(book => {
    let option = document.createElement("option");
    option.value = book.title;
    datalist.appendChild(option);
  });

  // ---------------- FUNCTIONS ----------------

  function updateProgress() {

    let total = Number(totalInput.value);
    let read = Number(readInput.value);
    let speed = Number(speedInput.value);

    if (!total || total <= 0) return;

    let percent = Math.min(Math.round((read / total) * 100), 100);
    let remaining = Math.max(total - read, 0);
    let days = speed > 0 ? Math.ceil(remaining / speed) : 0;

    progressFill.style.width = percent + "%";
    percentLabel.textContent = percent + "%";
    pagesLabel.textContent = read + " / " + total + " pages";
    remainingEl.textContent = remaining;
    daysEl.textContent = days;
    rateEl.textContent = percent + "%";
  }

  window.saveProgress = function () {

    let data = {
      title: titleInput.value,
      total: totalInput.value,
      read: readInput.value,
      speed: speedInput.value
    };

    localStorage.setItem("readingData", JSON.stringify(data));
    messageBox.textContent = "Progress saved!";
  };

  function loadSaved() {

    let saved = localStorage.getItem("readingData");

    if (!saved) return;

    let data = JSON.parse(saved);

    titleInput.value = data.title || "";
    totalInput.value = data.total || "";
    readInput.value = data.read || "";
    speedInput.value = data.speed || "";

    updateProgress();
  }

  window.resetProgress = function () {
    localStorage.removeItem("readingData");
    location.reload();
  };

});