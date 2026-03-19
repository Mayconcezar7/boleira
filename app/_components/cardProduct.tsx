import { Production } from "@/generated/prisma/client";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";
import { ShoppingCart } from "lucide-react";

interface ProductProps {
  product: Production;
}

const CardProduct = ({ product }: ProductProps) => {
  return (
    <Card className="p-1 ">
      <CardContent className="flex p-0 h-38">
        <div className="relative min-h-32 min-w-32">
          <Image
            alt={product.name}
            src={product.imageUrl}
            fill
            className="rounded-bl-xl rounded-tl-xl object-cover"
          />
        </div>

        <div className="flex flex-col justify-between p-2">
          <h2 className="text-sm font-medium text-amber-900">{product.name}</h2>
          <p className="text-xs text-amber-950">{product.description}</p>
          <div className="flex justify-between items-center">
            <p className="text-sm text-amber-950 font-medium">
              {new Intl.NumberFormat("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            }).format(Number(product.price))}
            </p>
            <Button className="bg-amber-500">
              <ShoppingCart />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardProduct;
