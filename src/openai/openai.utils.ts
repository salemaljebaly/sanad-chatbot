import { FunctionCall } from '@google/generative-ai';
import { Logger } from '@nestjs/common';

const logger = new Logger('OpenAIUtils');

export function formatUserContext(
  userContext: { role: string; content: string }[],
) {
  logger.log('Formatting user context for chat history.');

  return userContext
    .filter((msg) => msg.content?.trim())
    .map((msg) => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }],
    }));
}

export function extractFunctionCall(response: any) {
  logger.log('Extracting function call from AI response.');

  if (response.functionCalls?.length) {
    logger.log(`Function call detected: ${response.functionCalls[0].name}`);
    return response.functionCalls[0];
  }

  if (response.candidates?.length) {
    const candidate = response.candidates[0];
    const functionCall = candidate?.content?.parts?.[0]?.functionCall || null;

    if (functionCall) {
      logger.log(`Function call detected in candidates: ${functionCall.name}`);
    } else {
      logger.warn('No function call found in candidates.');
    }

    return functionCall;
  }

  logger.warn('No function call found in response.');
  return null;
}
