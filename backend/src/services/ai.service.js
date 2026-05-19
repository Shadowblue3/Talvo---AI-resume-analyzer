const { GoogleGenAI } = require("@google/genai");
const { GEMMA_API_KEY } = require("../config/config");
const z = require('zod');
const { zodToJsonSchema } = require('zod-to-json-schema');

const ai = new GoogleGenAI({
    apiKey: GEMMA_API_KEY
});

// 1. Define the Schema cleanly
const interviewReportSchema = z.object({
    matchScore: z.number().describe("A score between 0 and 100."),
    technicalQuestions: z.array(z.object({
        question: z.string().describe("The actual technical interview question to ask."),
        intention: z.string().describe("Why the interviewer is asking this."),
        answer: z.string().describe("How the candidate should answer this.")
    })),
    behavioralQuestions: z.array(z.object({
        question: z.string().describe("The actual behavioral interview question to ask."),
        intention: z.string().describe("Why the interviewer is asking this."),
        answer: z.string().describe("How the candidate should answer this.")
    })),
    skillGaps: z.array(z.object({
        skill: z.string().describe("The specific skill the candidate is missing."),
        severity: z.enum(["low", "medium", "high"])
    })),
    preparationPlan: z.array(z.object({
        day: z.number(),
        focus: z.string(),
        tasks: z.array(z.string()).describe("Specific tasks to complete.")
    })),
    title: z.string().describe("The title of the job for which the interview report is generated according to the job description")
});

async function generateInterviewReport({ resume, selfDescription, jobDescription }) {

    // 2. Clear, English-only prompt. No JSON brackets to confuse the AI.
   const prompt = `You are an expert Technical Interviewer and Hiring Manager. 
Your task is to thoroughly analyze the candidate's profile against the job description.

--- TARGET JOB DESCRIPTION ---
${jobDescription}

--- CANDIDATE RESUME ---
${resume}

--- CANDIDATE SELF-DESCRIPTION ---
${selfDescription}

INSTRUCTIONS FOR DATA GENERATION:
You must output ONLY valid JSON. Your output must strictly match the following JSON structure. 
Do not use placeholder words. Fill in the arrays with highly-detailed, REAL content tailored to the candidate's actual tech stack. Generate 4 technical questions, 2 behavioral questions, and a 3-day prep plan.

REQUIRED EXACT JSON STRUCTURE:
{
  "matchScore": 85,
  "technicalQuestions": [
    {
      "question": "Write the actual technical interview question here...",
      "intention": "Explain why you are asking this specific question...",
      "answer": "Describe the ideal technical answer you expect from the candidate..."
    }
  ],
  "behavioralQuestions": [
    {
      "question": "Write the behavioral interview question here...",
      "intention": "Explain the soft skill or cultural fit being tested...",
      "answer": "Describe a good STAR method response you want to hear..."
    }
  ],
  "skillGaps": [
    {
      "skill": "Name of the missing skill (e.g., Docker, Unit Testing)",
      "severity": "low" // MUST be exactly "low", "medium", or "high"
    }
  ],
  "preparationPlan": [
    {
      "day": 1,
      "focus": "Overall study focus for this day...",
      "tasks": [
        "Specific actionable task 1...",
        "Specific actionable task 2..."
      ]
    }
  ],
  "title": The title of the job for which the interview report is generated according to the job description
}`;

    try {
        // 3. Clean the Zod schema for Google's API
        const rawJsonSchema = zodToJsonSchema(interviewReportSchema);
        delete rawJsonSchema.$schema; // Remove metadata that sometimes breaks the Google API

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
            }
        });

        // Parse the raw text
        const rawText = response.text;

        const rawData = JSON.parse(rawText);
        
        // Validate with Zod
        const validatedData = interviewReportSchema.parse(rawData);
        
        console.log("\n--- ZOD VALIDATED DATA ---");
        console.log(validatedData);
        return validatedData;

    } catch (error) {
        console.error("Error generating report:", error);
    }
}

module.exports = generateInterviewReport;