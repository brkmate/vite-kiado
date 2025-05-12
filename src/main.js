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


  const headerNames = ["Előadó", "Munka", "Email", "Szerződés", "Módosítás"];

  headerNames.forEach(name => {
    const th = document.createElement("th");
    th.textContent = name;
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

    tbody.appendChild(tr);
  });

  tablazat.appendChild(tbody);
  document.getElementById("adatmegjelenites").append(tablazat);
};

document.addEventListener("DOMContentLoaded", async () => {
  document.getElementById("adatmegjelenites").innerText = "";
  lista(await loading());
});
