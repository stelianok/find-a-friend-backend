import fastify from "fastify";
import { env } from "./env";
import { ZodError } from "zod";
import { orgsRoutes } from "./http/controllers/org/routes";

export const app = fastify();

app.register(orgsRoutes);

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error);
  } else {
    // log to an external tool.
  }

  return reply.status(500).send({ mesage: 'Internal status error' });
})