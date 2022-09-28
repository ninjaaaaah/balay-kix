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
  // const user = await serverSupabaseUser(event);
  // if (!user) {
  //   throw new Error('Not authorized');
  // }

  const expense = await prisma.expense.create({
    data: {
      name: body?.name ?? 'Egg',
      cost: body?.cost ?? 40,
      group: {
        connect: {
          id: body?.groupId ?? 1,
        },
      },
      invoice: {
        create: {
          payee: {
            connect: {
              id: body?.payeeId ?? 'd14ccbc1-4878-49fd-a8c3-5e881fcd1397',
            },
          },
          payor: {
            connect: {
              id: body?.payorId ?? '83cb3b9a-9a57-41a7-ae8d-d6c4cf9d411a',
            },
          },
        },
      },
    },
  });
  return expense;
});
