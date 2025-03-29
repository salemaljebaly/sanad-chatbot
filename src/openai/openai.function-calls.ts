import { AmadeusService } from 'src/amadeus/amadeus.service';
import { Logger } from '@nestjs/common';
import { extractFunctionCall } from './openai.utils';
import { FunctionCall } from '@google/generative-ai';
import { PaymentService } from 'src/payment/payment.service';

export async function processFunctionCall(
  chat: any,
  response: any,
  amadeus: AmadeusService,
  stripeService: PaymentService,
  logger: Logger,
): Promise<string> {
  const functionCall = extractFunctionCall(response);

  if (!functionCall) {
    return response.text?.() || 'No response available.';
  }

  logger.log(`Function call detected: ${functionCall.name}`);

  if (functionCall.name === 'searchFlightOffers') {
    return await handleFlightSearch(chat, functionCall, amadeus, logger);
  }

  if (functionCall.name === 'createCheckoutSession') {
    return await handlePaymentLink(chat, functionCall, stripeService, logger);
  }

  return "I'm sorry, I don't recognize this function call.";
}

async function handleFlightSearch(
  chat: any,
  functionCall: FunctionCall,
  amadeus: AmadeusService,
  logger: Logger,
): Promise<string> {
  try {
    const args =
      typeof functionCall.args === 'string'
        ? JSON.parse(functionCall.args)
        : functionCall.args;

    logger.log(`Flight search args: ${JSON.stringify(args)}`);

    const flightResults = await amadeus.searchFlightOffers({
      originLocationCode: args.originLocationCode,
      destinationLocationCode: args.destinationLocationCode,
      departureDate: args.departureDate,
      adults: args.adults || 1,
      max: args.max,
      returnDate: args.returnDate,
      travelClass: args.travelClass,
    });

    const functionResponse = await chat.sendMessage([
      {
        text: JSON.stringify({
          name: functionCall.name,
          content: flightResults,
        }),
      },
    ]);

    return (
      functionResponse.response?.text?.() ||
      "I couldn't retrieve flight information. Please try again."
    );
  } catch (error) {
    logger.error('Error during flight search function call', error);
    return 'I encountered an error while searching for flights. Please try again.';
  }
}

async function handlePaymentLink(
  chat: any,
  functionCall: FunctionCall,
  stripeService: PaymentService,
  logger: Logger,
): Promise<string> {
  try {
    const args =
      typeof functionCall.args === 'string'
        ? JSON.parse(functionCall.args)
        : functionCall.args;
    logger.log(`Payment link args: ${JSON.stringify(args)}`);

    // Create a checkout session for multiple items
    const session = await stripeService.createCheckoutSession(
      {
        items: args.items, // Pass the items array
        currency: args.currency, // Currency for payment
        serviceType: args.serviceType, // Type of service (e.g., flight, hotel)
      },
      'https://yourdomain.com/success', // Update success URL
      'https://yourdomain.com/cancel', // Update cancel URL
    );

    const functionResponse = await chat.sendMessage([
      {
        text: JSON.stringify({
          name: functionCall.name,
          content: { paymentLink: session.url },
        }),
      },
    ]);

    return (
      functionResponse.response?.text?.() ||
      "I couldn't retrieve flight information. Please try again."
    );
  } catch (error) {
    logger.error('Error generating payment link', error);
    return 'I encountered an error while generating the payment link. Please try again.';
  }
}
