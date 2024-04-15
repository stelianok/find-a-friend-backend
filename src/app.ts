import fastify from "fastify";
import { env } from "./env";

export const app = fastify();

app.get("/", function (request, reply) {
  console.log("Les go!");
  return { hello: 'world' }
})