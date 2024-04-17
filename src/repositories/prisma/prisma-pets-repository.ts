import { Prisma } from "@prisma/client";
import { PetsRepository } from "../pets-repository";

import { prisma } from "@/lib/prisma";

export default class PrismaPetsRepository implements PetsRepository {
  async create(data: Prisma.PetCreateInput) {
    const pet = await prisma.pet.create({ data });

    return pet;
  }
  async findManyInCity(city: string) {
    const pets = await prisma.pet.findMany({
      where: {
        Org: {
          city: city,
        }
      },
      include: {
        Org: true
      }
    });

    return pets;
  }
}