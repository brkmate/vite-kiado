const apiURL = "https://retoolapi.dev/QM57sf/data";

async function loadArtists() {
    try {
        const response = await fetch(apiURL);
        if (!response.ok) throw new Error("Hiba történt az adatok betöltésekor...");

        const data = await response.json();
        const artistList = document.getElementById("artistList");

        const uniqueArtists = {};
        data.forEach(item => {
            if (!uniqueArtists[item.artist]) {
                uniqueArtists[item.artist] = item.work;
            }
        });

        for (const [artist, work] of Object.entries(uniqueArtists)) {
            const li = document.createElement("li");
            li.innerHTML = `<strong>${artist}</strong> - ${work}`;
            artistList.appendChild(li);
        }
    } catch (error) {
        console.error(error);
        alert("Hiba történt az adatok betöltésekor.");
    }
}

document.addEventListener("DOMContentLoaded", loadArtists);
