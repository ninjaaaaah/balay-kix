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

  const group = await prisma.group.findUnique({
    where: {
      id: 1,
    },
    select: {
      name: true,
      members: {
        select: {
          role: true,
          user: {
            select: {
              id: true,
              firstname: true,
              lastname: true,
            },
          },
        },
      },
      expense: {
        select: {
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
      },
    },
  });

  return group;
});
