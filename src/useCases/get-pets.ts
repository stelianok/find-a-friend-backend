import { PetsRepository } from "@/repositories/pets-repository";
import { Pet } from "@prisma/client";

interface GetPetsUseCaseRequest {
  city: string;
}

interface GetPetsUseCaseResponse {
  pets: Pet[];
}

export class GetPetsUseCase {
  constructor(private petsRepository: PetsRepository) { }

  async execute({ city }: GetPetsUseCaseRequest): Promise<GetPetsUseCaseResponse> {
    const pets = await this.petsRepository.findManyInCity(city);

    return { pets };
  }
}