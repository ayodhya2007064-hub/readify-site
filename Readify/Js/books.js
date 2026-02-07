// Book data
document.addEventListener("DOMContentLoaded", () => {
  const books = [ 
    {
    id: "b1",
    title: "The Ember Gate",
    author: "N. R. Vale",
    genre: "Fantasy",
    pages: 412,
    synopsis: "A young blacksmith discovers an ancient ember that awakens forgotten gods. Book 1 of the Ember Series.",
    prequels: [],
    sequels: ["b2"],
    image: "img/The Ember Gate.jpg",
    reviews: [
      { reviewer: "Maya", rating: 5, comment: "Lush worldbuilding and great pacing." },
      { reviewer: "Jon", rating: 4, comment: "Strong characters; loved the climax." }
    ]
  },
  {
    id: "b2",
    title: "The Ashes of Valor",
    author: "N. R. Vale",
    genre: "Fantasy",
    pages: 450,
    synopsis: "The realm balances on the edge of war as the gods demand a sacrifice. Book 2 of the Ember Series.",
    prequels: ["b1"],
    sequels: [],
    image: "img/The Ashes of Valor.jpg",
    reviews: [
      { reviewer: "Kofi", rating: 4, comment: "A satisfying continuation of the first book." },
      { reviewer: "Elena", rating: 5, comment: "Heartbreaking and beautiful." }
    ]
  },
  {
    id: "b3",
    title: "Project Hail Mary",
    author: "Andy Weir",
    genre: "Science Fiction",
    pages: 476,
    synopsis: "A standalone story of a lone astronaut using science to save humanity.",
    prequels: [],
    sequels: [],
    image: "img/Project Hail Mary.jpg",
    reviews: [
      { reviewer: "Sam", rating: 5, comment: "The best sci-fi I have read in years!" },
      { reviewer: "Chris", rating: 5, comment: "I loved the friendship in this book." }
    ]
  },
  {
    id: "b4",
    title: "Nexus",
    author: "Ramez Naam",
    genre: "Science Fiction",
    pages: 400,
    synopsis: "In the near future, a nano-drug can link minds. One scientist must decide if it's a tool for evolution or a weapon for control.",
    prequels: [],
    sequels: ["b5"],
    image: "img/Nexus.jpg",
    reviews: [
      { reviewer: "Alex", rating: 5, comment: "Mind-blowing concept!" },
      { reviewer: "Jordan", rating: 4, comment: "Very fast-paced and exciting." }
    ]
    
  },
  {
    id: "b5",
    title: "Crux",
    author: "Ramez Naam",
    genre: "Science Fiction",
    pages: 512, 
    synopsis: "The global struggle over the Nexus technology escalates as the link between minds starts to break and governments hunt the creators.",
    prequels: ["b4"],
    sequels: [],
    image: "img/Crux.jpg",
    reviews: [
      { reviewer: "Charlie", rating: 5, comment: "A perfect sequel that raises the stakes." },
      { reviewer: "Sasha", rating: 4, comment: "Incredible action scenes." }
    ]
    
  },
  {
    id: "b6",
    title: "The Silent Patient",
    author: "Alex Michaelides",
    genre: "Mystery",
    pages: 336,
    synopsis: "A woman shoots her husband and never speaks again; a therapist is determined to uncover her motive.",
    prequels: [],
    sequels: [],
    image: "img/The Silent Patient.jpg",
    reviews: [{ reviewer: "Tess", rating: 5, comment: "An incredible plot twist!" }]
  },
  {
    id: "b7",
    title: "The Guest List",
    author: "Lucy Foley",
    genre: "Mystery",
    pages: 330,
    synopsis: "A wedding on a remote island turns deadly when a body is found and everyone has a motive.",
    prequels: [],
    sequels: [],
    image: "img/The Guest List.jpg",
    reviews: [{ reviewer: "Mark", rating: 4, comment: "Atmospheric and tense." }]
    
  },
  {
    id: "b8",
    title: "Atomic Habits",
    author: "James Clear",
    genre: "Non-fiction",
    pages: 320,
    synopsis: "A practical guide to building good habits and breaking bad ones using the power of 1%.",
    prequels: [],
    sequels: [],
    image: "img/Atomic Habits.jpg",
    reviews: [{ reviewer: "Bea", rating: 5, comment: "Life-changing advice." }]
    
  },
  {
    id: "b9",
    title: "Deep Work",
    author: "Cal Newport",
    genre: "Non-fiction",
    pages: 304,
    synopsis: "Strategies for focused success in a world full of digital distractions.",
    prequels: [],
    sequels: [],
    image: "img/Deep Work.jpg",
    reviews: [{ reviewer: "Dan", rating: 4, comment: "Very useful for students." }]
    
  },
  {
    id: "b10",
    title: "Educated",
    author: "Tara Westover",
    genre: "Memoir",
    pages: 352,
    synopsis: "A woman born to survivalists in the mountains leaves her isolated life to pursue a PhD.",
    prequels: [],
    sequels: [],
    image: "img/Educated.jpg",
    reviews: [{ reviewer: "Ali", rating: 5, comment: "One of the best memoirs ever." }]
    
  }

  ];

  if (!localStorage.getItem("books")) {
  localStorage.setItem("books", JSON.stringify(books));
}

  // --- UI elements
  const booksGrid = document.getElementById("booksGrid");
  const genreSelect = document.getElementById("genreSelect");
  const searchInput = document.getElementById("searchInput");
  const clearBtn = document.getElementById("clearBtn");

  const modal = document.getElementById("bookModal");
  const modalContent = document.getElementById("modalContent");
  const modalCloseBtn = document.getElementById("modalCloseBtn");

  // --- Helpers
  function uniqueGenres(list) {
    const set = new Set(list.map(b => b.genre));
    return Array.from(set).sort();
  }
  function getBookById(id) {
    return books.find(b => b.id === id);
  }
  function avgRating(reviews) {
    if (!reviews || reviews.length === 0) return null;
    const s = reviews.reduce((a, r) => a + (r.rating || 0), 0);
    return (s / reviews.length).toFixed(2);
  }

  // --- Rendering
  function renderGenreOptions() {
    if (!genreSelect) return;
    const genres = uniqueGenres(books);
    genres.forEach(g => {
      const opt = document.createElement("option");
      opt.value = g;
      opt.textContent = g;
      genreSelect.appendChild(opt);
    });
  }

  function renderBooks(filter = { q: "", genre: "all" }) {
    if (!booksGrid) return;
    booksGrid.innerHTML = "";
    const q = (filter.q || "").trim().toLowerCase();
    const genre = filter.genre || "all";

    const filtered = books.filter(b => {
      const matchesGenre = genre === "all" || b.genre === genre;
      const matchesQuery =
        q === "" ||
        b.title.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q);
      return matchesGenre && matchesQuery;
    });

    if (filtered.length === 0) {
      const msg = document.createElement("div");
      msg.textContent = "No books match your search.";
      msg.style.color = "#b8becc";
      msg.style.padding = "16px";
      booksGrid.appendChild(msg);
      return;
    }

    filtered.forEach(b => {
      const card = document.createElement("article");
      card.className = "card";
      card.tabIndex = 0;
      card.setAttribute("role", "button");
      card.setAttribute("aria-pressed", "false");

      const img = document.createElement("img");
      img.className = "cover";
      img.src = b.image;
      img.alt = `${b.title} cover`;

      const meta = document.createElement("div");
      meta.className = "meta";

      const title = document.createElement("h3");
      title.className = "title";
      title.textContent = b.title;

      const author = document.createElement("p");
      author.className = "author";
      author.textContent = b.author;

      meta.appendChild(title);
      meta.appendChild(author);

      card.appendChild(img);
      card.appendChild(meta);

      card.addEventListener("click", () => openModal(b.id));
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openModal(b.id);
        }
      });

      booksGrid.appendChild(card);
    });
  }

  // --- Modal functions 
  function openModal(bookId) {
    if (!modal) return;
    const b = getBookById(bookId);
    if (!b) return;
    renderModal(b);
    modal.setAttribute("aria-hidden", "false");
    modalCloseBtn && modalCloseBtn.focus();
    document.addEventListener("keydown", escHandler);
  }

  function closeModal() {
    if (!modal) return;
    modal.setAttribute("aria-hidden", "true");
    modalContent && (modalContent.innerHTML = "");
    document.removeEventListener("keydown", escHandler);
  }

  function escHandler(e) {
    if (e.key === "Escape") closeModal();
  }

  function renderModal(b) {
    if (!modalContent) return;
    modalContent.innerHTML = "";

    const left = document.createElement("div");
    left.className = "modal-left";
    const cover = document.createElement("img");
    cover.className = "modal-cover";
    cover.src = b.image;
    cover.alt = `${b.title} cover`;
    left.appendChild(cover);

    const right = document.createElement("div");
    right.className = "modal-meta";

    const h2 = document.createElement("h2");
    h2.id = "modalTitle";
    h2.textContent = b.title;

    const authorP = document.createElement("p");
    authorP.className = "author";
    authorP.textContent = `By ${b.author}`;

    const genreP = document.createElement("div");
    genreP.className = "genre";
    genreP.textContent = `Genre: ${b.genre}`;

    const synopsisHeading = document.createElement("h3");
    synopsisHeading.textContent = "Synopsis";
    synopsisHeading.style.marginBottom = "6px";

    const synopsisP = document.createElement("p");
    synopsisP.textContent = b.synopsis;

    const relatedHeading = document.createElement("h3");
    relatedHeading.textContent = "Sequels & Prequels";
    relatedHeading.style.marginTop = "12px";

    const relatedUL = document.createElement("ul");
    relatedUL.className = "related-list";

    const addRelated = (ids, label) => {
      if (!ids || ids.length === 0) {
        const li = document.createElement("li");
        li.style.color = "#adb4c2";
        li.textContent = `${label}: none`;
        relatedUL.appendChild(li);
        return;
      }
      ids.forEach(id => {
        const other = getBookById(id);
        if (other) {
          const li = document.createElement("li");
          const a = document.createElement("a");
          a.href = "#";
          a.textContent = `${other.title} — ${other.author}`;
          a.addEventListener("click", (e) => {
            e.preventDefault();
            openModal(other.id);
          });
          li.appendChild(a);
          relatedUL.appendChild(li);
        }
      });
    };

    addRelated(b.prequels, "Prequels");
    addRelated(b.sequels, "Sequels");

    const reviewsHeading = document.createElement("h3");
    reviewsHeading.textContent = "Ratings & Reviews";
    reviewsHeading.style.marginTop = "12px";

    const avg = avgRating(b.reviews);
    const avgP = document.createElement("div");
    avgP.style.marginBottom = "8px";
    avgP.style.color = "#93979f";
    avgP.textContent = avg ? `Average rating: ${avg} / 5 (${b.reviews.length} review${b.reviews.length>1?"s":""})` : "No reviews yet";

    const table = document.createElement("table");
    table.className = "reviews";
    const thead = document.createElement("thead");
    const headRow = document.createElement("tr");
    ["Reviewer","Rating","Comment"].forEach(t => {
      const th = document.createElement("th");
      th.textContent = t;
      headRow.appendChild(th);
    });
    thead.appendChild(headRow);
    table.appendChild(thead);

    const tbody = document.createElement("tbody");
    if (b.reviews && b.reviews.length) {
      b.reviews.forEach(r => {
        const row = document.createElement("tr");
        const reviewerTd = document.createElement("td");
        reviewerTd.textContent = r.reviewer || "Anonymous";
        const ratingTd = document.createElement("td");
        ratingTd.textContent = r.rating != null ? r.rating : "-";
        const commentTd = document.createElement("td");
        commentTd.textContent = r.comment || "";
        row.appendChild(reviewerTd);
        row.appendChild(ratingTd);
        row.appendChild(commentTd);
        tbody.appendChild(row);
      });
    } else {
      const row = document.createElement("tr");
      const td = document.createElement("td");
      td.colSpan = 3;
      td.style.color = "#adb4c2";
      td.style.padding = "12px";
      td.textContent = "No reviews available.";
      row.appendChild(td);
      tbody.appendChild(row);
    }
    table.appendChild(tbody);

    right.appendChild(h2);
    right.appendChild(authorP);
    right.appendChild(genreP);
    right.appendChild(synopsisHeading);
    right.appendChild(synopsisP);
    right.appendChild(relatedHeading);
    right.appendChild(relatedUL);
    right.appendChild(reviewsHeading);
    right.appendChild(avgP);
    right.appendChild(table);

    const modalGrid = document.createElement("div");
    modalGrid.className = "modal-content";
    modalGrid.appendChild(left);
    modalGrid.appendChild(right);

    modalContent.appendChild(modalGrid);
  }

  // --- Event wiring
  if (genreSelect) {
    genreSelect.addEventListener("change", () => {
      renderBooks({ q: searchInput ? searchInput.value : "", genre: genreSelect.value });
    });
  }
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      renderBooks({ q: searchInput.value, genre: genreSelect ? genreSelect.value : "all" });
    });
  }
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      if (searchInput) searchInput.value = "";
      if (genreSelect) genreSelect.value = "all";
      renderBooks({ q: "", genre: "all" });
    });
  }
  if (modalCloseBtn) modalCloseBtn.addEventListener("click", closeModal);
  if (modal && modal.querySelector(".modal-backdrop")) {
    modal.querySelector(".modal-backdrop").addEventListener("click", closeModal);
  }

  // initialize
  renderGenreOptions();
  renderBooks({ q: "", genre: "all" });
})