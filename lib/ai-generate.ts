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
export type GeneratedPageData = {
  slug: string;
  title: string;
  html: string;
};

export async function generateMultiPageSite(input: BuilderInput): Promise<GeneratedPageData[]> {
  const prompt = `You are an expert web designer. Generate a complete 8-page website based on this business information:

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

Generate exactly 8 pages: "home", "about", "contact", "pricing", "services", "faq", "team", "testimonials".

For each page, generate a complete, self-contained HTML page with inline <style> CSS.

Requirements for all pages:
- Include a navigation bar at the top with links to all 8 pages using these exact relative hrefs: / (home), /about, /contact, /pricing, /services, /faq, /team, /testimonials
- Use the primary color (${input.color}) consistently across all pages
- Make it modern, ${input.style.toLowerCase()} style, fully responsive
- Do not use external images, use CSS gradients/shapes for visual interest
- Do not include any JavaScript
- Home page: hero section, features section, footer
- About page: company story, mission, footer
- Contact page: contact info, a visual (non-functional) contact form, footer
- Pricing page: 3 pricing tiers with features comparison, footer
- Services page: list of services offered with descriptions, footer
- FAQ page: 6-8 common questions with answers in an accordion-style layout, footer
- Team page: 3-4 team member placeholder cards with name, role, short bio, footer
- Testimonials page: 4-6 customer testimonial quotes in cards, footer

Respond with ONLY a valid JSON array, no markdown code fences, no explanation, in this exact format:
[
  {"slug": "home", "title": "Home", "html": "<!DOCTYPE html>..."},
  {"slug": "about", "title": "About", "html": "<!DOCTYPE html>..."},
  {"slug": "contact", "title": "Contact", "html": "<!DOCTYPE html>..."},
  {"slug": "pricing", "title": "Pricing", "html": "<!DOCTYPE html>..."},
  {"slug": "services", "title": "Services", "html": "<!DOCTYPE html>..."},
  {"slug": "faq", "title": "FAQ", "html": "<!DOCTYPE html>..."},
  {"slug": "team", "title": "Team", "html": "<!DOCTYPE html>..."},
  {"slug": "testimonials", "title": "Testimonials", "html": "<!DOCTYPE html>..."}
]

Make sure the HTML strings are properly JSON-escaped.`;

  const stream = anthropic.messages.stream({
    model: 'claude-sonnet-4-5',
    max_tokens: 32000,
    messages: [{ role: 'user', content: prompt }]
  });

  const message = await stream.finalMessage();
  const textBlock = message.content.find((block) => block.type === 'text');
  let text = textBlock && textBlock.type === 'text' ? textBlock.text : '[]';

  text = text.replace(/```json/g, '').replace(/```/g, '').trim();

  try {
    const pages = JSON.parse(text) as GeneratedPageData[];
    return pages;
  } catch (error) {
    console.error('Failed to parse multi-page JSON:', error);
    throw new Error('Failed to generate multi-page site');
  }
}