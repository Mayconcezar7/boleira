"use server"

import { db } from "../_lib/prisma";

interface IdProps{
    id: string;
}


export const getProductForCategory = async ({id}:IdProps) =>{
    return await db.production.findMany({
        where:{
            categoryId: id,
        }
    
    })
     
}