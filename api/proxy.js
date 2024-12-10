import fetch from "node-fetch";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*"); // Autorise toutes les origines
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS"); // Méthodes autorisées
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(200).end(); // Répond aux requêtes préliminaires (préflight)
    return;
  }

  try {
    const response = await fetch("https://rustoria.co/twitch/api/teams/krolay");
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Erreur avec le serveur proxy :", error);
    res.status(500).json({ error: "Erreur avec le serveur proxy" });
  }
}
