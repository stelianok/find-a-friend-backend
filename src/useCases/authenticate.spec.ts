import { describe, expect, it, beforeEach } from 'vitest';
import bcryptjs from 'bcryptjs';

import { AuthenticateUseCase } from './authenticate';
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository';
import { InvalidCredentialsError } from './error/invalid-credentials-error';


let orgsRepository: InMemoryOrgsRepository;
let authenticateUseCase: AuthenticateUseCase;

describe('Authenticate use case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository();
    authenticateUseCase = new AuthenticateUseCase(orgsRepository);
  })

  it('should be able to authenticate', async () => {
    const password_hash = await bcryptjs.hash('123456', 6);

    await orgsRepository.create({
      name: 'Org',
      email: 'johndoe@example.com',
      password_hash: password_hash,
      address: 'Street real address',
      state: 'ST',
      city: 'City',
      phone: '55119999999999'
    });

    const { org } = await authenticateUseCase.execute({
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(org.id).toEqual(expect.any(String));
  })

  it('should not be able to authenticate with wrong email', async () => {
    await expect(() => authenticateUseCase.execute({
      email: 'johndoe@wrong.com',
      password: '123456',
    })).rejects.toBeInstanceOf(InvalidCredentialsError);
  })

  it('should not be able to authenticate with wrong password', async () => {
    const password_hash = await bcryptjs.hash('123456', 6);

    await orgsRepository.create({
      name: 'Org',
      email: 'johndoe@example.com',
      password_hash: password_hash,
      address: 'Street real address',
      state: 'ST',
      city: 'City',
      phone: '55119999999999'
    });

    await expect(() => authenticateUseCase.execute({
      email: 'johndoe@example.com',
      password: 'wrongpassword',
    })).rejects.toBeInstanceOf(InvalidCredentialsError);
  })
})