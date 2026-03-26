import { Prisma } from "@/generated/prisma/client";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { format, isPast } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

import CardProductOrder from "./cardProductOrder";
import CardDetailsBuy from "./cardDetailsBuy";
import { telephones } from "../_constants/telephone";
import CardTelephone from "./cardTelephone";
import { Button } from "./ui/button";
import CancelOrder from "./cancelOrder";

interface OrderProps {
  order: Prisma.OrderGetPayload<{
    include: {
      ordersItens: true;
    };
  }>;
}

const CardOrder = ({ order }: OrderProps) => {
  const products = order.ordersItens;

  const isPastOrder = isPast(order.date);

  return (
    <Sheet>
      <SheetTrigger className="min-w-full">
        <Card className="w-full p-0">
          <CardContent className="flex justify-between p-0">
            <div className="flex flex-col justify-center gap-2.5 p-3">
              <Badge
                className={
                  isPastOrder ? `bg-amber-900 p-2.5` : `bg-yellow-600 p-2.5`
                }
              >
                {isPastOrder ? "Concluído" : "Encomendado"}
              </Badge>
              <h2 className="w-[95%] truncate text-xl font-medium text-amber-950 capitalize">
                {order.nameOrder}
              </h2>
            </div>

            <div className="flex flex-col items-center justify-center border-l border-solid bg-amber-950 p-3">
              <p className="font-normal text-white capitalize">
                {format(order.date, "MMMM", { locale: ptBR })}
              </p>
              <p className="text-xl font-normal text-white">
                {format(order.date, "d", { locale: ptBR })}
              </p>
              <p className="font-normal text-white">
                {format(order.date, "HH:mm", { locale: ptBR })}
              </p>
            </div>
          </CardContent>
        </Card>
      </SheetTrigger>

      <SheetContent className="min-w-[85%] overflow-y-scroll border-amber-950 bg-amber-950 text-white [&::-webkit-scrolbar]:hidden">
        <SheetHeader className="border-b border-b-orange-900">
          <SheetTitle className="text-white">Detalhe da encomenda</SheetTitle>
        </SheetHeader>

        <div className="px-4">
          <h2 className="text-lg font-medium">Produtos</h2>
        </div>

        <div className="border-b border-b-orange-900 pb-6">
          <div
            className={
              products.length > 1
                ? `mt-1 flex h-50 w-full flex-col gap-4 overflow-y-scroll px-4 [&::-webkit-scrolbar]:hidden`
                : `mt-1 px-4`
            }
          >
            {products.map((product) => (
              <CardProductOrder
                product={{ ...product, price: Number(product.price) }}
                key={product.id}
              />
            ))}
          </div>
        </div>

        <div className="px-4">
          <CardDetailsBuy
            selectedTime={format(order.date, "HH:mm")}
            selectedDay={order.date}
            cartTotal={Number(order.total)}
          />
        </div>

        <div className="mt-4 px-4">
          <h2 className="text-lg capitalize">telefone</h2>

          <div className="mt-4 flex flex-col gap-4">
            {telephones.map((tel) => (
              <CardTelephone telephone={tel} key={tel} />
            ))}
          </div>
        </div>

        <div className="my-5 flex w-full items-center justify-center gap-[4%] px-4">
          <SheetClose asChild>
            <Button className={ isPastOrder? `min-w-[100%] rounded-[8px] border-white bg-transparent`:`min-w-[48%] rounded-[8px] border-white bg-transparent`}>
              Voltar
            </Button>
          </SheetClose>

          {!isPastOrder && <CancelOrder id={order.id} />}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CardOrder;
