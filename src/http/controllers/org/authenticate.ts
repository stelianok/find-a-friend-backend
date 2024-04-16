import { InvalidCredentialsError } from "@/useCases/error/invalid-credentials-error";
import { makeAuthenticateUseCase } from "@/useCases/factories/make-authenticate-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { email, password } = registerBodySchema.parse(request.body);

  try {
    const authenticateUseCase = makeAuthenticateUseCase();

    const { org } = await authenticateUseCase.execute({
      email,
      password,
    });


    const token = await reply.jwtSign(
      {
        name: org.name,
      },
      {
        sign: {
          sub: org.id
        }
      })

    const refreshToken = await reply.jwtSign(
      {
        name: org.name,
      },
      {
        sign: {
          sub: org.id,
          expiresIn: '7d'
        }
      })

    return reply
      .setCookie('refreshToken', refreshToken, {
        path: '/',
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .status(200)
      .send({ token })

  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: err.message });
    }
    throw err;
  }
}