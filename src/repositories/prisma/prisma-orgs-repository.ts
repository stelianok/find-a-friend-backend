import { Prisma } from "@prisma/client";
import { OrgsRepository } from "../orgs-repository";

export class PrismaOrgsRepository implements OrgsRepository {
  create(data: Prisma.OrgCreateInput): Promise<{ id: string; name: string[]; email: string; password_hash: string; address: string; state: string; city: string; phone: string; created_at: Date; }> {
    throw new Error("Method not implemented.");
  }
}