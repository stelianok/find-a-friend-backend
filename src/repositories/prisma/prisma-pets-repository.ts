import { Prisma } from "@prisma/client";
import { PetFilters, PetsRepository } from "../pets-repository";

import { prisma } from "@/lib/prisma";

export default class PrismaPetsRepository implements PetsRepository {
  async create(data: Prisma.PetCreateInput) {
    const pet = await prisma.pet.create({ data });

    return pet;
  }

  async findById(id: string) {
    const pet = await prisma.pet.findUnique({ where: { id }, include: { Org: true } });

    return pet;
  }

  async findManyInCity(city: string, { age, energy_level, independence_level, size }: PetFilters) {
    const pets = await prisma.pet.findMany({
      where: {
        Org: {
          city: city,
        },
        age,
        energy_level,
        independence_level,
        size
      },
    });

    return pets;
  }
}