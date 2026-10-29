import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { NextResponse } from 'next/server';

const catalogFiles = {
  pvc: { file: 'Robel.pdf', downloadName: 'Robel-PVC-Laminates.pdf' },
  asa: { file: 'ROBEL_ASA.pdf', downloadName: 'Robel-ASA-Laminates.pdf' },
  acrylic: {
    file: 'Robel Acrylic laminate .pdf',
    downloadName: 'Robel-Acrylic-Laminates.pdf'
  }
};

export async function GET(_request, { params }) {
  const { slug } = await params;
  const catalog = catalogFiles[slug];

  if (!catalog) {
    return NextResponse.json({ error: 'Catalog not found.' }, { status: 404 });
  }

  const filePath = path.join(process.cwd(), catalog.file);
  const file = await readFile(filePath);

  return new Response(file, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${catalog.downloadName}"`,
      'Content-Length': String(file.byteLength),
      'X-Content-Type-Options': 'nosniff'
    }
  });
}
