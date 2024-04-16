import { FastifyInstance } from "fastify";
import { register } from "./register";
import { profile } from "./profile";

export async function orgsRoutes(app: FastifyInstance) {
  app.post('/orgs', register);
  app.get('/orgs', profile);

}