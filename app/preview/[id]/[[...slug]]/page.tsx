import { notFound } from 'next/navigation';
import { prisma } from '@/lib/db';

function fixLinks(html: string, projectId: string): string {
  return html
    .replace(/href="\/about"/g, `href="/preview/${projectId}/about"`)
    .replace(/href="\/contact"/g, `href="/preview/${projectId}/contact"`)
    .replace(/href="\/"/g, `href="/preview/${projectId}"`);
}

export default async function PreviewPage({
  params
}: {
  params: Promise<{ id: string; slug?: string[] }>;
}) {
  const { id, slug } = await params;
  const pageSlug = slug && slug.length > 0 ? slug[0] : 'home';

  const project = await prisma.project.findUnique({ where: { id } });
  if (!project) notFound();

  const page = await prisma.generatedPage.findUnique({
    where: { projectId_slug: { projectId: id, slug: pageSlug } }
  });

  if (page) {
    const fixedHtml = fixLinks(page.html, id);
    return (
      <html>
        <body style={{ margin: 0 }} dangerouslySetInnerHTML={{ __html: fixedHtml }} />
      </html>
    );
  }

  if (pageSlug === 'home' && project.generatedHtml) {
    return (
      <html>
        <body style={{ margin: 0 }} dangerouslySetInnerHTML={{ __html: project.generatedHtml }} />
      </html>
    );
  }

  notFound();
}