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
  // const user = await serverSupabaseUser(event);
  // if (!user) {
  //   throw new Error('Not authorized');
  // }

  const categories = await prisma.category.findMany({
    select: {
      name: true,
      color: true,
      icon: true,
      id: true,
    },
  });

  return categories;
});
