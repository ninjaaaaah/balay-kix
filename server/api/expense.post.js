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
      group: {
        connect: {
          id: 1,
        },
      },
      invoice: {
        create: {
          payee: {
            connect: {
              id: 'd14ccbc1-4878-49fd-a8c3-5e881fcd1397',
            },
          },
          payor: {
            connect: {
              id: '83cb3b9a-9a57-41a7-ae8d-d6c4cf9d411a',
            },
          },
        },
      },
    },
  });
  return expense;
});
