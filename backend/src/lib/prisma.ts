import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../generated/prisma";

const adapter = new PrismaPg({
  connectionString: process.env["DATABASE_URL"],
});

declare global {
  // eslint-disable-next-line no-var
  var __prisma: PrismaClient | undefined;
}

if (!global.__prisma) {
  global.__prisma = new PrismaClient({ adapter });
}

export const prisma = global.__prisma;
