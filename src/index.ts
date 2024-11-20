import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { Prisma, PrismaClient } from '@prisma/client'

import { indexRouter } from './routes/index.js';
import { usersRouter } from './routes/users.js';
import { errorHandler } from './middlewares/errorHandler.js';


const port = process.env.PORT || 3000;

const app = express();
dotenv.config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static('public'));

// index
app.use('/', indexRouter);
app.use('/', usersRouter);
app.use(errorHandler);

const server = app.listen( port, () => {
  console.log('Your app is listening on port ' + port);
});

process.on("unhandledRejection", (err) => {
  console.log(err);
  console.log("Closing server now...");

  server.close(() => {
    process.exit(1);
  });
});

process.on("SIGTERM", () => {
  console.log("SIGTERM received. Shutting down gracefully");

  server.close(() => {
    console.log("Closed out remaining connections");
    process.exit(0);
  });
});
