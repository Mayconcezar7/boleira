"use client";


import { createContext, ReactNode, useState, useContext, Dispatch, SetStateAction } from "react";
import { toast } from "sonner";

export interface CartItem {
  name: string;
  price: number;
  imageUrl: string;
  id: string;
  description: string;
  categoryId: string;
  quantity: number;
}
 

interface CartContextData {
  cart: CartItem[];
  setCart: Dispatch<SetStateAction<CartItem[]>>;
  addQuantityCart:({product, typeOp}: ProductCartProps) => void;
  removeProductCart:(product: CartItem) => void;
  cartTotal:number;
}

interface ProductCartProps {
  product: CartItem;
  typeOp: string
}

export const CartContext = createContext<CartContextData | undefined>(
  undefined,
);

export default function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
 
  function addQuantityCart({product, typeOp}:ProductCartProps) {
    setCart((prev)=>
      prev.map((item)=>{
        
        if (item.id === product.id) {

          if (typeOp === "add-quantity") {
           
            return {...item, quantity: item.quantity+1}
            
          }

          if (typeOp === "remove-quantity") {

            if (item.quantity< 2) {
              return null
            }

            return{...item, quantity: item.quantity - 1}
            
          }
          
        }

        return item;
      }
    ).filter(Boolean) as CartItem[]
    
    )
  }

  function removeProductCart(product:CartItem) {
    setCart((prev)=>
      prev.filter(item => item.id !== product.id)
    )

    toast.info("Item removido do carrinho!" ,{
        className: "!bg-amber-800 !text-white !text-base",
      })
  }

 const cartTotal = cart.reduce((sum, product)=> sum+ product.price * product.quantity ,0)
 
  return (
    <CartContext.Provider value={{  cart, setCart ,addQuantityCart, removeProductCart, cartTotal}}>{children}</CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart deve ser usado dentro de um CartProvider");
  }
  return context;
};
