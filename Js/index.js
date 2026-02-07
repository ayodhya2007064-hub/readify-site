// (quotes / author of the day)
document.addEventListener("DOMContentLoaded", () => {
  //  Quotes 
  const quotes = [
    { text: "Good friends, good books, and a sleepy conscience: this is the ideal life.", author: "Mark Twain" },
    { text: "Be the change that you wish to see in the world.", author: "Mahatma Gandhi" },
    { text: "The man who does not read has no advantage over the man who cannot read.", author: "Mark Twain" },
    { text: "Life is what happens to us while we are making other plans.", author: "Allen Saunders" },
    { text: "So many books, so little time.", author: "Frank Zappa" },
    { text: "I have not failed. I've just found 10,000 ways that won't work.", author: "Thomas A. Edison" }
  ];

  let currentIndex = 0;
  const quoteText = document.getElementById("quoteText");
  const quoteAuthor = document.getElementById("quoteAuthor");

  if (quoteText && quoteAuthor) {
    quoteText.textContent = `"${quotes[0].text}"`;
    quoteAuthor.textContent = `– ${quotes[0].author}`;

    setInterval(() => {
      currentIndex = (currentIndex + 1) % quotes.length;
      quoteText.textContent = `"${quotes[currentIndex].text}"`;
      quoteAuthor.textContent = `– ${quotes[currentIndex].author}`;
    }, 4000);
  }

  //Author of the day 
  const authors = [
    { name: "J.K. Rowling", desc: "Author of the Harry Potter series" },
    { name: "George Orwell", desc: "Author of 1984 and Animal Farm" },
    { name: "Jane Austen", desc: "Author of Pride and Prejudice" },
    { name: "Stephen King", desc: "Author of horror and fantasy novels" },
    { name: "Agatha Christie", desc: "Queen of mystery novels" }
  ];

  const authorNameEl = document.getElementById("authorName");
  const authorDescEl = document.getElementById("authorDesc");

  if (authorNameEl && authorDescEl) {
    const today = new Date().getDate();
    const authorIndex = today % authors.length;
    authorNameEl.textContent = authors[authorIndex].name;
    authorDescEl.textContent = authors[authorIndex].desc;
  }
})
