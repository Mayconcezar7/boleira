"use client";

import { Button } from "./ui/button";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../_context/CartContext";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface ProductProps {
  product: {
    name: string;
    id: string;
    description: string;
    imageUrl: string;
    price: number;
    categoryId: string;
  };
}

const ButtonCart = ({ product }: ProductProps) => {
  const { setCart ,cart } = useCart();
  const router = useRouter()

  const p = {
   name: product.name,
    id: product.id,
    description: product.description,
    imageUrl: product.imageUrl,
    price: product.price,
    categoryId: product.categoryId,
    quantity: 1
  }

  function handleQuickCart() {
    const existProductCart = cart.find(item => item.id === p.id)

    if (existProductCart) {
      return toast.info("Este item já está no seu carrinho!" ,{
        className: "!bg-amber-800 !text-white !text-base"
      })
      
    }else{

      setCart((prev) => [...prev, p]);

      toast.success("Item adicionado ao carrinho!" ,{
        className: "!bg-green-900 !text-white !text-base" 
      })
    }
  }
  return (
    <Button onClick={handleQuickCart} className="bg-amber-500">
      <ShoppingCart />
    </Button>
  );
};

export default ButtonCart;
