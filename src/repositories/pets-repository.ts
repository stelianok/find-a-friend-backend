import { Prisma, Pet } from '@prisma/client';

export interface PetFilters {
  age?: string;
  energy_level?: string;
  size?: string;
  independence_level?: string;

}

export interface PetsRepository {
  create(data: Prisma.PetCreateInput): Promise<Pet>
  findManyInCity(city: string, filters?: PetFilters): Promise<Pet[]>
}