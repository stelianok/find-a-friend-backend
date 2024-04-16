import { Org, Prisma } from "@prisma/client";
import { OrgsRepository } from "../orgs-repository";

export class InMemoryOrgsRepository implements OrgsRepository {

  public orgs: Org[] = [];

  async create(data: Prisma.OrgCreateInput) {
    const org = {
      id: 'org-1',
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      address: data.address,
      state: data.state,
      city: data.city,
      phone: data.phone,
      created_at: new Date()
    }

    this.orgs.push(org);

    return org;
  }

  async findByEmail(email: string) {
    const org = this.orgs.find((org) => org.email === email);

    if (!org) {
      return null
    }

    return org;
  }

  async findByPhone(phone: string) {
    const org = this.orgs.find((org) => org.phone === phone);

    if (!org) {
      return null
    }

    return org;
  }

}