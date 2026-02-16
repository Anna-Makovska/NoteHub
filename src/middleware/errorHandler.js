import { HttpError} from "http-errors";
const isProd = process.env.NODE_ENV === 'production';

export const errorHandler = (err, req, res, next) => {

  if (err instanceof HttpError) {
    return res.status(err.statusCode).json({
      message: err.message || err.name
    });
  }

  res.status(500).json({
    message: isProd ? "The app crashed - it is not your fault" : err.message,
  });
};
