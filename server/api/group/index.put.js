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

  // insert the current user id to the group with the code provided
  const group = await prisma.group.update({
    where: {
      code: body.code,
    },
    data: {
      members: {
        create: {
          role: 'Basic',
          user: {
            connect: {
              id: user.id,
            },
          },
        },
      },
    },
  });

  return group;
});
