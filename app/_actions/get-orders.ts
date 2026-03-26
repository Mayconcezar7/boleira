"use server"

import { db } from "../_lib/prisma"

interface IdUserProps{
    id: string;
}

export async function getOrdersConcluited({id}:IdUserProps) {


    return await db.order.findMany({
        where:{
            userId: id,
            date:{
                lte: new Date()
            }
        },
        orderBy:{
            date: "asc"
        },
        include:{
            ordersItens: true
        }
    })
}

export async function getOrdersConfirmed({id}:IdUserProps) {


    return await db.order.findMany({
        where:{
            userId: id,
            date:{
                gte: new Date()
            }
        },
         orderBy:{
            date: "asc"
        },
        include:{
            ordersItens: true
        }
    })
}