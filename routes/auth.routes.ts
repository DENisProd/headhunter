import {FastifyInstance} from "fastify";
import * as authController from '../controllers/auth.controller';
import {User} from "../models/dto/User";
import {revokeRefreshTokensController} from "../controllers/auth.controller";

export default async function authRoutes(fastify: FastifyInstance) {
    fastify.post<{ Body: Partial<User> }>("/register", authController.register)
    fastify.post<{ Body: Partial<User> }>("/login", authController.login)
    fastify.post("/refresh_token", authController.refreshTokenController)
    fastify.post("/revoke_refresh_tokens", authController.revokeRefreshTokensController)

}