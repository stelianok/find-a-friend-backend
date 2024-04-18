import { OrgsRepository } from "@/repositories/orgs-repository";
import { PetsRepository } from "@/repositories/pets-repository";
import { Pet } from "@prisma/client";
import { ResourceNotFoundError } from "./error/resource-not-found-error";

interface RegisterPetUseCaseRequest {
  name: string;
  description?: string | null;
  age: string;
  energy_level: string;
  size: string;
  independence_level: string;
  org_id: string;
}

interface RegisterPetUseCaseResponse {
  pet: Pet;
}

export class RegisterPetUseCase {
  constructor(
    private orgsRepository: OrgsRepository,
    private petsRepository: PetsRepository) { }

  async execute({ name, description, age, energy_level, size, independence_level, org_id }: RegisterPetUseCaseRequest): Promise<RegisterPetUseCaseResponse> {
    const doesOrgExists = this.orgsRepository.findById(org_id);

    if (!doesOrgExists) {
      throw new ResourceNotFoundError();
    }

    const pet = await this.petsRepository.create({
      name,
      description,
      age,
      energy_level,
      size,
      independence_level,
      Org: {
        connect: {
          id: org_id
        }
      }
    });

    return { pet }
  }
}