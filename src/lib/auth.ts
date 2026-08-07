import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";

function getJwtKey() {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new Error("JWT_SECRET is not configured");
  }

  return new TextEncoder().encode(jwtSecret);
}

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
    .sign(getJwtKey());
}

export async function verifyJWT(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getJwtKey());
    return payload as unknown as JWTPayload;
  } catch {
    return null;
  }
}
