import Anthropic from '@anthropic-ai/sdk';
import type { BuilderInput } from '@/lib/types';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
});

export async function generateLandingPageHtml(input: BuilderInput): Promise<string> {
  const prompt = `You are an expert web designer. Generate a single, complete, self-contained HTML page for a landing page based on this business information:

Company: ${input.companyName}
Goal: ${input.goal}
Project type: ${input.projectType}
Style: ${input.style}
Primary color: ${input.color}
Tagline: ${input.tagline}
Audience: ${input.audience}
Offer: ${input.offer}
Primary action: ${input.primaryAction}
Features: ${input.features.join(', ')}

Requirements:
- Output ONLY raw HTML, no markdown code fences, no explanations
- Include <style> tags with all CSS inline in the <head>
- Use the primary color (${input.color}) as the main brand color
- Make it modern, ${input.style.toLowerCase()} style
- Include: hero section with headline and CTA button, a features section, and a footer
- Make it fully responsive
- Do not use any external images, use CSS gradients/shapes for visual interest
- Do not include any JavaScript
- The page must be complete and renderable as-is (full <html><head><body> structure)`;

  const message = await anthropic.messages.create({
    model: 'claude-sonnet-4-5',
    max_tokens: 4096,
    messages: [{ role: 'user', content: prompt }]
  });

  const textBlock = message.content.find((block) => block.type === 'text');
  let html = textBlock && textBlock.type === 'text' ? textBlock.text : '';

  html = html.replace(/```html/g, '').replace(/```/g, '').trim();

  return html;
}
export async function editLandingPageHtml(currentHtml: string, editInstruction: string): Promise<string> {
  const prompt = `Here is an HTML landing page:

\`\`\`html
${currentHtml}
\`\`\`

Apply this exact change: "${editInstruction}"

Instructions:
1. Find the relevant CSS or HTML that controls what the user wants to change
2. Modify ONLY that part
3. Keep everything else in the page byte-for-byte identical
4. Return the COMPLETE modified HTML document from <!DOCTYPE html> or <html> to </html>
5. Do not add any explanation, markdown formatting, or code fences — output raw HTML only
6. Make sure the change is clearly visible and actually applied — double check your output contains the requested change before responding`;

  const message = await anthropic.messages.create({
    model: 'claude-sonnet-4-5',
    max_tokens: 8192,
    messages: [{ role: 'user', content: prompt }]
  });

  const textBlock = message.content.find((block) => block.type === 'text');
  let html = textBlock && textBlock.type === 'text' ? textBlock.text : '';

  html = html.replace(/```html/g, '').replace(/```/g, '').trim();

  return html;
}