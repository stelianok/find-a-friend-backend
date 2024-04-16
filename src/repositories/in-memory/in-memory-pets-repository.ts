import { Pet, Prisma } from "@prisma/client";
import { PetsRepository } from "../pets-repository";

export class InMemoryPetsRepository implements PetsRepository {
  private pets: Pet[] = [];

  async create(data: Prisma.PetCreateInput) {
    if (!data.description) {
      data.description = null;
    }

    if (!data.Org.connect?.id) {
      throw new Error();
    }

    const pet = {
      id: 'pet-1',
      name: data.name,
      description: data?.description,
      age: data.age,
      energy_level: data.energy_level,
      size: data.size,
      independence_level: data.independence_level,
      org_id: data.Org.connect.id,
      created_at: new Date()
    }

    this.pets.push(pet);

    return pet;
  }


}