import { describe, expect, it, beforeEach } from 'vitest';
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository';
import { GetOrgUseCase } from './get-org';
import bcryptjs from 'bcryptjs';
import { ResourceNotFoundError } from './error/resource-not-found-error';

let orgsRepository: InMemoryOrgsRepository;
let getOrgUseCase: GetOrgUseCase;

describe('Get organization use case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository();
    getOrgUseCase = new GetOrgUseCase(orgsRepository);
  })

  it('should be able to get organization data', async () => {
    const password_hash = await bcryptjs.hash('123456', 6);

    const createdOrg = await orgsRepository.create({
      name: 'Org',
      email: 'johndoe@example.com',
      password_hash: password_hash,
      address: 'Street real address',
      state: 'ST',
      city: 'City',
      phone: '55119999999999'
    })

    const { org } = await getOrgUseCase.execute({
      id: createdOrg.id,
    });

    expect(org.id).toEqual(expect.any((String)));
    expect(org.name).toEqual('Org');
  });

  it('should not be able to get organization data with wrong id', async () => {
    await expect(() =>
      getOrgUseCase.execute({
        id: 'invalid-id',
      })).rejects.toBeInstanceOf(ResourceNotFoundError);
  })
})

