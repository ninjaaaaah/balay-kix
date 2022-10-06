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
  const expenseId = parseInt(event.context.params.id);
  if (!user) {
    throw new Error('Not authorized');
  }

  const expense = await prisma.expense.findUnique({
    where: {
      groupId: 1,
      id: expenseId,
    },
  });

  return expense;
});
