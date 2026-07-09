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