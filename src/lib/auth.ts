import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";

const JWT_SECRET = process.env.JWT_SECRET || "development_fallback_jwt_secret_value_not_used_in_prod";
const KEY = new TextEncoder().encode(JWT_SECRET);

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export interface JWTPayload {
  userId: string;
  username: string;
  email: string;
  role: string;
  schoolId?: string;
}

export async function signJWT(payload: JWTPayload, rememberMe = false): Promise<string> {
  const expirationTime = rememberMe ? "7d" : "1d";
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expirationTime)
    .sign(KEY);
}

export async function verifyJWT(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, KEY);
    return payload as unknown as JWTPayload;
  } catch {
    return null;
  }
}
