"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/_components/ui/sheet";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

import { Button } from "./ui/button";
import { Avatar, AvatarImage } from "./ui/avatar";

import { Home, LogOut, Menu, Package } from "lucide-react";

import { quickSearch } from "../_constants/quickSearch";

import Cart from "./cart";
import LogInGoogle from "./logInGoogle";

import { authClient } from "../_lib/auth-client";

import { useRouter } from "next/navigation";
import Link from "next/link";

import { useCart } from "../_context/CartContext";
import { toast } from "sonner";

const Sidebar = () => {
  const { data: session } = authClient.useSession();
  const router = useRouter();

  const { cart } = useCart();

  async function handreSignOut() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
          router.refresh();
        },
      },
    });
    
    toast.success("Você foi desconectado com Sucesso!" ,{
        className: "!bg-green-900 !text-white !text-base"
      })
  }

  return (
    <Sheet >
      <SheetTrigger asChild>
        <Button className="border-amber-50 bg-amber-950" >
          <Menu />
        </Button>
      </SheetTrigger>

      <SheetContent className="overflow-y-auto border-amber-950 bg-amber-950 text-white">
        <SheetHeader>
          <SheetTitle className="text-white">Menu</SheetTitle>
        </SheetHeader>
        {session ? (
          <div className="flex items-center gap-4 border-b border-b-orange-900 px-5 pb-5">
            <Avatar className="h-10 w-10">
              <AvatarImage src={`${session.user.image}`} />
            </Avatar>
            <div className="w-full">
              <h2 className="w-[90%] truncate text-base font-bold">
                {session.user.name}
              </h2>
              <p className="w-[90%] truncate text-xs">{session.user.email}</p>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between border-b border-b-orange-900 px-5 pb-5">
            <h2 className="text-base font-bold">Olá. Faça seu login!</h2>
            <LogInGoogle />
          </div>
        )}

        <div className="w-full border-b border-b-orange-900 px-3 pb-5">
          <SheetClose className="h-10 w-full">
            <Button
              asChild
              className="flex w-full items-center justify-start rounded-none"
              variant="ghost"
            >
              <Link href="/">
                <Home /> Início
              </Link>
            </Button>
          </SheetClose>

          <SheetClose asChild>
            <Cart />
          </SheetClose>

          {session && (
            <SheetClose className="w-full">
              <Button
                asChild
                className="flex w-full items-center justify-start rounded-none"
                variant="ghost"
              >
                <Link href="/orders">
                  <Package /> Histórico de Encomendas
                </Link>
              </Button>
            </SheetClose>
          )}
        </div>
        <div className="w-full border-b border-b-orange-900 px-3 pb-5">
          <h2 className="mb-3 text-xs uppercase">Pesquisa rapida</h2>
          {quickSearch.map((option) => (
            <SheetClose className="h-10 w-full" key={option.name}>
              <Button
                asChild
                className="flex w-full items-center justify-start rounded-none text-amber-500"
                variant="ghost"
              >
                <Link href={`/products?category=${option.name}`}>
                  {option.name}
                </Link>
              </Button>
            </SheetClose>
          ))}
        </div>
        <div className="mt-4 w-full px-5">
         
            {session && (
              <Dialog>
                <DialogTrigger className="w-full" asChild>
                  <Button className="rounded-sx w-full border-amber-50 bg-transparent" >
                    <LogOut />
                    sair
                  </Button>
                </DialogTrigger>
                <DialogContent className="w-[90%] bg-amber-900 text-white">
                  <DialogHeader>
                    <DialogTitle className="text-center">Sair</DialogTitle>
                  </DialogHeader>
                  <DialogDescription className="text-center font-normal text-white">
                    Deseja mesmo sair da plataforma?
                  </DialogDescription>

                  <DialogFooter className="flex flex-row items-center justify-center border-none bg-amber-900">
                    <DialogClose asChild>
                      <Button className="w-[50%] bg-transparent">
                        Cancelar
                      </Button>
                    </DialogClose>
                    <DialogClose asChild>
                      <Button
                        className="w-[50%] bg-amber-950"
                        onClick={handreSignOut}
                      >
                        Sair
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
        
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Sidebar;
