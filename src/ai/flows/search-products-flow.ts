'use server';
/**
 * @fileOverview An AI agent that searches for products based on a query.
 *
 * - searchProducts - A function that handles the product search process.
 * - SearchProductsInput - The input type for the searchProducts function.
 * - SearchProductsOutput - The return type for the searchProducts function.
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

const SearchProductsInputSchema = z.object({
  query: z.string().describe("The user's search query."),
  products: z.array(ProductSchema),
});
export type SearchProductsInput = z.infer<typeof SearchProductsInputSchema>;

const SearchProductsOutputSchema = z.object({
  productIds: z
    .array(z.string())
    .describe(
      "A list of product IDs that are most relevant to the user's search query. If no products match, return an empty array."
    ),
});
export type SearchProductsOutput = z.infer<typeof SearchProductsOutputSchema>;

export async function searchProducts(
  input: SearchProductsInput
): Promise<SearchProductsOutput> {
  return searchProductsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'searchProductsPrompt',
  input: { schema: SearchProductsInputSchema },
  output: { schema: SearchProductsOutputSchema },
  prompt: `You are a helpful shopping assistant for an online grocery store. Your task is to find products that match the user's search query. The query might be a product name, a category, or a general description.

Return a list of product IDs that best match the query. If no products seem to match, return an empty list.

User Query: "{{query}}"

Available Products:
{{#each products}}
- ID: {{id}}, Name: {{name}}, Category: {{category}}, Description: {{hint}}
{{/each}}
`,
});

const searchProductsFlow = ai.defineFlow(
  {
    name: 'searchProductsFlow',
    inputSchema: SearchProductsInputSchema,
    outputSchema: SearchProductsOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
