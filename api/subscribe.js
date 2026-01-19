export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const data = req.body;

  const email = data.Email;
  const firstname = data["First Name"];
  const lastname = data["Last Name"];

  const response = await fetch("https://api.brevo.com/v3/contacts", {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "api-key": process.env.BREVO_API_KEY
    },
    body: JSON.stringify({
      email,
      attributes: {
        FIRSTNAME: firstname,
        LASTNAME: lastname
      },
      listIds: [12],
      updateEnabled: true
    })
  });

  const result = await response.json();
  res.status(200).json(result);
}
