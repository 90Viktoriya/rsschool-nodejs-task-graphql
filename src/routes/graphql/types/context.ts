import { PrismaClient } from "@prisma/client";
import { createLoaders } from "../loader/loader.js";

export type GraphQLContext = {
  dataLoader: ReturnType<typeof createLoaders>;
  prisma: PrismaClient
};