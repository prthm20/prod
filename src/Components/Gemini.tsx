import { GoogleGenerativeAI } from "@google/generative-ai";


export async function Info(context: string) {
  
  
  const apiKey = `${process.env.NEXT_PUBLIC_GEMENI}`;
  if (!apiKey) {
    throw new Error("GEMINI is not defined");
  }

  const genAI = new GoogleGenerativeAI(apiKey);

  // Choose a model that's appropriate for your use case.
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-pro",
      
    }
  );

  const prompt = `provide summary of planetary positions and rashi positions according to all 12 houses:
  ${context}

`;

  const result = await model.generateContent(prompt);
  const response = result.response;
  const text =  response.text(); // Await the text() method since it returns a promise
  
  return text;
}
