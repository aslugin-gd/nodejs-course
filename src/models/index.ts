import { PrismaClient } from "@prisma/client";

import { getUsersHandlers } from "./users.js";
import { getExercisesHandlers } from "./exercises.js";

export const prisma = new PrismaClient();

export const db = {
  users: getUsersHandlers(prisma),
  exercise: getExercisesHandlers(prisma)
}
