"use client";

import React from "react";
import { Button } from "./ui/button";
import { PhoneIcon } from "lucide-react";

interface TelephoneProps {
  telephone: string;
}

const CardTelephone = ({ telephone }: TelephoneProps) => {
  function copyNumberCell() {
    return navigator.clipboard.writeText(telephone);
  }
  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex items-center gap-3">
        <PhoneIcon size={18}/>
        <p className="text-sm">{telephone}</p>
      </div>
      <Button onClick={copyNumberCell} className="bg-yellow-600 text-xs">
        Copiar
      </Button>
    </div>
  );
};

export default CardTelephone;
