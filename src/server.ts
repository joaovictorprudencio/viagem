import fastify from "fastify";
import { createTrip } from "./router/cadastro";
import { z } from 'zod';
import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";

const app = fastify()


app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);


app.register(createTrip)


app.listen({port: 3333}).then(() => {
    
})