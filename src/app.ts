import fastify from "fastify";
import { env } from "./env";
import { ZodError } from "zod";

export const app = fastify();

app.get("/", function (request, reply) {
  console.log("Les go!");
  return { hello: 'world' }
})

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