
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../lib/prisma";
import dayjs from 'dayjs'
import nodemailer from 'nodemailer'
import { getEmail } from "../lib/mail";
export async function createTrip(app: FastifyInstance){

    app.withTypeProvider<ZodTypeProvider>().post("/cadastro", {
        schema: {
            body: z.object({
                destination: z.string().min(4),
                starts_at: z.coerce.date(),
                ends_at: z.coerce.date(),
                owner_name: z.string(),
                owner_email: z.string().email(),
            })
        },
    }, async (request) => {
        const {destination, starts_at, ends_at, owner_name, owner_email } = request.body

         if(dayjs(starts_at).isBefore(new Date())){
            throw new Error("data invalida"); 
         }

      if(dayjs(ends_at).isBefore(starts_at)){
         throw new Error("data invalida"); 
      }

         

         const trip = await prisma.trip.create({
            data: {
                destination,
                starts_at,
                ends_at,
                participantes:{
                    create: {
                        name: owner_name,
                        email: owner_email, 
                    }
                }
            }
         })

      
        
         const mail = await getEmail()

        const mensagem = await mail.sendMail({
            from: {
                name: "equipe plann",
                address : "oi@gmail.com"
            },
            to: {
            name : owner_name ,
            address: owner_email
            },
            subject: "testando envio de email",
            html: `<p>testando envio de email</p>`
         })

         console.log(nodemailer.getTestMessageUrl(mensagem))

        return {tripId: trip.id}
        
    });
}