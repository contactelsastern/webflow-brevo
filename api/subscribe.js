export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const data = req.body || {};

  // Webflow envoie les clés selon les "Field labels"
  const email = data["Email address"];
  const association = data["Association name"];
  const message = data["Your message"];

  if (!email) {
    return res.status(400).json({ error: "Missing email" });
  }

  // Option 1 (SAFE) : n'envoyer que l'email + la liste
  // (ça marche à tous les coups, même si tu n'as pas créé d'attributs custom dans Brevo)
  const payload = {
    email,
    updateEnabled: true
  };


  const response = await fetch("https://api.brevo.com/v3/contacts", {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "api-key": process.env.BREVO_API_KEY
    },
    body: JSON.stringify(payload)
  });

  const result = await response.json();
  return res.status(response.status).json(result);
}
