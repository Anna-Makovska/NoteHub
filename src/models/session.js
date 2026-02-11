import { Schema, model } from 'mongoose';

const sessionSchema = new Schema(
  {
    userId: Schema.Types.ObjectId,
    accessToken: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
      required: true,
    },
    accessTokenValidUntil: {
      type: Date,
      required: true,
    },
    refreshTokenValidUntil: {
      type: Date,
      required: true,
    },
  },
  {
    timeStamps: true,
    versionKey: false,
  },
);

export const Session = model('Session', sessionSchema);
