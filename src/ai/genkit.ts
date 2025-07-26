import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';
import {defineDotenv} from 'genkit';

defineDotenv({
  experimentalAllowUnsafeGet: true,
});

export const ai = genkit({
  plugins: [
    googleAI({
      apiKey: process.env.GEMINI_API_KEY,
    }),
  ],
  model: 'googleai/gemini-2.0-flash',
});
