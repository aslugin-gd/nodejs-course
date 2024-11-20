import { PrismaClient } from "@prisma/client";

export const getUsersHandlers = (prisma: PrismaClient) => ({
   getUser: async ({ username }: Record<'username', string>) => {
    const user = await prisma.user.findUnique({
      where: {
        username
      }
    });

    return user;
  },

   getUserById: async ({ id }: Record<'id', number>) => {
    const user = await prisma.user.findUnique({
      where: {
        id
      }
    });

    return user;
  },

   getAllUsers: async () => {
    const users = await prisma.user.findMany();

    return users;
  },

   createUser: async ({ username }: Record<'username', string>) => {
    const newUser = await prisma.user.create({
      data: {
        username
      }
    });

    return newUser;
  },
});

