import { UndefinedCityQueryParamError } from "@/useCases/error/undefined-city-query-param-error";
import { makeGetPetsUseCase } from "@/useCases/factories/make-get-pets-use-case";
import { FastifyReply, FastifyRequest } from "fastify";

interface PetQueryParams {
  city?: string;
}

export async function listPets(request: FastifyRequest<{ Querystring: PetQueryParams }>, reply: FastifyReply) {
  const { city } = request.query;

  try {
    const getPetsUseCase = makeGetPetsUseCase();

    if (!city) {
      throw new UndefinedCityQueryParamError();
    }

    const pets = getPetsUseCase.execute({ city });

    return pets;
  }
  catch (err) {
    if (err instanceof UndefinedCityQueryParamError) {
      return reply.status(400).send({ message: err.message });
    }
    console.error(err);
    return reply.status(500).send({ message: err });
  }
}