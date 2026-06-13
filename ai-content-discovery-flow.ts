
'use server';
/**
 * @fileOverview An AI agent for personalized content and user discovery.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiContentDiscoveryInputSchema = z.object({
  userId: z.string().describe('The ID of the user for whom to generate suggestions.'),
  likedPosts: z.array(z.string()).describe('Summaries or descriptions of posts the user has liked.'),
  commentedPosts: z.array(z.string()).describe('Summaries or descriptions of posts the user has commented on.'),
  watchedReels: z.array(z.string()).describe('Summaries or descriptions of reels the user has watched.'),
  followedUsers: z.array(z.string()).describe('Usernames or IDs of users the current user follows.'),
});
export type AiContentDiscoveryInput = z.infer<typeof AiContentDiscoveryInputSchema>;

const AiContentDiscoveryOutputSchema = z.object({
  suggestedPosts: z.array(
    z.object({
      postId: z.string(),
      reason: z.string(),
    })
  ),
  suggestedReels: z.array(
    z.object({
      reelId: z.string(),
      reason: z.string(),
    })
  ),
  suggestedUsers: z.array(
    z.object({
      userId: z.string(),
      reason: z.string(),
    })
  ),
});
export type AiContentDiscoveryOutput = z.infer<typeof AiContentDiscoveryOutputSchema>;

export async function discoverContent(input: AiContentDiscoveryInput): Promise<AiContentDiscoveryOutput> {
  return aiContentDiscoveryFlow(input);
}

const aiContentDiscoveryPrompt = ai.definePrompt({
  name: 'aiContentDiscoveryPrompt',
  input: {schema: AiContentDiscoveryInputSchema},
  output: {schema: AiContentDiscoveryOutputSchema},
  prompt: `You are an intelligent content discovery agent for Adil Morocco.
Suggest personalized content and users based on these interactions:

User ID: {{{userId}}}
Liked: {{#each likedPosts}}{{{this}}}, {{/each}}
Followed: {{#each followedUsers}}{{{this}}}, {{/each}}

Provide 3 suggestions for each category with brief reasons.`,
});

const aiContentDiscoveryFlow = ai.defineFlow(
  {
    name: 'aiContentDiscoveryFlow',
    inputSchema: AiContentDiscoveryInputSchema,
    outputSchema: AiContentDiscoveryOutputSchema,
  },
  async (input) => {
    try {
      const {output} = await aiContentDiscoveryPrompt(input);
      return output!;
    } catch (error) {
      console.error('Discovery Flow Error:', error);
      return {
        suggestedPosts: [],
        suggestedReels: [],
        suggestedUsers: []
      };
    }
  }
);
