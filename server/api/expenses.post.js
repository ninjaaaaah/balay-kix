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
  const user = await serverSupabaseUser(event);
  if (!user) {
    throw new Error('Not authorized');
  }

  const expense = await prisma.expense.create({
    data: {
      name: 'Egg',
      cost: 40,
      groupId: 1,
      invoice: {
        create: {
          payeeId: {
            connect: {
              id: '6f3fbd53-d79e-4743-a6cb-402dae36cf52',
            },
          },
          payorId: {
            connect: {
              id: '4e39463f-e9b8-47cd-b15c-6dd91b59af21',
            },
          },
        },
      },
    },
  });
  return expense;
});
