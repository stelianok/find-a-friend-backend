import { PetsRepository } from "@/repositories/pets-repository";
import { Pet } from "@prisma/client";
import { ResourceNotFoundError } from "./error/resource-not-found-error";

interface ListPetDetailsUseCaseRequest {
  id: string;
}

interface ListPetDetailsUseCaseResponse {
  pet: Pet;
}

export class ListPetDetailsUseCase {
  constructor(private petsRepository: PetsRepository) { }

  async execute({ id }: ListPetDetailsUseCaseRequest): Promise<ListPetDetailsUseCaseResponse> {
    const pet = await this.petsRepository.findById(id);

    if (!pet) {
      throw new ResourceNotFoundError();
    }

    return { pet };
  }

}