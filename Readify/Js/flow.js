function toggleSound(id, element) {
    const audio = document.getElementById(id + 'Audio');
    const allAudios = document.querySelectorAll('audio');
    const allTracks = document.querySelectorAll('.lofi-track');

    if (!audio.paused) {
        audio.pause();
        element.classList.remove('active');
    } else {
        // Stop all other tracks and reset visuals
        allAudios.forEach(a => {
            a.pause();
            a.currentTime = 0;
        });
        allTracks.forEach(t => t.classList.remove('active'));

        // Play selected and light up the card
        audio.play();
        element.classList.add('active');
    }
}

// LIBRARY LOGIC
function addBookToFlow() {
    const input = document.getElementById('bookInput');
    const title = input.value.trim();
    const globalBooks = JSON.parse(localStorage.getItem("books") || "[]");

    const bookData = globalBooks.find(b => b.title.toLowerCase() === title.toLowerCase());

    if (bookData) {
        const flowLibrary = JSON.parse(localStorage.getItem('flowLibrary') || '[]');

        // Prevent duplicates
        if (flowLibrary.some(b => b.id === bookData.id)) return alert("Already in your list!");

        // Add with default status 'reading'
        const newEntry = { ...bookData, status: 'reading' };
        flowLibrary.push(newEntry);

        localStorage.setItem('flowLibrary', JSON.stringify(flowLibrary));
        input.value = '';
        loadFlowLibrary();
    }
}

function markAsCompleted(id) {
    let library = JSON.parse(localStorage.getItem('flowLibrary') || '[]');
    library = library.map(book => {
        if (book.id === id) book.status = 'completed';
        return book;
    });
    localStorage.setItem('flowLibrary', JSON.stringify(library));
    loadFlowLibrary();
}

function removeBook(id) {
    let library = JSON.parse(localStorage.getItem('flowLibrary') || '[]');
    library = library.filter(book => book.id !== id);
    localStorage.setItem('flowLibrary', JSON.stringify(library));
    loadFlowLibrary();
}

function loadFlowLibrary() {
    const grid = document.getElementById('flowLibraryGrid');
    const library = JSON.parse(localStorage.getItem('flowLibrary') || '[]');

    // Update Counts
    const readingBooks = library.filter(b => b.status === 'reading').length;
    const completedBooks = library.filter(b => b.status === 'completed').length;

    document.getElementById('readingCount').textContent = readingBooks;
    document.getElementById('completedCount').textContent = completedBooks;

    // Render Cards
    grid.innerHTML = library.map((book) => `
        <div class="book-card ${book.status === 'completed' ? 'completed-card' : ''}">
            <img src="${book.image}" class="card-thumb">
            <div class="card-content">
                <h4>${book.title}</h4>
                <p>by ${book.author}</p>
                ${book.status === 'reading' ?
            `<button class="btn-check" onclick="markAsCompleted('${book.id}')">Mark Completed</button>` :
            `<span class="done-badge">Completed</span>`}
            </div>
            <button class="delete-book" onclick="removeBook('${book.id}')">×</button>
        </div>
    `).join('');
}

//bookSuggestions
document.addEventListener("DOMContentLoaded", () => {

    const globalBooks = JSON.parse(localStorage.getItem("books") || "[]");
    const datalist = document.getElementById('bookSuggestions');
    globalBooks.forEach(b => {
        let opt = document.createElement('option');
        opt.value = b.title;
        datalist.appendChild(opt);
    });

    loadFlowLibrary();


});

