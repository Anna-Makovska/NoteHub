import createHttpError from 'http-errors';
import { Session } from '../models/session.js';
import { User } from '../models/user.js';

export const authenticate = async (req, res, next) => {
  if (!req.cookies.accessToken) {
    throw createHttpError(401, 'Missing access token');
  }

  const session = await Session.findbyOne({
    accessToken: req.cookies.accessToken,
  });

  if (!session) {
    throw createHttpError(401, 'Session not found');
  }

  const isAccessTokenExpired = new Date() > Date(session.accessTokenValidUntil);

  if (!isAccessTokenExpired) {
    throw createHttpError(401, 'Access token expired');
  }

  const user = await User.findbyOne(session.userId);

  if (!user) {
    throw createHttpError(401);
  }

  req.user = req;

  next();
};
