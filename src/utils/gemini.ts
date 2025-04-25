export const callGemini = async (userPrompt: string): Promise<string> => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY!;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: userPrompt }],
            },
          ],
        }),
      }
    );

    const data = await response.json();
    console.log("Gemini response:", data);

    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;
    return reply || "Sorry, I couldn't generate a response.";
  } catch (error) {
    console.error("Gemini API error:", error);
    return "Oops! Something went wrong while connecting to Gemini.";
  }
};



