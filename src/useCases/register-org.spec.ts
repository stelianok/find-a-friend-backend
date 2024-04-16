import { describe, expect, it, beforeEach } from 'vitest';
import { compare } from 'bcryptjs';
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository';
import { RegisterOrgUseCase } from './register-org';
import { OrgAlreadyExistsError } from './error/org-already-exists-error';

let orgsRepository: InMemoryOrgsRepository;
let registerOrgUseCase: RegisterOrgUseCase;

describe('Register organization use case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository();
    registerOrgUseCase = new RegisterOrgUseCase(orgsRepository);
  })

  it('should be able to register a new organization', async () => {
    const { org } = await registerOrgUseCase.execute({
      name: 'Org',
      email: 'johndoe@example.com',
      password: '123456',
      address: 'Street real address',
      state: 'ST',
      city: 'City',
      phone: '55119999999999'
    })

    expect(org.id).toEqual(expect.any(String));
  })

  it('should hash organization password upon registration', async () => {
    const { org } = await registerOrgUseCase.execute({
      name: 'Org',
      email: 'johndoe@example.com',
      password: '123456',
      address: 'Street real address',
      state: 'ST',
      city: 'City',
      phone: '55119999999999'
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      org.password_hash
    )

    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it('should not be able to register with same email twice', async () => {
    const email = 'johndoe@example.com';

    await registerOrgUseCase.execute({
      name: 'Org',
      email: email,
      password: '123456',
      address: 'Street real address',
      state: 'ST',
      city: 'City',
      phone: '55119999999999'
    })

    await expect(() =>
      registerOrgUseCase.execute({
        name: 'Org',
        email: email,
        password: '123456',
        address: 'Street real address',
        state: 'ST',
        city: 'City',
        phone: '55119999999999'
      }),
    ).rejects.toBeInstanceOf(OrgAlreadyExistsError)

  })

  it('should not be able to register with same phone twice', async () => {
    const phone = '55119999999999';

    await registerOrgUseCase.execute({
      name: 'Org',
      email: 'johndoe@example.com',
      password: '123456',
      address: 'Street real address',
      state: 'ST',
      city: 'City',
      phone: phone
    })

    await expect(() =>
      registerOrgUseCase.execute({
        name: 'Org',
        email: 'johndoe@example.com',
        password: '123456',
        address: 'Street real address',
        state: 'ST',
        city: 'City',
        phone: phone
      })
    ).rejects.toBeInstanceOf(OrgAlreadyExistsError)

  })
})

