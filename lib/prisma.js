import { PrismaClient } from "@prisma/client";
import { env } from "../../env/server.mjs";

export const prisma = global.prisma || new PrismaClient();

if (env.NODE_ENV !== "production") {
  global.prisma = prisma;
}
