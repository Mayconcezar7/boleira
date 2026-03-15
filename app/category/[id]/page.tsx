import { getProductForCategory } from "@/app/_actions/get-product";
import { getUniqueCategory } from "@/app/_actions/get-unique-category";
import { Button } from "@/app/_components/ui/button";
import { ArrowLeft, ChevronLeftIcon, Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ParamsProps {
  params: Promise<{ id: string }>;
}
const CategoryProducts = async ({ params }: ParamsProps) => {
  const { id } = await params;

  const category = await getUniqueCategory({ id });

  if (!category) {
    return <></>;
  }

  return (
    <div className="relative">
      <div style={{ position: "relative", height: "250px", width: "100%" }}>
        <Image
          src={category.imageUrl}
          fill
          unoptimized
          alt={category.name}
          className="object-cover"
        />
        <div className="absolute  flex w-full justify-between p-4">
        <Button size="icon"  className="bg-amber-950" asChild>
          <Link href="/">
            <ChevronLeftIcon/>
          </Link>
        </Button>

        <Button size="icon" className="p-2 bg-amber-950"  asChild>
          <Menu />
        </Button>
      </div>
      </div>
    </div>
  );
};

export default CategoryProducts;
