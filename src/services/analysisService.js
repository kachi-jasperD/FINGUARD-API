const openai = require("../config/openAI");

const generateAnalysis = async (financialContext) => {
  const prompt = `
Analyze this user's financial situation.

Rules:
- Do not invent facts.
- Use only supplied information.
- Explain risk level.
- Provide practical recommendations.
- Return JSON only.

Financial Data:
${JSON.stringify(financialContext)}
`;

  const response = await openai.responses.create({
    model: "gpt-5",
    input: prompt,
  });

  return response.output_text;
};

module.exports = {
  generateAnalysis,
};
