import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async () => {
  const user = await prisma.profiles.findMany();
  return user;
});
