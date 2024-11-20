import { Request, Response } from "express";
import { db } from "../models/index.js"
import { ApiResponse, User } from "../types.js";
import { AppError } from "../utils/error.js";

export const getUsers = async (req: Request, res: Response) => {
  const users = await db.users.getAllUsers();

  if (users.length === 0) {
    throw new AppError('There are no users', 404)
  }

  res.json(users);
}

export const createUser = async (
  req: Request<{ username: string }>,
  res: Response<ApiResponse<User>>
) => {
  const username = req.body.username?.trim();

  if (!username) {
    throw new AppError('"username" is required and should be non-empty string', 400);
  }

  const user = await db.users.getUser({ username });
  if (user) {
    throw new AppError(`Username "${username}" already reserved. Please type another one.`, 400);
  }

  const newUser = await db.users.createUser({ username });
  res.json(newUser);
}
