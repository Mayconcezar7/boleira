"use client";

import { Button } from "./ui/button";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../_context/CartContext";

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
      return alert("ja esta no seu carrinho")
      
    }else{

      setCart((prev) => [...prev, p]);
    }
  }
  return (
    <Button onClick={handleQuickCart} className="bg-amber-500">
      <ShoppingCart />
    </Button>
  );
};

export default ButtonCart;
