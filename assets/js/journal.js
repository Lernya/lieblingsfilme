//SUCHLEISTE

// Referenzen zu den Elementen im Formular und Dialog
const searchForm = document.getElementById("searchForm");
const searchModal = document.getElementById("searchModal");
const closeModal = document.getElementById("closeModal");
const searchResults = document.getElementById("searchResults");

// Event-Listener für die Formularübermittlung
searchForm.addEventListener("submit", function (event) {
  event.preventDefault(); // Verhindert die Standardaktion des Formulars (Seitenneu laden)
  const query = document.getElementById("searchInput").value; // Holt den eingegebenen Suchbegriff

  // Dummy-Suchergebnis oder Feedback
  searchResults.textContent = `You searched for: "${query}"`; // Zeigt den Suchbegriff im Modal an

  // Zeigt den modalen Dialog an
  searchModal.classList.remove("hidden");
});

// Event-Listener zum Schließen des modalen Dialogs
closeModal.addEventListener("click", function () {
  searchModal.classList.add("hidden"); // Versteckt den modalen Dialog
});
