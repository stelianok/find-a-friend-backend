import { FastifyReply, FastifyRequest } from "fastify";

import { UndefinedCityQueryParamError } from "@/useCases/error/undefined-city-query-param-error";
import { makeListPetDetailsUseCase } from "@/useCases/factories/make-list-pet-details-use-case";
import { ResourceNotFoundError } from "@/useCases/error/resource-not-found-error";

interface PetQueryParams {
  petId: string;
}

export async function listPetDetails(request: FastifyRequest<{ Params: PetQueryParams }>, reply: FastifyReply) {
  const { petId } = request.params;

  try {
    const listPetDetailsUseCase = makeListPetDetailsUseCase();

    const pet = await listPetDetailsUseCase.execute({ id: petId });

    return pet;
  }
  catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return await reply.status(404).send({ message: err.message });
    }
    console.error(err);
    return await reply.status(500).send({ message: err });
  }
}