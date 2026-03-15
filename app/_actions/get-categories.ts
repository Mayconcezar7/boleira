"use server"

import { db } from "../_lib/prisma"



export const getCategories =  async ()=>{
  return  await db.category.findMany({})

}