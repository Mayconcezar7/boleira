"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { deleteOrder } from "../_actions/delete-order";
import { useRouter } from "next/navigation";

interface IdOrderProps {
  id: string;
}

const CancelOrder = ({ id }: IdOrderProps) => {
  const router = useRouter();

  async function handlerCancelOrder() {
    try {
      await deleteOrder({ id });

      alert("certo");
      router.refresh()
      
    } catch (error) {
      console.log(error);
      alert("error")
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="min-w-[48%] bg-amber-900">Cancelar</Button>
      </DialogTrigger>

      <DialogContent className="w-[90%] bg-amber-950 text-white">
        <DialogHeader>
          <DialogTitle className="text-center text-white">
            Cancelar Encomenda
          </DialogTitle>
        </DialogHeader>

        <DialogDescription className="text-center text-white opacity-80">
          Tem certeza que deseja cancelar esse agendamento?
        </DialogDescription>

        <div className="flex w-full items-center justify-center gap-2">
          <DialogClose asChild>
            <Button className="w-[50%] border-white bg-transparent">
              Voltar
            </Button>
          </DialogClose>

          <Button className="w-[50%] bg-amber-600" onClick={handlerCancelOrder}>
            Confirmar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CancelOrder;
