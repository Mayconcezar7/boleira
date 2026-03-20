"use client"

import { Production } from "@/generated/prisma/browser";
import { createContext, ReactNode, useState, useContext } from "react";

export interface CartItem {
 name: string;
    price: number;
    imageUrl: string;
    id: string;
    description: string;
    categoryId: string;
     
}

interface CartContextData{
    addCart: (product: any) => void;
}

export const CartContext = createContext<CartContextData | undefined>(undefined)


export default function CartProvider({children}:{children:ReactNode}) {


    const [cart , setCart] = useState<Production[]>([])


    function addCart(product:Production) {

        setCart(prev=> [...prev , product])
        
    }

    console.log(cart);
    

    return(

        <CartContext.Provider value={{addCart}}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => {
  const context = useContext(CartContext);
  
  // Se o contexto for undefined, significa que você esqueceu o <CartProvider> no layout
  if (!context) {
    throw new Error("useCart deve ser usado dentro de um CartProvider");
  }
  
  return context;
};