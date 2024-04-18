import { describe, expect, it, beforeEach } from 'vitest';
import bcryptjs from 'bcryptjs';

import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository';
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository';

import { ListPetDetailsUseCase } from './list-pet-details';

let orgsRepository: InMemoryOrgsRepository;
let petsRepository: InMemoryPetsRepository;

let listPetDetailsUseCase: ListPetDetailsUseCase;

describe('List pet details use case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository();
    petsRepository = new InMemoryPetsRepository();

    listPetDetailsUseCase = new ListPetDetailsUseCase(petsRepository);
  })

  it('should be able to list pet details given a valid id', async () => {
    const password_hash = await bcryptjs.hash('123456', 6);
    const city = 'City';

    const orgInCity = await orgsRepository.create({
      name: 'Org',
      email: 'johndoe@example.com',
      password_hash: password_hash,
      address: 'Street real address',
      state: 'ST',
      city,
      phone: '55119999999999'
    })

    const RegisteredPet = await petsRepository.create({
      name: "dog1",
      age: "young",
      description: "desc",
      energy_level: "average",
      independence_level: "low",
      size: "big",
      Org: {
        connect: orgInCity,
      },
      created_at: new Date(),
    })

    const { pet } = await listPetDetailsUseCase.execute({ id: RegisteredPet.id });

    expect(pet.id).toEqual(expect.any(String))
    expect(pet.name).toEqual('dog1')

  });
})

