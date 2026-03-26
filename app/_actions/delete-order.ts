"use server"

import { db } from "../_lib/prisma"

interface IdOrderProps{
    id:string
}


export async function deleteOrder({id}:IdOrderProps) {

    await db.orderItem.deleteMany({
        where:{
            orderId: id
        }
    })

    await db.order.delete({
        where:{
            id: id
        }
        
    })
    
}