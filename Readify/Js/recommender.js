function generateRecommendation() {
    const resultArea = document.getElementById('recommendationResult');
    const genre = document.getElementById('genreSelect').value;
    const length = document.getElementById('lengthSelect').value;

    const allBooks = JSON.parse(localStorage.getItem('books') || '[]');

    // 1. Filter logic
    let filtered = allBooks.filter(book => {
        const matchGenre = (genre === 'all' || book.genre === genre);

        let matchLength = true;
        if (length === 'short') matchLength = book.pages < 300;
        else if (length === 'medium') matchLength = book.pages >= 300 && book.pages <= 450;
        else if (length === 'long') matchLength = book.pages > 450;

        return matchGenre && matchLength;
    });

    if (filtered.length === 0) {
        resultArea.innerHTML = `<p class="error">No books found matching those criteria. Try widening your search!</p>`;
        return;
    }

    const randomBook = filtered[Math.floor(Math.random() * filtered.length)];
    renderRecommendation(randomBook);

}

function renderRecommendation(book) {
    const resultArea = document.getElementById('recommendationResult');
    resultArea.innerHTML = `
        <div class="rec-card animated-in">
            <img src="${book.image}" alt="${book.title}" class="rec-img">
            <div class="rec-info">
                <span class="genre-tag">${book.genre}</span>
                <h3>${book.title}</h3>
                <p class="author">by ${book.author}</p>
                <p class="synopsis">"${book.synopsis}"</p>
                <button class="btn-check" onclick="saveToReadingList('${book.id}')">+ Add to Reading List</button>
                <button class="btn-secondary" onclick="generateRecommendation()">↻ Pick Again</button>
            </div>
        </div>
    `;
}

function saveToReadingList(id) {
    const allBooks = JSON.parse(localStorage.getItem('books') || '[]');
    const flowLibrary = JSON.parse(localStorage.getItem('flowLibrary') || '[]');
    const bookToAdd = allBooks.find(b => b.id === id);

    if (flowLibrary.some(b => b.id === id)) {
        alert("Already in your list!");
    } else {
        flowLibrary.push({ ...bookToAdd, status: 'reading' });
        localStorage.setItem('flowLibrary', JSON.stringify(flowLibrary));
        alert("Added to My Library!");
    }
}