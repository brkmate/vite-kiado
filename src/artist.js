const apiURL = "https://retoolapi.dev/QM57sf/data";

async function loadArtists() {
    try {
        const response = await fetch(apiURL);
        if (!response.ok) throw new Error("Hiba történt az adatok betöltésekor...");

        const data = await response.json();

        populateWorkSelect(data);
        displayArtists(data);

        const workSelect = document.getElementById("workSelect");
        if (workSelect) {
            workSelect.addEventListener("change", () => {
                const selectedWork = workSelect.value;
                const filteredData = selectedWork
                    ? data.filter(item => item.work === selectedWork)
                    : data;

                displayArtists(filteredData);
            });
        }

    } catch (error) {
        console.error(error);
        alert("Hiba történt az adatok betöltésekor.");
    }
}


function displayArtists(artistsData) {
    const artistCards = document.getElementById("artistCards");
    artistCards.innerHTML = "";

    const uniqueArtists = {};
    artistsData.forEach(item => {
        if (!uniqueArtists[item.artist]) {
            uniqueArtists[item.artist] = item.work;
        }
    });

    for (const [artist, work] of Object.entries(uniqueArtists)) {
        const card = document.createElement("div");
        card.classList.add("artist-card");

        card.innerHTML = `
            <h3>${artist}</h3>
            <p><strong>Alkotási köre:</strong></p>
            <p>${work}</p>
        `;

        artistCards.appendChild(card);
    }
}


function populateWorkSelect(data) {
    const workSelect = document.getElementById("workSelect");
    if (!workSelect) return;

    const works = [...new Set(data.map(item => item.work))];

    works.forEach(work => {
        const option = document.createElement("option");
        option.value = work;
        option.textContent = work;
        workSelect.appendChild(option);
    });
}

document.addEventListener("DOMContentLoaded", loadArtists);
