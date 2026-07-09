import { notFound } from 'next/navigation';
import { prisma } from '@/lib/db';

export default async function PreviewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await prisma.project.findUnique({ where: { id } });

  if (!project || !project.generatedHtml) notFound();

  return (
    <html>
      <body style={{ margin: 0 }} dangerouslySetInnerHTML={{ __html: project.generatedHtml }} />
    </html>
  );
}