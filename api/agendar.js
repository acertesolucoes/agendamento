export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { consultor, cliente, data, hora, local } = req.body;

    const scriptUrl = "https://script.google.com/macros/s/AKfycbwuQt8Xog6e3t75rs5jOd2yzXvi-B3XPN3e986KsKvRhKVdEpR7aCqKt4S2qQzfE31C/exec";

    const response = await fetch(scriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ consultor, cliente, data, hora, local }),
    });

    const result = await response.json();

    return res.status(200).json(result);
  } catch (error) {
    console.error("Erro no proxy:", error);
    return res.status(500).json({ status: "erro", message: "Erro ao processar a requisição." });
  }
}
