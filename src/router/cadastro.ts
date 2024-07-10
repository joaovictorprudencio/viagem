import { FastifyInstance } from "fastify";

export function createTrip(app: FastifyInstance){
    app.post("/cadastro", async () => {
        return "ok"
    })
}