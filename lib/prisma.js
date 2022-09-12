import { PrismaClient } from "@prisma/client";
console.log(
  "rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrreeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
);

if (!global.prisma) {
  global.prisma = new PrismaClient();
}
prisma = global.prisma;

export default prisma;
