"use client"


import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { LogIn } from "lucide-react";
import ConnectGooogle from "./connectGooogle";

const LogInGoogle = () => {

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="border-white bg-transparent">
          <LogIn />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-amber-700 text-white">
        <DialogHeader>
            <DialogTitle className="text-center">Faça login na plataforma</DialogTitle>
        </DialogHeader>

        <DialogDescription className="text-white text-center font-light">Conecte-se usando sua conta do Google</DialogDescription>

        <DialogFooter className="bg-amber-700 border-none w-full my-0 mx-auto">
            <ConnectGooogle/>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LogInGoogle;
