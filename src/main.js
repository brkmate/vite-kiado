let currentSortAsc = true;

const loading = async () => {
  const response = await fetch("https://retoolapi.dev/QM57sf/data");
  if (!response.ok) {
    throw new Error("Hiba történt...");
  }
  const json = await response.json();
  return json;
};

const lista = (datas) => {
  document.getElementById("adatmegjelenites").innerText = "";
  const tablazat = document.createElement("table");
  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");

  const headerNames = ["Előadó", "Munka", "Email", "Szerződés", "Módosítás", "Törlés"];

  headerNames.forEach((name, index) => {
    const th = document.createElement("th");

    if (name === "Előadó") {
      const sortButton = document.createElement("button");
      sortButton.textContent = name + " ⬍";
      sortButton.style.background = "none";
      sortButton.style.border = "none";
      sortButton.style.cursor = "pointer";
      sortButton.style.fontWeight = "bold";
      sortButton.style.fontSize = "inherit";
      sortButton.style.color = "black";
      sortButton.addEventListener("click", async () => {
        const data = await loading();
        const sorted = data.sort((a, b) => {
          const nameA = a.artist.toLowerCase();
          const nameB = b.artist.toLowerCase();
          if (nameA < nameB) return currentSortAsc ? -1 : 1;
          if (nameA > nameB) return currentSortAsc ? 1 : -1;
          return 0;
        });
        currentSortAsc = !currentSortAsc;
        lista(sorted);
      });
      th.appendChild(sortButton);
    } else {
      th.textContent = name;
    }

    headerRow.appendChild(th);
  });

  thead.appendChild(headerRow);
  tablazat.appendChild(thead);

  const tbody = document.createElement("tbody");
  datas.forEach(data => {
    const tr = document.createElement("tr");

    const tdArtist = document.createElement("td");
    tdArtist.textContent = data.artist;
    tr.appendChild(tdArtist);

    const tdWork = document.createElement("td");
    tdWork.textContent = data.work;
    tr.appendChild(tdWork);

    const tdEmail = document.createElement("td");
    tdEmail.textContent = data.email;
    tr.appendChild(tdEmail);

    const tdContract = document.createElement("td");
    tdContract.textContent = data.contract;
    tr.appendChild(tdContract);

    const tdEdit = document.createElement("td");
    const editButton = document.createElement("button");
    editButton.textContent = "Módosítás";

    editButton.addEventListener("click", async () => {
      const newArtist = prompt("Új előadó:", data.artist);
      const newWork = prompt("Új munka:", data.work);
      const newEmail = prompt("Új email:", data.email);
      const newContract = prompt("Új szerződés szám:", data.contract);

      if (newWork && newEmail && newArtist && newContract) {
        try {
          const response = await fetch("https://retoolapi.dev/QM57sf/data/" + data.id, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              artist: newArtist,
              work: newWork,
              email: newEmail,
              contract: newContract
            })
          });

          if (!response.ok) {
            throw new Error("Hiba történt a módosításkor...");
          }

          await response.json();
          const updatedData = await loading();
          lista(updatedData);
        } catch (error) {
          alert(error.message);
        }
      }
    });

    tdEdit.appendChild(editButton);
    tr.appendChild(tdEdit);

    const tdDelete = document.createElement("td");
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Törlés";
    deleteButton.style.backgroundColor = "#b33";
    deleteButton.style.marginLeft = "5px";

    deleteButton.addEventListener("click", async () => {
      if (confirm(`Biztosan törölni szeretnéd az előadót: ${data.artist}?`)) {
        try {
          const response = await fetch("https://retoolapi.dev/QM57sf/data/" + data.id, {
            method: 'DELETE'
          });

          if (!response.ok) {
            throw new Error("Hiba történt a törléskor...");
          }

          const updatedData = await loading();
          lista(updatedData);
        } catch (error) {
          alert(error.message);
        }
      }
    });

    tdDelete.appendChild(deleteButton);
    tr.appendChild(tdDelete);

    tbody.appendChild(tr);
  });

  tablazat.appendChild(tbody);
  document.getElementById("adatmegjelenites").append(tablazat);
};

document.addEventListener("DOMContentLoaded", async () => {
  lista(await loading());

  const addBtn = document.getElementById("addArtistBtn");
  if (addBtn) {
    addBtn.addEventListener("click", async () => {
      const artist = prompt("Előadó neve:");
      const work = prompt("Munka megnevezése:");
      const email = prompt("Email:");
      const contract = prompt("Szerződés szám:");

      if (artist && work && email && contract) {
        try {
          const response = await fetch("https://retoolapi.dev/QM57sf/data", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ artist, work, email, contract }),
          });

          if (!response.ok) throw new Error("Hiba történt az előadó felvételekor.");

          const updatedData = await loading();
          lista(updatedData);
        } catch (error) {
          alert(error.message);
        }
      } else {
        alert("Kérlek, tölts ki minden mezőt!");
      }
    });
  }
});
