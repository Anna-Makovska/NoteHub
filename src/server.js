import "dotenv/config";
import express from 'express';
import cors from 'cors';
import {connectMongoDB} from "./db/connectMongoDB.js";
import { logger } from "./middleware/logger.js";
import { notFoundHandler } from "./middleware/notFoundHandler.js";
import { errorHandler } from "./middleware/errorHandler.js";
import NotesRouter from "./routes/notesRoutes.js";
import helmet from "helmet";
import { errors } from "celebrate";
import cookieParser from "cookie-parser";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import swaggerUi from 'swagger-ui-express';
import { openapiSpec } from './docs/openapi.js';

const app = express();
app.use(
  cors({
    origin: [
      process.env.FRONTEND_DOMAIN,
      `http://localhost:${process.env.FRONTEND_PORT ?? 3000}`,
    ],
    credentials: true,
  }),
);
app.use(helmet());
app.use(express.json());
app.use(cookieParser());

app.use(logger);


const PORT = process.env.PORT ?? 3000;

app.use(authRouter);
app.use(NotesRouter);
app.use(userRouter);


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpec));


app.use(notFoundHandler);

app.use(errors());

app.use(errorHandler);

await connectMongoDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
