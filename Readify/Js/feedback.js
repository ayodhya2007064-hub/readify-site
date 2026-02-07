document.addEventListener("DOMContentLoaded", () => {
    const feedbackForm = document.getElementById("feedbackForm");
    const confirmation = document.getElementById("confirmation");
    const accordionHeaders = document.querySelectorAll(".accordion-header");

    // FAQ Accordion Logic
    accordionHeaders.forEach(header => {
        header.addEventListener("click", () => {
            const item = header.parentElement;
            
            // Close other open items 
            document.querySelectorAll(".accordion-item").forEach(i => {
                if (i !== item) i.classList.remove("active");
            });

            // Toggle current item
            item.classList.toggle("active");
        });
    });

    // Form Submission and Validation
    feedbackForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const feedbackData = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            message: document.getElementById("message").value,
            date: new Date().toLocaleString()
        };

        // Store in localStorage
        const existingFeedback = JSON.parse(localStorage.getItem("userFeedback") || "[]");
        existingFeedback.push(feedbackData);
        localStorage.setItem("userFeedback", JSON.stringify(existingFeedback));

        // Show confirmation and reset form
        feedbackForm.classList.add("hidden");
        confirmation.classList.remove("hidden");

        setTimeout(() => {
            feedbackForm.reset();
            feedbackForm.classList.remove("hidden");
            confirmation.classList.add("hidden");
        }, 3000);
    });
});