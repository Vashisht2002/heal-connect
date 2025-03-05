document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get("q").toLowerCase();
    const searchResultsContainer = document.getElementById("searchResults");

    fetch("data.json")
        .then(response => response.json())
        .then(data => {
            const results = data.filter(doctor =>
                doctor.name.toLowerCase().includes(query) ||
                doctor.specialization.toLowerCase().includes(query)
            );

            if (results.length === 0) {
                searchResultsContainer.innerHTML = "<p class='text-center'>No results found.</p>";
            } else {
                searchResultsContainer.innerHTML = results.map(doctor => `
                    <div class="doctor-card">
                        <img src="${doctor.image}" alt="${doctor.name}">
                        <h3>${doctor.name}</h3>
                        <p><strong>Specialization:</strong> ${doctor.specialization}</p>
                        <p><strong>Experience:</strong> ${doctor.experience} years</p>
                        <p><strong>Contact:</strong> ${doctor.contact}</p>
                        <a href="tel:${doctor.contact}" class="contact-btn">Call Now</a>
                    </div>
                `).join("");
            }
        })
        .catch(error => console.error("Error fetching data:", error));
});
