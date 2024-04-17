import { FastifyInstance } from "fastify";
import { registerPet } from "./registerPet";
import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { listPets } from "./listPets";

export async function petsRoutes(app: FastifyInstance) {

  app.get('/pets', listPets);
  app.post('/:orgId/pets', { onRequest: [verifyJWT] }, registerPet);

}