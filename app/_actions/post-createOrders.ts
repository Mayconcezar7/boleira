"use server"
import { headers } from "next/headers";
import { auth } from "../_lib/auth";
import { db } from "../_lib/prisma";

interface ProductCart {
  name: string;
  price: number;
  imageUrl: string;
  id: string;
  description: string;
  categoryId: string;
  quantity: number;
}
interface InformationOrdersProps {
  cart: ProductCart[];
  cartTotal: number;
  observation?: string;
  deliveryDay:Date;
  nameOrder: string

}

export async function postCreateOders({ cart, cartTotal, observation, deliveryDay,nameOrder }: InformationOrdersProps) {
  const session = await auth.api.getSession({
    headers: Object.fromEntries((await headers()).entries()),
  });

  if (!session) {
    return;
  }

  await db.order.create({
    
    data: {
      userId: session.user.id,
      date: deliveryDay,
      total: cartTotal,
      observation: observation,
      nameOrder: nameOrder,
      ordersItens: {
        create: cart.map((product) => ({
            productionId: product.id,
            quantity: product.quantity,
            price: product.price,
            imageUrl:product.imageUrl,
            name: product.name
          })),
      },
    },
  });
}
