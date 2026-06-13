'use server';
/**
 * @fileOverview A multi-lingual AI Assistant for Adil Morocco.
 * Supports Arabic (MSA & Darija), English, French, and any other language requested by the user.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiChatInputSchema = z.object({
  history: z.array(z.object({
    role: z.enum(['user', 'model']),
    content: z.string(),
  })).describe('The conversation history.'),
  message: z.string().describe('The new message from the user.'),
  language: z.string().default('auto').describe('The preferred language for the response or "auto" to detect.'),
});
export type AiChatInput = z.infer<typeof AiChatInputSchema>;

const AiChatOutputSchema = z.object({
  response: z.string().describe('The response from the AI assistant.'),
});
export type AiChatOutput = z.infer<typeof AiChatOutputSchema>;

const aiChatPrompt = ai.definePrompt({
  name: 'aiChatPrompt',
  input: {schema: AiChatInputSchema},
  output: {schema: AiChatOutputSchema},
  prompt: `You are Adil, the friendly and highly intelligent multi-lingual AI assistant for "Adil Morocco".
"Adil Morocco" is a social media platform dedicated to Moroccan culture, community, and discovery.

Your personality:
- Warm, welcoming, and helpful (Moroccan hospitality/Tikshbila spirit).
- Expert in Moroccan culture, history, food, and traditions.
- Multi-lingual expert: You speak Arabic (Modern Standard and Moroccan Darija fluently), English, French, and you can communicate effectively in any other language the user uses.

Guidelines:
- If the language parameter is "auto", respond in the same language the user is speaking.
- If the language is specified (e.g., "ar" or "en"), prioritize that language but stay natural.
- When speaking in Arabic, feel free to use Moroccan Darija expressions if the user seems to be Moroccan or interested in local culture (e.g., using "Marhaba", "Labas", "Choukran").
- Always be encouraging and positive.

Language Preference: {{language}}

Conversation History:
{{#each history}}
{{role}}: {{{content}}}
{{/each}}

User: {{{message}}}

Assistant:`,
});

export async function askAssistant(input: AiChatInput): Promise<AiChatOutput> {
  return aiChatFlow(input);
}

const aiChatFlow = ai.defineFlow(
  {
    name: 'aiChatFlow',
    inputSchema: AiChatInputSchema,
    outputSchema: AiChatOutputSchema,
  },
  async (input) => {
    try {
      const { output } = await aiChatPrompt(input);
      if (!output || !output.response) {
        throw new Error('AI produced no valid output');
      }
      return output;
    } catch (error: any) {
      console.error('Genkit Flow Error:', error);
      // Fallback message in both Arabic and English if things go wrong
      return {
        response: "عذراً، واجهت مشكلة تقنية بسيطة. أنا أتحدث لغات متعددة ولكن يبدو أن هناك خطأ في الاتصال الآن. \n\n Sorry, I'm having a technical hiccup. I speak many languages but I'm having trouble connecting right now."
      };
    }
  }
);
