import { put } from '@vercel/blob';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest): Promise<NextResponse> {
  const file = request.body;
  const filename = request.nextUrl.searchParams.get('filename');

  console.log('%cfile', 'font-size: 12px; color: #00b3b3', file);

  if (!file) {
    return new NextResponse(null, { status: 400, statusText: 'Missing file' });
  }
  if (!filename) {
    return new NextResponse(null, { status: 400, statusText: 'Missing filename' });
  }

  // const blob = await put(filename, file, {
  //   access: 'public',
  // });

  return NextResponse.json({
    code: 0,
    message: 'File successfully uploaded.',
    // data: blob,
    data: {},
  });
}
