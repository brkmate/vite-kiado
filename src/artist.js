const apiURL = "https://retoolapi.dev/QM57sf/data";

async function loadArtists() {
    try {
        const response = await fetch(apiURL);
        if (!response.ok) throw new Error("Hiba történt az adatok betöltésekor...");

        const data = await response.json();
        const artistCards = document.getElementById("artistCards");

        const uniqueArtists = {};
        data.forEach(item => {
            if (!uniqueArtists[item.artist]) {
                uniqueArtists[item.artist] = item.work;
            }
        });

        for (const [artist, work] of Object.entries(uniqueArtists)) {
            const card = document.createElement("div");
            card.classList.add("artist-card");

            card.innerHTML = `
                <h3>${artist}</h3>
                <p><strong>Alkotási köre</p>
                <p>${work}</p>
            `;

            artistCards.appendChild(card);
        }
    } catch (error) {
        console.error(error);
        alert("Hiba történt az adatok betöltésekor.");
    }
}

document.addEventListener("DOMContentLoaded", loadArtists);
