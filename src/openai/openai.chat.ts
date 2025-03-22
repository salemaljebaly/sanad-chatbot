import { GoogleGenerativeAI } from '@google/generative-ai';
import { systemPrompt } from './system-prompt';
import { functionDeclarations } from './function-declarations';

export function initiateChat(genAI: GoogleGenerativeAI, userContext: any) {
  const formattedHistory = userContext
    .filter((msg) => msg.content?.trim())
    .map((msg) => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }],
    }));

  const model = genAI.getGenerativeModel({
    model: 'gemini-2.0-flash-lite',
    systemInstruction: systemPrompt,
    tools: [{ functionDeclarations }],
  });

  return model.startChat({
    history: formattedHistory,
    generationConfig: { temperature: 0.7, maxOutputTokens: 800 },
  });
}
