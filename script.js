function toggleMenu() {
    const nav = document.querySelector(".nav-links");

    if (nav.style.display === "flex") {
        nav.style.display = "";
    } else {
        nav.style.display = "flex";
        nav.style.flexDirection = "column";
        nav.style.position = "absolute";
        nav.style.top = "72px";
        nav.style.right = "4%";
        nav.style.background = "white";
        nav.style.padding = "20px";
        nav.style.borderRadius = "12px";
        nav.style.boxShadow = "0 10px 30px rgba(0,0,0,.1)";
    }
}


function searchTools() {

    const input = document
        .getElementById("searchInput")
        .value
        .toLowerCase();

    const cards = document.querySelectorAll(".tool-card");

    cards.forEach(card => {

        const text = card.innerText.toLowerCase();

        if (text.includes(input)) {
            card.style.display = "flex";
        } else {
            card.style.display = "none";
        }

    });
}
