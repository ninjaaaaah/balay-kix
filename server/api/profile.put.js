import { serverSupabaseUser } from '#supabase/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await useBody(event);
  const user = await serverSupabaseUser(event);
  if (!user) {
    throw new Error('Not authorized');
  }

  const { error, data } = await prisma.profiles.update({
    where: {
      id: user.id,
    },
    data: body,
  });
  return { error, data };
});
