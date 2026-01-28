
const isProd = process.env.NODE_ENV === 'production';

export const errorHandler = async (err, req, res, next) => {

  res.status(500).json({
    message: isProd ? "The app crashed - it is not your fault" : err.message,
  });
};
