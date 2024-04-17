import { FastifyRequest, FastifyReply, } from "fastify";

export async function verifyJWT(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    await request.jwtVerify()
  }
  catch (err) {
    return await reply.status(401).send({ message: 'Unauthorized.' });
  }
}