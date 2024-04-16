import { describe, beforeEach, it, expect } from "vitest";
import bcryptjs from "bcryptjs";

import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";

import { RegisterPetUseCase } from "./register-pet";
import { ResourceNotFoundError } from "./error/resource-not-found-error";

let orgsRepository: InMemoryOrgsRepository;
let petsRepository: InMemoryPetsRepository;

let registerPetUseCase: RegisterPetUseCase;

describe("Register new pet use case", () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository();
    petsRepository = new InMemoryPetsRepository();

    registerPetUseCase = new RegisterPetUseCase(orgsRepository, petsRepository);
  })

  it("should be able to register a new pet", async () => {

    const password_hash = await bcryptjs.hash('123456', 6);

    const org = await orgsRepository.create({
      name: 'Org',
      email: 'johndoe@example.com',
      password_hash: password_hash,
      address: 'Street real address',
      state: 'ST',
      city: 'City',
      phone: '55119999999999'
    });

    const { pet } = await registerPetUseCase.execute({
      name: "Doggo",
      age: 2,
      description: "yippee",
      energy_level: 3,
      independence_level: "high",
      size: "big",
      org,
    });

    expect(pet.id).toEqual(expect.any(String));
  })

  it("should be able to register a new pet without a description", async () => {

    const password_hash = await bcryptjs.hash('123456', 6);

    const org = await orgsRepository.create({
      name: 'Org',
      email: 'johndoe@example.com',
      password_hash: password_hash,
      address: 'Street real address',
      state: 'ST',
      city: 'City',
      phone: '55119999999999'
    });

    const { pet } = await registerPetUseCase.execute({
      name: "Doggo",
      age: 2,
      energy_level: 3,
      independence_level: "high",
      size: "big",
      org,
    });

    expect(pet.id).toEqual(expect.any(String));
  })

})