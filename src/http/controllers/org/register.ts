import { OrgAlreadyExistsError } from "@/useCases/error/org-already-exists-error";
import { makeRegisterOrgUseCase } from "@/useCases/factories/make-register-org-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    address: z.string().max(800),
    state: z.string().max(2).min(2),
    city: z.string().max(50),
    phone: z.string().max(11),
  })

  const { name, email, password, address, state, city, phone } = registerBodySchema.parse(request.body);

  try {
    const registerUseCase = makeRegisterOrgUseCase();

    await registerUseCase.execute({
      name,
      email,
      password,
      address,
      state,
      city,
      phone,
    });
  } catch (err) {
    if (err instanceof OrgAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }
    throw err;
  }
  return reply.status(201).send()
}