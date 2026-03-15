import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import Image from "next/image";
import logoImg from "../../public/logo.png";

const Header = () => {
  return (
    <header className="h-20 w-full bg-amber-950">
      <div className="flex h-full w-full items-center justify-between px-6">
        <div className="relative h-13 w-13">
          <Image alt="logo" src={logoImg} fill className="object-cover" />
        </div>
        <Button className="bg-transparent border-white">
          <Menu size={20}/>
        </Button>
      </div>
    </header>
  );
};

export default Header;
