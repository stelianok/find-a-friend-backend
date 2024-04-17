import { Prisma, Pet } from '@prisma/client';

export interface PetsRepository {
  create(data: Prisma.PetCreateInput): Promise<Pet>
  findManyInCity(city: string): Promise<Pet[]>
}