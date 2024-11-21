import { Request, Response } from "express";

import { ApiResponse, CreatedExerciseParams, CreatedExerciseRequest, CreatedExerciseResponse } from "../types.js";
import { db } from "../models/index.js";
import { AppError } from "../utils/error.js";
import { isValidDate } from "../utils/isValidDate.js";


export const createExercise = async (
  req: Request<CreatedExerciseParams, ApiResponse<CreatedExerciseResponse>, CreatedExerciseRequest>,
  res: Response<ApiResponse<CreatedExerciseResponse>>
) => {
  let date = req.body.date;
  const description = req.body.description;
  const id = Number(req.params.id);
  const duration = Number(req.body.duration);

  if (!description) {
    throw new AppError('"description" is required and should be non-empty string', 400);
  }

  if (!duration || duration <= 0) {
    throw new AppError('"duration" is required. Should be a positive number (> 0)', 400);
  }

  if (date && !isValidDate(date)) {
    throw new AppError('"date" is invalid. Should be the date in the YYYY-MM-DD format', 400);
  }

  if (Number.isNaN(id)) {
    throw new AppError('"id" slug in path should be a valid integer number', 400);
  }

  const user = await db.users.getUserById({ id });
  if (!user) {
    throw new AppError(`User with id: "${id}" doesn't exist`, 400);
  }

  if (!date) {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const dayOfTheMonth = today.getDate().toString().padStart(2, '0');
    date = `${year}-${month}-${dayOfTheMonth}`;
  }

  const exercise = await db.exercise.createExercise({ userId: id, description, duration, date });
  res.json(exercise);
}

export const getExerciseLogs = async (req: Request, res: Response) => {
  const limit = Number(req.query.limit) || undefined;
  const from = req.query.from?.toString() || undefined;
  const to = req.query.to?.toString() || undefined;

  if (from && !isValidDate(from)) {
    throw new AppError('"from" query should be the valid date in the YYYY-MM-DD format', 400);
  }

  if (to && !isValidDate(to)) {
    throw new AppError('"to" query should be the valid date in the YYYY-MM-DD format', 400);
  }

  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    throw new AppError('"id" slug in path should be an integer number', 400);
  }

  const user = await db.users.getUserById({ id });
  if (!user) {
    throw new AppError(`User with id: "${id}" doesn't exist`, 400);
  }

  const logs = await db.exercise.getExerciseLogs({  limit, from, to, userId: id, });
  res.json(logs);
}
