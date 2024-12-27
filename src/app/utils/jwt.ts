import * as jose from "jose";
import { ObjectId } from "mongodb";
const SECRET_KEY = "this-is-not-a-safe-keythis veryveryno safety we can handle later ya";

export const createJoseToken = async (payload: { id: ObjectId; email: string; username: string }) => {
  const secret = new TextEncoder().encode(SECRET_KEY);

  const jwt = await new jose.SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" }) // Mengatur header
    .sign(secret); // Menandatangani token dengan kunci rahasia

  return jwt;
};

export const verifyJoseToken = async <T>(token: string) => {
  const secret = new TextEncoder().encode(SECRET_KEY);

  // Memverifikasi token dan mengembalikan payload jika valid
  const payloadJose = await jose.jwtVerify<T>(token, secret, {
    algorithms: ["HS256"], // Algoritma yang digunakan harus sesuai dengan saat pembuatan token
  });

  return payloadJose.payload;
};
