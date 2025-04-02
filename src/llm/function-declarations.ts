
import { SchemaType, FunctionDeclaration } from '@google/generative-ai';

export const functionDeclarations: FunctionDeclaration[] = [
  {
    name: 'searchFlightOffers',
    description: 'Search for flight offers based on origin, destination, and dates',
    parameters: {
      type: SchemaType.OBJECT,
      properties: {
        originLocationCode: {
          type: SchemaType.STRING,
          description: "Origin location IATA code (e.g., 'SYD' for Sydney)",
        },
        destinationLocationCode: {
          type: SchemaType.STRING,
          description: "Destination location IATA code (e.g., 'BKK' for Bangkok)",
        },
        departureDate: {
          type: SchemaType.STRING,
          description: 'Departure date in YYYY-MM-DD format',
        },
        adults: {
          type: SchemaType.NUMBER,
          description: 'Number of adult passengers',
        },
        max: {
          type: SchemaType.NUMBER,
          description: 'Maximum number of offers to return (optional)',
        },
        returnDate: {
          type: SchemaType.STRING,
          description: 'Return date in YYYY-MM-DD format (optional for round trips)',
        },
        travelClass: {
          type: SchemaType.STRING,
          description: 'Travel class: ECONOMY, PREMIUM_ECONOMY, BUSINESS, or FIRST',
          format: 'enum',
          enum: ['ECONOMY', 'PREMIUM_ECONOMY', 'BUSINESS', 'FIRST']
        }
      },
      required: ['originLocationCode', 'destinationLocationCode', 'departureDate', 'adults']
    }
  },
  {
    name: 'createCheckoutSession',
    description: 'Generate a payment link for booking services',
    parameters: {
      type: SchemaType.OBJECT,
      properties: {
        items: {
          type: SchemaType.ARRAY,
          description: 'List of items to be purchased',
          items: {
            type: SchemaType.OBJECT,
            properties: {
              name: {
                type: SchemaType.STRING,
                description: 'Name of the item'
              },
              description: {
                type: SchemaType.STRING,
                description: 'Description of the item'
              },
              price: {
                type: SchemaType.NUMBER,
                description: 'Price of the item'
              },
              quantity: {
                type: SchemaType.NUMBER,
                description: 'Quantity of the item'
              }
            },
            required: ['name', 'description', 'price']
          }
        },
        currency: {
          type: SchemaType.STRING,
          description: 'Currency code (e.g., USD, EUR)',
        },
        serviceType: {
          type: SchemaType.STRING,
          description: 'Type of service being purchased',
          format: 'enum',
          enum: ['flight', 'hotel', 'eSIM']
        }
      },
      required: ['items', 'currency', 'serviceType']
    }
  }
];