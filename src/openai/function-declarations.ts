import { SchemaType, FunctionDeclaration } from '@google/generative-ai';

export const functionDeclarations: FunctionDeclaration[] = [
  {
    name: 'searchFlightOffers',
    description:
      'Search for flight offers based on origin, destination, and dates',
    parameters: {
      type: SchemaType.OBJECT,
      properties: {
        originLocationCode: {
          type: SchemaType.STRING,
          description: "Origin location IATA code (e.g., 'SYD' for Sydney)",
        },
        destinationLocationCode: {
          type: SchemaType.STRING,
          description:
            "Destination location IATA code (e.g., 'BKK' for Bangkok)",
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
          description:
            'Return date in YYYY-MM-DD format (optional for one-way trips)',
        },
        travelClass: {
          type: SchemaType.STRING,
          description:
            'Travel class: ECONOMY, PREMIUM_ECONOMY, BUSINESS, or FIRST (optional)',
        },
      },
      required: [
        'originLocationCode',
        'destinationLocationCode',
        'departureDate',
        'adults',
      ],
    },
  },
  // You can add a hotel search function here later
];
