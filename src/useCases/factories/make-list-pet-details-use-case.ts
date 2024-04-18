import PrismaPetsRepository from "@/repositories/prisma/prisma-pets-repository";

import { ListPetDetailsUseCase } from "../list-pet-details";

export function makeListPetDetailsUseCase() {
  const petsRepository = new PrismaPetsRepository();

  const useCase = new ListPetDetailsUseCase(petsRepository);

  return useCase;
}