import { FastifyInstance } from 'fastify'
import { registerPet } from './registerPet'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { listPets } from './listPets'
import { listPetDetails } from './listPetDetails'

export async function petsRoutes(app: FastifyInstance) {
  app.get('/pets', listPets)
  app.get('/pets/:petId', listPetDetails)
  /** TS typing edge case that i couldn't solve.
   * I'd probably be fixed if I used the same custom interface in the authentication middleware
   * But that would just cause other problems since the middleware will be used in other routes aswell.
   * It's annoying, but nothing that I tried until now worked. :(
   */
  app.post('/:orgId/pets', { onRequest: [verifyJWT] }, registerPet)
}
