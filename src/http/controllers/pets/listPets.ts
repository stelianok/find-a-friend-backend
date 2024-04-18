import { PetFilters } from "@/repositories/pets-repository";
import { UndefinedCityQueryParamError } from "@/useCases/error/undefined-city-query-param-error";
import { makeGetPetsUseCase } from "@/useCases/factories/make-get-pets-use-case";
import { FastifyReply, FastifyRequest } from "fastify";

interface PetQueryParams {
  city?: string;
  age?: string;
  energy_level?: string;
  size?: string;
  independence_level?: string;
}

export async function listPets(request: FastifyRequest<{ Querystring: PetQueryParams }>, reply: FastifyReply) {
  const { city, age, energy_level, size, independence_level } = request.query;

  try {
    const getPetsUseCase = makeGetPetsUseCase();

    if (!city) {
      throw new UndefinedCityQueryParamError();
    }

    let filters: PetFilters = {};

    filters = Object.assign(filters, { age, energy_level, size, independence_level });

    const pets = await getPetsUseCase.execute({ city, filters });

    return pets;
  }
  catch (err) {
    if (err instanceof UndefinedCityQueryParamError) {
      return await reply.status(400).send({ message: err.message });
    }
    console.error(err);
    return await reply.status(500).send({ message: err });
  }
}