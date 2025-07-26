'use server';
/**
 * @fileOverview An AI agent that analyzes product prices and quality.
 *
 * - analyzePrices - A function that handles the price analysis process.
 * - PriceAnalysisInput - The input type for the analyzePrices function.
 * - PriceAnalysisOutput - The return type for the analyzePrices function.
 */

import { ai } from '@/ai/genkit';
import type { Product } from '@/lib/data';
import { z } from 'genkit';

const ProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number(),
  originalPrice: z.number().optional(),
  rating: z.number(),
  imageUrl: z.string(),
  category: z.string(),
  hint: z.string(),
  vendor: z.string(),
  date: z.string(),
  feedback: z
    .array(
      z.object({
        author: z.string(),
        rating: z.number(),
        comment: z.string(),
      })
    )
    .optional(),
});

const PriceAnalysisInputSchema = z.object({
  products: z.array(ProductSchema),
});
export type PriceAnalysisInput = z.infer<typeof PriceAnalysisInputSchema>;

const PriceAnalysisOutputSchema = z.object({
  analysisSummary: z
    .string()
    .describe(
      'A brief, engaging summary of the market analysis, highlighting the best deals and quality products. Start with a sentence like "Based on our analysis, here are the top deals for you:"'
    ),
  topDeals: z
    .array(
      z.object({
        productId: z.string().describe('The ID of the product.'),
        justification: z
          .string()
          .describe(
            'A short, compelling reason why this product is a top deal, considering its price, quality (rating), and vendor.'
          ),
        recommendedVendor: z
          .string()
          .describe('The name of the recommended vendor for this product.'),
      })
    )
    .describe(
      'A list of the top 3-5 products with the best value for money, recommending the best supplier for each.'
    ),
});
export type PriceAnalysisOutput = z.infer<typeof PriceAnalysisOutputSchema>;

export async function analyzePrices(
  input: PriceAnalysisInput
): Promise<PriceAnalysisOutput> {
  return analyzePricesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzePricesPrompt',
  input: { schema: PriceAnalysisInputSchema },
  output: { schema: PriceAnalysisOutputSchema },
  prompt: `You are an expert analyst for "BhojonBazaar", a service for street food vendors. Your goal is to help vendors find the best raw material prices.

Analyze the provided product list. For each category of product (like "Onion", "Tomato", etc.), recommend the best supplier considering both price and quality (rating). A slightly higher price may be acceptable for significantly better quality.

Based on your analysis, provide a concise summary and identify the top 3-5 deals. For each top deal, give a short justification for your choice and explicitly name the recommended vendor.

Here is the list of products from various vendors:
{{#each products}}
- Product ID: {{id}}, Name: {{name}}, Price: ₹{{price}}, Quality Rating: {{rating}}/5, Vendor: {{vendor}}
{{/each}}
`,
});

const analyzePricesFlow = ai.defineFlow(
  {
    name: 'analyzePricesFlow',
    inputSchema: PriceAnalysisInputSchema,
    outputSchema: PriceAnalysisOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
