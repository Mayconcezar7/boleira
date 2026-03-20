import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import Image from "next/image";
import logoImg from "../../public/logo.png";
import Sidebar from "./sidebar";
import Link from "next/link";

const Header = () => {
  return (
    <header className="h-20 w-full bg-amber-950">
      <div className="flex h-full w-full items-center justify-between px-6">
        <div className="relative h-13 w-13">
          <Link href="/">
            <Image alt="logo" src={logoImg} fill className="object-cover" />
          </Link>
        </div>
        <Button className="border-white bg-transparent" asChild>
          <Sidebar />
        </Button>
      </div>
    </header>
  );
};

export default Header;
