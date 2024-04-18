import { Pet } from "@prisma/client";

import { PetFilters, PetsRepository } from "@/repositories/pets-repository";
import { UndefinedCityQueryParamError } from "./error/undefined-city-query-param-error";

interface GetPetsUseCaseRequest {
  city: string;
  filters?: PetFilters;
}

interface GetPetsUseCaseResponse {
  pets: Pet[];
}

export class GetPetsUseCase {
  constructor(private petsRepository: PetsRepository) { }

  async execute({ city, filters }: GetPetsUseCaseRequest): Promise<GetPetsUseCaseResponse> {

    if (city === undefined || null) {
      throw new UndefinedCityQueryParamError();
    }

    const pets = await this.petsRepository.findManyInCity(city, filters);

    return { pets };
  }
}