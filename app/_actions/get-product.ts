"use server"


import { db } from "../_lib/prisma";

interface NameProps{
    name?: string;
    category?: string;    
}


export const getProducts = async ({name, category}:NameProps) =>{
    return await db.production.findMany({
        where:{
            name: name? {
                contains: name,
                mode: "insensitive"
            }: undefined ,

            category: category? {
                name: {equals: category} 
            }: undefined,
            
            }  
        }
       

    )
     
}