import { describe, expect, it, beforeEach } from 'vitest';
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository';
import bcryptjs from 'bcryptjs';
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository';
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
      age: 2,
      description: "desc",
      energy_level: 3,
      independence_level: "low",
      size: "big",
      Org: {
        connect: orgInCity,
      },
      created_at: new Date(),
    })

    await petsRepository.create({
      name: "dog2",
      age: 2,
      description: "desc",
      energy_level: 3,
      independence_level: "low",
      size: "big",
      Org: {
        connect: orgInCity,
      },
      created_at: new Date(),
    })

    await petsRepository.create({
      name: "dog3",
      age: 2,
      description: "desc",
      energy_level: 3,
      independence_level: "low",
      size: "big",
      Org: {
        connect: orgInCity,
      },
      created_at: new Date(),
    })

    await petsRepository.create({
      name: "Dog in another city",
      age: 2,
      description: "desc",
      energy_level: 3,
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

})

