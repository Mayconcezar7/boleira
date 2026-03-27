"use client";
import { Button } from "./ui/button";
import Image from "next/image";
import logoGoogle from "@/public/Google.svg"
import { authClient } from "../_lib/auth-client";
import { toast } from "sonner";

const ConnectGooogle = () => {
    async function handleSignInGoogle() {
      try{

        await authClient.signIn.social({
           provider: "google",
           callbackURL: "/"
          })

         

      }catch(error){
          toast.error("Erro ao Efeituar o Login!")
      }
    
    
    
      }

  return (
    <Button
      className="flex w-full items-center gap-2 bg-amber-900"
      onClick={handleSignInGoogle}
    >
      <Image src={logoGoogle} alt="logo Google" />
      Google
    </Button>
  );
};

export default ConnectGooogle;
