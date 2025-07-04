import OpenAI from "openai";

export default async (req, res) => {
  const { query } = req.body;

  if (!query) {
    return res.status(400).json({ error: "Geen vraag ontvangen." });
  }

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: query }],
    });

    const answer = completion.choices[0].message.content;
    res.status(200).json({ result: answer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "OpenAI request failed" });
  }
};
