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

  console.log(body);

  // map the payeeId to each payorId
  const expense = await prisma.expense.create({
    data: {
      group: {
        connect: {
          id: body.groupId,
        },
      },
      name: body.name,
      date: new Date(body.date),
      cost: parseFloat(body.cost),
      // connect categories to the expense
      categories: {
        connect: body.categories.map((category) => ({
          id: category.id,
        })),
      },
      invoices: {
        create: body.payors.map((payor) => ({
          amount: parseFloat(body.cost / body.payors.length),
          payee: {
            connect: {
              id: body.payee.id,
            },
          },
          payor: {
            connect: {
              id: payor.id,
            },
          },
        })),
      },
    },
  });

  return expense;
});
