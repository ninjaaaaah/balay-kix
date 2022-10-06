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
  const groupId = parseInt(event.context.params.groupId);
  const expenseId = parseInt(event.context.params.expenseId);
  if (!user) {
    throw new Error('Not authorized');
  }

  const expense = await prisma.expense.findUnique({
    where: {
      id: expenseId,
    },
    select: {
      id: true,
      cost: true,
      date: true,
      name: true,
      categories: true,
      updatedAt: true,
      invoices: {
        select: {
          id: true,
          paid: true,
          payee: {
            select: {
              id: true,
              firstname: true,
            },
          },
          payor: {
            select: {
              id: true,
              firstname: true,
            },
          },
        },
      },
    },
  });

  return expense;
});
