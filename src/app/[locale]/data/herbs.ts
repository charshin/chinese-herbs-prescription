import 'server-only';

import { z } from 'zod';

import { prisma } from '@/core/db/prisma';
import { validate, convertHerbDTOtoModel } from '@/core/utils/data';
import { getErrorMessage } from '@/core/utils/error';
import { HerbSchema } from '@/core/types/schemas/herb';
import { HerbDTO } from '@/core/types/dtos/herb';
import { HerbModel } from '@/core/types/models/herb';

export const getHerbs = async () => {
  try {
    const herbsData = await prisma.herb.findMany({ orderBy: { name: 'asc' } });
    const herbsDTO = validate<HerbDTO[]>(herbsData, z.array(HerbSchema));
    return herbsDTO.map(convertHerbDTOtoModel);
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const updateHerbs = async (newHerbs: HerbModel[]) => {
  try {
    return Promise.all(
      newHerbs.map(({ id, ...herb }) => {
        return prisma.herb.upsert({
          where: { name: herb.name },
          update: herb,
          create: herb,
        });
      }),
    );
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};
