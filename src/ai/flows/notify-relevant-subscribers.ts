// notify-relevant-subscribers.ts
'use server';

/**
 * @fileOverview A flow that intelligently identifies and notifies relevant subscribers when a food item's price is updated.
 *
 * - notifyRelevantSubscribers - A function that handles the notification process.
 * - NotifyRelevantSubscribersInput - The input type for the notifyRelevantSubscribers function.
 * - NotifyRelevantSubscribersOutput - The return type for the notifyRelevantSubscribers function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const NotifyRelevantSubscribersInputSchema = z.object({
  foodItem: z.string().describe('The name of the food item that has a price update.'),
  newPrice: z.number().describe('The new price of the food item.'),
  subscriberList: z.array(z.string()).describe('A list of subscriber IDs.'),
});
export type NotifyRelevantSubscribersInput = z.infer<typeof NotifyRelevantSubscribersInputSchema>;

const NotifyRelevantSubscribersOutputSchema = z.object({
  subscriberIdsToNotify: z.array(z.string()).describe('A list of subscriber IDs to notify about the price update.'),
});
export type NotifyRelevantSubscribersOutput = z.infer<typeof NotifyRelevantSubscribersOutputSchema>;

export async function notifyRelevantSubscribers(input: NotifyRelevantSubscribersInput): Promise<NotifyRelevantSubscribersOutput> {
  return notifyRelevantSubscribersFlow(input);
}

const prompt = ai.definePrompt({
  name: 'notifyRelevantSubscribersPrompt',
  input: {
    schema: NotifyRelevantSubscribersInputSchema,
  },
  output: {
    schema: NotifyRelevantSubscribersOutputSchema,
  },
  prompt: `You are an expert marketing assistant, and your job is to determine which users to send notifications to.

  A food item's price has been updated. The food item is '{{foodItem}}' and the new price is {{newPrice}}.

  Given a list of subscriber IDs:
  {{#each subscriberList}}
  - {{{this}}}
  {{/each}}

  Determine which subscriber IDs should be notified about this price change, based on their likely interest in the food item or related items. Only notify subscribers who would find this information highly relevant.
  Return a list of subscriber IDs to notify. Make sure to only include IDs from the given subscriber list.

  {{subscriberIdsToNotify}}`, // The LLM should populate this field.
});

const notifyRelevantSubscribersFlow = ai.defineFlow(
  {
    name: 'notifyRelevantSubscribersFlow',
    inputSchema: NotifyRelevantSubscribersInputSchema,
    outputSchema: NotifyRelevantSubscribersOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
