import { makeRegisterPetUseCase } from "@/useCases/factories/make-register-pet-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

type OrgParams = FastifyRequest<{ Params: { orgId: string } }>;

export async function registerPet(request: OrgParams, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string().max(256),
    description: z.string().max(800),
    age: z.string(),
    energy_level: z.string(),
    size: z.string().max(500),
    independence_level: z.string().max(120),
  })

  const { name, description, age, energy_level, size, independence_level } = registerBodySchema.parse(request.body);

  const org_id = request.params.orgId;

  try {
    const registerPetUseCase = makeRegisterPetUseCase();

    await registerPetUseCase.execute({
      name,
      description,
      age,
      energy_level,
      size,
      independence_level,
      org_id,
    })
  }
  catch (err) {
    return reply.status(500).send({ message: err });
  }

  return reply.status(201).send();
}