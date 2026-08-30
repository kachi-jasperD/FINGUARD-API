const openai = require("../config/openai");

const generateAnalysis = async (financialContext) => {
  try {
    const response = await openai.responses.create({
      model: "gpt-5",

      input: [
        {
          role: "system",
          content:
            "You are a financial analysis assistant. Analyze the user's financial situation and return ONLY valid JSON.",
        },
        {
          role: "user",
          content: `
Analyze the following financial information:

${JSON.stringify(financialContext, null, 2)}

Determine the user's financial risk level.

Risk levels:
- low: generally healthy financial position
- medium: some financial concerns that should be monitored
- high: significant financial pressure requiring attention

Return ONLY valid JSON using exactly this structure:

{
  "riskLevel": "low",
  "summary": "Brief explanation of the user's overall financial situation.",
  "keyDrivers": [
    {
      "title": "Short title",
      "explanation": "Explain why this is an important factor.",
      "severity": "low"
    }
  ],
  "recommendations": [
    {
      "title": "Practical recommendation",
      "reason": "Explain why this recommendation would help.",
      "priority": "low"
    }
  ]
}

Requirements:
- riskLevel must be exactly "low", "medium", or "high".
- Provide 2-4 keyDrivers.
- Provide 2-4 recommendations.
- severity must be "low", "medium", or "high".
- priority must be "low", "medium", or "high".
- Base the analysis only on the provided financial information.
- Do not invent financial information.
- Do not include markdown.
- Do not include code fences.
- Return JSON only.
`,
        },
      ],
    });

    console.log("OPENAI RAW RESPONSE:", response);

    const text = response.output_text;

    console.log("OPENAI OUTPUT TEXT:", text);

    if (!text || !text.trim()) {
      throw new Error("OpenAI returned an empty response");
    }

    let result;

    try {
      result = JSON.parse(text);
    } catch (parseError) {
      console.error("AI JSON PARSE ERROR:", parseError);
      console.error("AI RESPONSE TEXT:", text);

      throw new Error("AI returned invalid JSON");
    }

    // Validate risk level
    if (!["low", "medium", "high"].includes(result.riskLevel)) {
      throw new Error("AI returned an invalid risk level");
    }

    // Validate summary
    if (
      typeof result.summary !== "string" ||
      result.summary.trim().length === 0
    ) {
      throw new Error("AI did not return a valid summary");
    }

    // Validate key drivers
    if (!Array.isArray(result.keyDrivers)) {
      throw new Error("AI did not return key drivers");
    }

    // Validate recommendations
    if (!Array.isArray(result.recommendations)) {
      throw new Error("AI did not return recommendations");
    }

    // Validate key driver fields
    for (const driver of result.keyDrivers) {
      if (
        !driver.title ||
        !driver.explanation ||
        !["low", "medium", "high"].includes(driver.severity)
      ) {
        throw new Error("AI returned invalid key driver data");
      }
    }

    // Validate recommendation fields
    for (const recommendation of result.recommendations) {
      if (
        !recommendation.title ||
        !recommendation.reason ||
        !["low", "medium", "high"].includes(recommendation.priority)
      ) {
        throw new Error("AI returned invalid recommendation data");
      }
    }

    return result;
  } catch (error) {
    console.error("ANALYSIS SERVICE ERROR:", error);
    throw error;
  }
};

module.exports = {
  generateAnalysis,
};
