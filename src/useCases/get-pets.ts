import { PetsRepository } from "@/repositories/pets-repository";
import { Pet } from "@prisma/client";
import { UndefinedCityQueryParamError } from "./error/undefined-city-query-param-error";

interface GetPetsUseCaseRequest {
  city: string;
}

interface GetPetsUseCaseResponse {
  pets: Pet[];
}

export class GetPetsUseCase {
  constructor(private petsRepository: PetsRepository) { }

  async execute({ city }: GetPetsUseCaseRequest): Promise<GetPetsUseCaseResponse> {

    if (city === undefined || null) {
      throw new UndefinedCityQueryParamError();
    }
    const pets = await this.petsRepository.findManyInCity(city);

    return { pets };
  }
}