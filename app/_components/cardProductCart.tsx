"use client";

import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { formatPrice } from "../_lib/format-price";
import { Button } from "./ui/button";
import { Delete, MinusIcon, PlusIcon, TrashIcon } from "lucide-react";
import { useCart } from "../_context/CartContext";

interface ProductsProps {
  product: {
    name: string;
    price: number;
    imageUrl: string;
    id: string;
    description: string;
    categoryId: string;
    quantity: number;
  };
}

const CardProductCart = ({ product }: ProductsProps) => {17

  const { addQuantityCart, removeProductCart } = useCart();

  return (
    <Card className="min-w-full min-h-20 p-0">
      <CardContent className="flex p-0 relative">
        <Button className="absolute top-1 right-1 max-w-3 max-h-3 p-3 rounded-[12px] bg-yellow-600" onClick={()=> removeProductCart(product)}>
          <Delete/>
        </Button>
        <div className="relative h-20 w-20">
          <Image src={product.imageUrl} alt={product.name} fill />
        </div>
        <div className="flex w-[70%] flex-col items-center">
          <h2 className="text-center font-semibold text-amber-900 my-2 truncate w-[75%]">{product.name}</h2>
          <div className="flex items-center justify-evenly pl-2 w-full">
            <p className="font-medium text-amber-950">{formatPrice(product.price * product.quantity)}</p>
            <div className="flex items-center gap-3">
              <div>
                <Button
                  className="flex max-h-2 max-w-2 items-center bg-transparent p-2 text-amber-950"
                  onClick={() =>
                    addQuantityCart({ product, typeOp: "remove-quantity" })
                  }
                >
                  {product.quantity == 1 ? <TrashIcon /> : <MinusIcon />}
                </Button>
              </div>
              <div>
                <p className="text-base">{product.quantity}</p>
              </div>

              <div>
                <Button
                  className="flex max-h-2 max-w-3 items-center bg-transparent p-2 text-amber-950"
                  onClick={() =>
                    addQuantityCart({ product, typeOp: "add-quantity" })
                  }
                >
                  <PlusIcon size={4} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardProductCart;
