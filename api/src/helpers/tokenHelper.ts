import jwt from "jsonwebtoken";

const ACCESS_TOKEN_LIFETIME = (process.env.ACCESS_TOKEN_LIFETIME as string) || "3m";
const REFRESH_TOKEN_LIFETIME = (process.env.REFRESH_TOKEN_LIFETIME as string) || "3d";
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as string;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET as string;

export const generateTokens = (tokenData: object) => ({
  accessToken: jwt.sign(tokenData, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_LIFETIME }),
  refreshToken: jwt.sign(tokenData, REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_LIFETIME }),
});

type verifiedToken = {
  userId: string;
  email: string;
};

export const verifyAccessToken = async (token: string): Promise<verifiedToken> =>
  jwt.verify(token, ACCESS_TOKEN_SECRET) as verifiedToken;

export const verifyRefreshToken = async (token: string): Promise<verifiedToken> =>
  jwt.verify(token, REFRESH_TOKEN_SECRET) as verifiedToken;
