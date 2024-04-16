import { OrgsRepository } from "@/repositories/orgs-repository";
import { Org } from "@prisma/client";
import { hash } from 'bcryptjs';
import { OrgAlreadyExistsError } from "./error/org-already-exists-error";


interface RegisterOrgUseCaseRequest {
  name: string;
  email: string;
  password: string;
  address: string;
  state: string;
  city: string;
  phone: string;
}

interface RegisterOrgUseCaseResponse {
  org: Org
}

export class RegisterOrgUseCase {
  constructor(private orgsRepository: OrgsRepository) { }

  async execute({ name, email, password, address, state, city, phone }: RegisterOrgUseCaseRequest): Promise<RegisterOrgUseCaseResponse> {
    const password_hash = await hash(password, 6);

    const orgWithSameEmail = await this.orgsRepository.findByEmail(email);

    if (orgWithSameEmail) {
      throw new OrgAlreadyExistsError();
    }

    const orgWithSamePhone = await this.orgsRepository.findByPhone(phone);

    if (orgWithSamePhone) {
      throw new OrgAlreadyExistsError();
    }

    const org = await this.orgsRepository.create({
      name,
      email,
      password_hash,
      address,
      state,
      city,
      phone
    });

    return { org };
  }
}