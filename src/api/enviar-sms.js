import twilio from "twilio";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ erro: "Método não permitido" });
  }

  const { nome, telefone } = req.body;

  if (!nome || !telefone) {
    return res.status(400).json({ erro: "Nome e telefone são obrigatórios" });
  }

  const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

  try {
    await client.messages.create({
      body: `Olá ${nome}, seu convite foi confirmado!`,
      from: process.env.TWILIO_NUMBER,
      to: `+55${telefone.replace(/\D/g, "")}`
    });

    res.status(200).json({ sucesso: true });
  } catch (err) {
    res.status(500).json({ erro: "Falha ao enviar SMS" });
  }
}
