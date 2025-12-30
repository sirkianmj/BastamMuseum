import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `You are the Head Curator of the Chronos Digital Museum. 
Your tone is sophisticated, educational, yet accessible and slightly mysterious.
When describing an object, use evocative language. If the object is generic or unknown, invent a plausible, fascinating history for it based on its name or type.
Keep descriptions concise (under 80 words) but impactful.`;

export const generateArtifactDescription = async (fileName: string): Promise<string> => {
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate a museum placard description for an artifact with the filename: "${fileName}". Create a fictional but grounded historical context for it.`,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      }
    });
    return response.text || "History unknown.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "The archives are currently silent about this artifact.";
  }
};

export const askCurator = async (question: string, context: string): Promise<string> => {
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Context: The user is looking at an artifact described as: "${context}".
      User Question: "${question}"
      Answer as the Curator.`,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      }
    });
    return response.text || "I cannot answer that at this moment.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Pardon me, I was distracted by a restoration project. Could you repeat that?";
  }
};