import { FastifyInstance } from "fastify";
import { registerPet } from "./registerPet";
import { verifyJWT } from "@/http/middlewares/verify-jwt";

export async function petsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT);

  app.post('/:orgId/pets', registerPet);

}