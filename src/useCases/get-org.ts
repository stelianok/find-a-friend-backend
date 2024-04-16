import { OrgsRepository } from "@/repositories/orgs-repository";
import { Org } from "@prisma/client";
import { ResourceNotFoundError } from "./error/resource-not-found-error";

interface GetOrgUseCaseRequest {
  id: string;
}
interface GetOrgUseCaseResponse {
  org: Org;
}

export class GetOrgUseCase {
  constructor(private orgsRepository: OrgsRepository) { }

  async execute({ id }: GetOrgUseCaseRequest): Promise<GetOrgUseCaseResponse> {
    const org = await this.orgsRepository.findById(id);

    if (!org) {
      throw new ResourceNotFoundError();
    }

    return { org };
  }
}