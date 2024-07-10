import fastify from "fastify";
import { createTrip } from "./router/cadastro";
import {z} from 'zod'

const app = fastify()
app.register(createTrip)
app.listen({port: 3333}).then(() => {
    
})