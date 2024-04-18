import { describe, expect, it, beforeEach } from 'vitest';
import bcryptjs from 'bcryptjs';

import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository';
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository';

import { PetFilters } from '@/repositories/pets-repository';

import { GetPetsUseCase } from './get-pets';

let orgsRepository: InMemoryOrgsRepository;
let petsRepository: InMemoryPetsRepository;

let getPetsUseCase: GetPetsUseCase;

describe('List pets use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository();
    petsRepository = new InMemoryPetsRepository();

    getPetsUseCase = new GetPetsUseCase(petsRepository);
  })

  it('should be able to list all pets in given city', async () => {
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

    const orgInAnotherCity = await orgsRepository.create({
      name: 'Org in another city',
      email: 'org@org.com',
      password_hash: password_hash,
      address: 'Street real address',
      state: 'ST',
      city: 'unrelated city',
      phone: '55129999999999'
    })

    await petsRepository.create({
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

    await petsRepository.create({
      name: "dog2",
      age: "young",
      description: "desc",
      energy_level: "high",
      independence_level: "low",
      size: "big",
      Org: {
        connect: orgInCity,
      },
      created_at: new Date(),
    })

    await petsRepository.create({
      name: "dog3",
      age: "young",
      description: "desc",
      energy_level: "high",
      independence_level: "low",
      size: "big",
      Org: {
        connect: orgInCity,
      },
      created_at: new Date(),
    })

    await petsRepository.create({
      name: "Dog in another city",
      age: "young",
      description: "desc",
      energy_level: "average",
      independence_level: "low",
      size: "big",
      Org: {
        connect: orgInAnotherCity,
      },
      created_at: new Date(),
    })

    const { pets } = await getPetsUseCase.execute({ city });

    expect(pets).toHaveLength(3)

  });

  it('should be able to use all filters to list pets in a given city', async () => {
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

    const orgInAnotherCity = await orgsRepository.create({
      name: 'Org in another city',
      email: 'org@org.com',
      password_hash: password_hash,
      address: 'Street real address',
      state: 'ST',
      city: 'unrelated city',
      phone: '55129999999999'
    })

    const filters: PetFilters = {
      age: "young",
      energy_level: "low",
      independence_level: "high",
      size: "average"
    }

    await petsRepository.create({
      name: "Chosen Dog",
      age: "young",
      description: "desc",
      energy_level: "low",
      independence_level: "high",
      size: "average",
      Org: {
        connect: orgInCity,
      },
      created_at: new Date(),
    })

    await petsRepository.create({
      name: "dog2",
      age: "young",
      description: "desc",
      energy_level: "high",
      independence_level: "low",
      size: "big",
      Org: {
        connect: orgInCity,
      },
      created_at: new Date(),
    })

    await petsRepository.create({
      name: "dog3",
      age: "young",
      description: "desc",
      energy_level: "high",
      independence_level: "low",
      size: "big",
      Org: {
        connect: orgInCity,
      },
      created_at: new Date(),
    })

    await petsRepository.create({
      name: "Dog in another city",
      age: "young",
      description: "desc",
      energy_level: "average",
      independence_level: "low",
      size: "big",
      Org: {
        connect: orgInAnotherCity,
      },
      created_at: new Date(),
    })

    const { pets } = await getPetsUseCase.execute({ city, filters });

    expect(pets).toHaveLength(1)
  });

  it('should be able to use some or just a single filter to list the pets in a given city', async () => {
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

    const orgInAnotherCity = await orgsRepository.create({
      name: 'Org in another city',
      email: 'org@org.com',
      password_hash: password_hash,
      address: 'Street real address',
      state: 'ST',
      city: 'unrelated city',
      phone: '55129999999999'
    })

    const filters: PetFilters = {
      age: "young",
    }

    await petsRepository.create({
      name: "Chosen Dog",
      age: "young",
      description: "desc",
      energy_level: "low",
      independence_level: "high",
      size: "average",
      Org: {
        connect: orgInCity,
      },
      created_at: new Date(),
    })

    await petsRepository.create({
      name: "Chosen Dog 2",
      age: "young",
      description: "desc",
      energy_level: "medium",
      independence_level: "average",
      size: "small",
      Org: {
        connect: orgInCity,
      },
      created_at: new Date(),
    })

    await petsRepository.create({
      name: "dog3",
      age: "old",
      description: "desc",
      energy_level: "high",
      independence_level: "low",
      size: "big",
      Org: {
        connect: orgInCity,
      },
      created_at: new Date(),
    })

    await petsRepository.create({
      name: "Dog in another city",
      age: "adult",
      description: "desc",
      energy_level: "average",
      independence_level: "low",
      size: "big",
      Org: {
        connect: orgInAnotherCity,
      },
      created_at: new Date(),
    })

    const { pets } = await getPetsUseCase.execute({ city, filters });

    expect(pets).toHaveLength(2)
  });
})

