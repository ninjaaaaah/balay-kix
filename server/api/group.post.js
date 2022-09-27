import { serverSupabaseUser } from '#supabase/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

prisma.$use(async (params, next) => {
  const before = Date.now();
  const result = await next(params);
  const after = Date.now();
  console.log(
    `Query ${params.model}.${params.action} took ${after - before}ms`
  );
  return result;
});

export default defineEventHandler(async (event) => {
  const body = await useBody(event);
  const user = await serverSupabaseUser(event);
  if (!user) {
    throw new Error('Not authorized');
  }

  const profile = await prisma.profiles.findUnique({
    where: {
      id: user.id,
    },
  });

  const group = await prisma.group.create({
    data: {
      name: 'Sample Group',
      members: {
        create: {
          role: 'PAYOR',
          user: {
            connect: {
              id: profile.id,
            },
          },
        },
      },
    },
  });
  return group;
});
