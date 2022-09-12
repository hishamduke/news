import { PrismaClient } from "@prisma/client";

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
}

if (!global.prisma) {
  global.prisma = new PrismaClient();
}
prisma = global.prisma;

export default prisma;
