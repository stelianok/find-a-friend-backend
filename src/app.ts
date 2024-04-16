import fastify from "fastify";
import { env } from "./env";
import { ZodError } from "zod";
import { orgsRoutes } from "./http/controllers/orgs/routes";
import fastifyCookie from "@fastify/cookie";
import fastifyJwt from "@fastify/jwt";
import { petsRoutes } from "./http/controllers/pets/routes";

export const app = fastify();

app.register(fastifyCookie);
app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '10m'
  }
})

app.register(orgsRoutes);
app.register(petsRoutes);

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