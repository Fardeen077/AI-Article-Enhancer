import axios from "axios";

export const generateWithAI = async (prompt) => {
  try {
    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent",
      {
        contents: [
          {
            parts: [{ text: prompt }]
          }
        ]
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": process.env.GEMINI_API_KEY
        }
      }
    );

    return response.data.candidates[0].content.parts[0].text;

  } catch (error) {
    console.error(
      "Gemini Error:",
      error.response?.data || error.message
    );
    throw new Error("AI generation failed");
  }
};
