"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Button } from "./ui/button";
import { ShoppingBag, ShoppingCartIcon } from "lucide-react";
import { useCart } from "../_context/CartContext";
import CardProductCart from "./cardProductCart";
import { Calendar } from "./ui/calendar";
import { useState } from "react";
import { ptBR } from "date-fns/locale";
import { deliveryHours } from "../_constants/deliveryHours";
import CardDetailsBuy from "./cardDetailsBuy";
import { authClient } from "../_lib/auth-client";
import ConnectGooogle from "./connectGooogle";
import { addDays, set } from "date-fns";
import { Textarea } from "./ui/textarea";
import { postCreateOders } from "../_actions/post-createOrders";
import { Input } from "./ui/input";
import { redirect, useRouter } from "next/navigation";
import { toast } from "sonner";

const Cart = () => {
  const router = useRouter()
  const { cart, setCart, cartTotal } = useCart();

  const { data: session } = authClient.useSession();

  const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | undefined>(
    undefined,
  );
  const [observation, setObservation] = useState<string | undefined>(undefined);
  const [nameOrder, setNameOrder] = useState<string | undefined>(undefined);

  function handlerTime(time: string | undefined) {
    setSelectedTime(time);
  }
  function handlerDay(date: Date | undefined) {
    setSelectedDay(date);
  }

  async function handlerCreateOrder() {
    try {
      if (!session || !selectedDay || !selectedTime || !nameOrder) {
        return;
      }

      const hour = Number(selectedTime.split(":")[0]);
      const minutes = Number(selectedTime.split(":")[1]);
      const deliveryDay = set(selectedDay, {
        hours: hour,
        minutes: minutes,
      });

      await postCreateOders({
        cart,
        cartTotal,
        observation,
        deliveryDay,
        nameOrder,
      });

      setCart([]);

      router.push("/orders")

      toast.success("Pedido realizado com sucesso!" ,{
        className: "!bg-green-900 !text-white !text-base",
      })
    } catch (error) {
      console.log(error, "esse foi o erro");
    }
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="bg-transparent">
          <ShoppingBag />
          Carrinho
        </Button>
      </SheetTrigger>

      <SheetContent className="min-w-[90%] overflow-y-auto border-amber-950 bg-amber-950 text-white">
        <SheetHeader className="border-b border-amber-900">
          <SheetTitle className="flex items-center gap-2 text-white uppercase">
            Carrinho <ShoppingCartIcon size={20} />
          </SheetTitle>
        </SheetHeader>
        {cart.length === 0 ? (
          <div className="flex h-full w-full items-center justify-center">
            <h2 className="text-lg">O seu carrinho está vazio.</h2>
          </div>
        ) : (
          <>
            <div
              className={
                cart.length === 1
                  ? `flex flex-col gap-2 border-b border-amber-900 px-4 pb-5`
                  : `flex min-h-50 flex-col gap-2 overflow-y-auto border-b border-amber-900 px-4 pb-5 [&::-webkit-scrolbar]:hidden`
              }
            >
              {cart.map((product) => (
                <CardProductCart product={product} key={product.id} />
              ))}
            </div>

            <div className="flex w-full flex-col items-center justify-center px-10">
              <h2 className="my-4 px-2 text-base font-medium text-wrap uppercase">
                Data e hora da retirada / entrega
              </h2>
              <Calendar
                mode="single"
                className="min-w-[95%] bg-transparent capitalize"
                locale={ptBR}
                onSelect={handlerDay}
                selected={selectedDay}
                disabled={{ before: addDays(new Date(), 1) }}
              />
            </div>

            {selectedDay && (
              <div className="flex min-h-14 items-center gap-4 overflow-x-auto border-y border-amber-900 px-4 py-2 [&::-webkit-scrolbar]:hidden">
                {deliveryHours.map((time) => (
                  <Button
                    key={time}
                    className={
                      selectedTime === time ? `bg-amber-700` : `bg-yellow-600`
                    }
                    onClick={() => handlerTime(time)}
                  >
                    {time}
                  </Button>
                ))}
              </div>
            )}

            {selectedDay && selectedTime && (
              <>
                <div className="flex items-center justify-center">
                  <CardDetailsBuy
                    selectedTime={selectedTime}
                    selectedDay={selectedDay}
                    cartTotal={cartTotal}
                  />
                </div>

                <div className="px-4">
                  <h2 className="my-2 text-base">Observação (Opcional)</h2>
                  <Textarea
                    placeholder="Algum detalhe que precisamos saber?"
                    className="border-white text-sm placeholder:text-sm placeholder:text-white placeholder:opacity-60"
                    value={observation}
                    onChange={(e) => setObservation(e.target.value)}
                  />
                </div>

                <div className="px-4">
                  <h2 className="my-2 text-base">Nome da Encomenda</h2>
                  <Input
                    placeholder="Ex: Bolo de Aniversário"
                    className="border-white text-sm placeholder:text-sm placeholder:text-white placeholder:opacity-60"
                    onChange={(e) => setNameOrder(e.target.value)}
                  />
                </div>

                <div className="my-4 w-full px-4">
                  <div>
                    {session ? (
                      <SheetClose asChild>
                        <Button
                          className="w-full rounded-[8px] bg-amber-800"
                          onClick={handlerCreateOrder}
                        >
                          Finalizar Pedido
                        </Button>
                      </SheetClose>
                    ) : (
                      <ConnectGooogle />
                    )}
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
