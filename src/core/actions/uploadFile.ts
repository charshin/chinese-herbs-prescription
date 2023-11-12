'use server';

import { put, list } from '@vercel/blob';

export async function uploadFile(file: File) {
  if (!file) return null;

  return put(file.name, file, {
    access: 'public',
  });
}
