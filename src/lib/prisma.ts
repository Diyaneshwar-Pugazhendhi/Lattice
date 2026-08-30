import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

export function getPrisma(): PrismaClient {
  if (!prisma) {
    prisma = new PrismaClient({
      log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
    });
  }
  return prisma;
}

// For Next.js route handlers, we want a singleton across the app
if (process.env.NODE_ENV !== "production") {
  globalForDev = globalForDev || {};
  globalForDev.prisma = globalForDev.prisma || getPrisma();
  prisma = globalForDev.prisma;
}

declare global {
  var globalForDev: {
    prisma?: PrismaClient;
  };
}