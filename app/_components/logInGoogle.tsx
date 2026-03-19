"use client"


import logoGoogle from "@/public/Google.svg"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { LogIn } from "lucide-react";
import Image from "next/image";
import { authClient } from "../_lib/auth-client";

const LogInGoogle = () => {

  async function handleSignInGoogle() {

   await authClient.signIn.social({
      provider: "google",
      callbackURL: "/"
    })


  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="border-white bg-transparent">
          <LogIn />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-amber-900 text-white">
        <DialogHeader>
            <DialogTitle className="text-center">Faça login na plataforma</DialogTitle>
        </DialogHeader>

        <DialogDescription className="text-white text-center font-light">Conecte-se usando sua conta do Google</DialogDescription>

        <DialogFooter className="bg-amber-900 border-none w-full my-0 mx-auto">
            <Button className=" flex items-center gap-2 bg-amber-950 w-full" onClick={handleSignInGoogle}>
                <Image src={logoGoogle} alt="logo Google"/>
                Google
            </Button>
        </DialogFooter>

      </DialogContent>
    </Dialog>
  );
};

export default LogInGoogle;
