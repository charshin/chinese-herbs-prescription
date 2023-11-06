'use server';

import { revalidatePath } from 'next/cache';

import { HerbModel } from '@/core/types/models/herb';

import { updateHerbs } from '../data/herbs';

export async function uploadHerbsData(herbs: HerbModel[]) {
  await updateHerbs(herbs);

  revalidatePath('/');
}
