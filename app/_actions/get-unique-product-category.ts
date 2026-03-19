
"use server"

import { db } from "../_lib/prisma";

interface IdProps{
    id: string;
}


export const getUniqueProductForCategory = async ({id}:IdProps) =>{
    return await db.category.findUnique({
        where:{
            id,
            
        }, include:{
            productions: true 
        }
        
    
    })
}