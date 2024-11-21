import { PrismaClient } from "@prisma/client";
import { CreatedExerciseRequest } from "../types.js";

export const getExercisesHandlers = (prisma: PrismaClient) => ({
  createExercise: async (params: Required<CreatedExerciseRequest> & { userId: number }) => {
    const { description, duration, userId, date } = params;

    const exercise = await prisma.exercise.create({
      data: {
        description,
        duration,
        date,
        userId
      }
    });

    return exercise;
  },

  getExerciseLogs: async (params: {
    userId: number,
    from?: string,
    to?: string,
    limit?: number
  }) => {
    const { userId, from, to, limit } = params;

    const logs = await prisma.exercise.findMany({
      take: limit,
      where: {
        userId,
        date: {
          lte: to,
          gte: from
        }
      },
      orderBy: {
        date: "asc"
      }
    });

    const count = await prisma.exercise.count({
      where: {
        date: {
          lte: to,
          gte: from
        }
      }
    });

    return {
      logs,
      count
    };
  }
});

