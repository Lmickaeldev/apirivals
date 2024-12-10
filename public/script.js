let membersData = []; // Variable pour stocker les membres récupérés

async function fetchData() {
  try {
    const response = await fetch("http://localhost:3000/proxy");
    if (!response.ok) {
      throw new Error(`Erreur HTTP : ${response.status}`);
    }

    const data = await response.json();
    console.log("Données reçues :", data);

    if (Array.isArray(data.members)) {
      // Vérifie si les nouvelles données diffèrent des données actuelles
      if (JSON.stringify(data.members) !== JSON.stringify(membersData)) {
        membersData = data.members; // Met à jour les données globales
        localStorage.setItem("membersData", JSON.stringify(membersData)); // Sauvegarde dans localStorage
        updateTable(membersData); // Met à jour l'affichage
      }
    } else {
      console.error("Les membres ne sont pas un tableau :", data.members);
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des données :", error);
  }
}

// Fonction pour mettre à jour le tableau
function updateTablefranklin(members) {
  const container = document.getElementById("data-container-franklin");
  container.innerHTML = ""; // Vide le tableau avant de le remplir

  // Trouver le membre dont le nom est "jlfranklin_"
  const member = members.find((m) => m.name === "jlfranklin_");

  if (member) {
    // Ajoute les données du membre
    // addStatRow(container, "Nom", member.name);
    addStatRow(container, "Kills", member.kills);
    addStatRow(container, "Deaths", member.deaths);
    addStatRow(container, "KDR", member.kdr);
    addStatRow(container, "Headshots", member.headshots);
    addStatRow(container, "Accuracy", member.accuracy + " %");
    addStatRow(container, "NPC Kills", member.npcKills);
  } else {
    // Si le membre n'est pas trouvé, afficher un message
    const row = document.createElement("tr");
    row.innerHTML = "<td colspan='2'>Membre non trouvé</td>";
    container.appendChild(row);
  }
}
function updateTablekrolay(members) {
  const container = document.getElementById("data-container-krolay");
  container.innerHTML = "<tr><p>stats<p></tr>";

  // Trouver le membre dont le nom est "jlfranklin_"
  const member = members.find((m) => m.name === "krolay");

  if (member) {
    // Ajoute les données du membre
    // addStatRow(container, "Nom", member.name);
    addStatRow(container, "Kills", member.kills);
    addStatRow(container, "Deaths", member.deaths);
    addStatRow(container, "KDR", member.kdr);
    addStatRow(container, "Headshots", member.headshots);
    addStatRow(container, "Accuracy", member.accuracy + " %");
    addStatRow(container, "NPC Kills", member.npcKills);
  } else {
    // Si le membre n'est pas trouvé, afficher un message
    const row = document.createElement("tr");
    row.innerHTML = "<td colspan='2'>Membre non trouvé</td>";
    container.appendChild(row);
  }
}


// Fonction pour ajouter une ligne de statistique dans le tableau
function addStatRow(container, type, value) {
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${type}</td>
    <td>${value}</td>
  `;
  container.appendChild(row);
}

// Charger les données depuis localStorage au chargement de la page
document.addEventListener("DOMContentLoaded", () => {
  const storedData = localStorage.getItem("membersData");
  if (storedData) {
    membersData = JSON.parse(storedData); // Récupère les données du localStorage
    updateTablefranklin(membersData);
    updateTablekrolay(membersData);
     // Met à jour le tableau avec les données sauvegardées
  }

  // Lancer la récupération des données depuis l'API
  fetchData();
});

// Actualiser les données toutes les 30 secondes
setInterval(fetchData, 30000); // 30000 ms = 30 secondes
