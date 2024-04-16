import { OrgAlreadyExistsError } from "@/useCases/error/org-already-exists-error";
import { makeGetOrgUseCase } from "@/useCases/factories/make-get-org-use-case";
import { FastifyReply, FastifyRequest } from "fastify";

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request;

  const getOrgUseCase = makeGetOrgUseCase();

  const org = await getOrgUseCase.execute({ id });

  return reply.status(200).send({
    org: {
      ...org,
      password_hash: undefined,
    }
  })
}