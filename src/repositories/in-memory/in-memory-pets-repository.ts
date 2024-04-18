import { Pet, Prisma } from "@prisma/client";
import { PetFilters, PetsRepository } from "../pets-repository";

interface PetWithOrgInfo extends Pet {
  Org: Prisma.OrgCreateNestedOneWithoutPetsInput
}
export class InMemoryPetsRepository implements PetsRepository {
  private pets: PetWithOrgInfo[] = [];

  async findManyInCity(city: string, filters?: PetFilters) {
    const petsInCity = this.pets.filter((pet) => (
      pet.Org.connect?.city == city
    ))

    if (filters) {
      const filteredPetList = petsInCity.filter((pet) => {
        return (
          (!filters.age || pet.age === filters.age) &&
          (!filters.energy_level || pet.energy_level === filters.energy_level) &&
          (!filters.independence_level || pet.independence_level === filters.independence_level) &&
          (!filters.size || pet.size === filters.size)
        )
      })

      return filteredPetList;
    }

    return petsInCity;
  }

  async findById(id: string) {
    const pet = this.pets.find((pet) => (pet.id === id))

    if (!pet) {
      return null;
    }

    return pet;
  }
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
      Org: data.Org,
      org_id: data.Org.connect.id,
      created_at: new Date()
    }

    this.pets.push(pet);

    return pet;
  }


}