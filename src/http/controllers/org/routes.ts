import { FastifyInstance } from "fastify";
import { register } from "./register";
import { profile } from "./profile";
import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { authenticate } from "./authenticate";
import { refresh } from "./refresh";

export async function orgsRoutes(app: FastifyInstance) {
  app.post('/orgs', register);
  app.post('/sessions', authenticate);

  app.patch('/token/refresh', refresh);
  /** Authenticated */
  app.post('/me', { onRequest: [verifyJWT] }, profile);

}