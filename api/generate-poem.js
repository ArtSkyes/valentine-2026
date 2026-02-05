import { GoogleGenAI, Type } from "@google/genai";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.warn("API_KEY not found in environment variables");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

const generateLovePoem = async (name) => {
  const client = getClient();
  if (!client) return "Roses are red, violets are blue, I need an API key to write a poem for you!";

  try {
    const response = await client.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Write a short, cute, funny, and rhyming Valentine's Day poem for a girl named ${name}. Include capybaras in the poem. Keep it under 6 lines.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: { poem: { type: Type.STRING } },
          required: ["poem"]
        }
      }
    });

    const json = JSON.parse(response.text || "{}");
    return json.poem || "A capybara sits in the sun, hoping you're the only one!";
  } catch (error) {
    console.error("Error generating poem:", error);
    return "Roses are red, capybaras are chill, being your valentine is my biggest thrill!";
  }
};

export default async function handler(req, res) {
  const name = req.method === "POST" ? req.body?.name : req.query?.name || "dear";
  const poem = await generateLovePoem(name);
  res.setHeader("Content-Type", "application/json");
  res.status(200).json({ poem });
}