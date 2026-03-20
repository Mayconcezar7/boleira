
import { getUniqueProductForCategory } from "@/app/_actions/get-unique-product-category";
import CardProduct from "@/app/_components/cardProduct";
import Sidebar from "@/app/_components/sidebar";
import Title from "@/app/_components/title";
import { Button } from "@/app/_components/ui/button";
import { ChevronLeftIcon, Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ParamsProps {
  params: Promise<{ id: string }>;
}
const CategoryProducts = async ({ params }: ParamsProps) => {
  const { id } = await params;

  const productsForcategory = await getUniqueProductForCategory({ id });
  

  if (!productsForcategory) {
    return <></>;
  }

  return (
    <>
      <div className="relative h-62.5 w-full">
        <Image
          src={productsForcategory.imageUrl}
          fill
          alt={productsForcategory.name}
          className="object-cover"
        />
        <div className="absolute flex w-full justify-between p-4">
          <Button size="icon" className="bg-amber-950 border-amber-50" asChild>
            <Link href="/">
              <ChevronLeftIcon />
            </Link>
          </Button>

          <Button size="icon" className="bg-amber-950 p-2" asChild>
            <Sidebar/>
          </Button>
        </div>
      </div>

      <div className="px-4 pt-3">
        <div>
          <Title title="SOBRE A CATEGORIA:" />
          <p className="text-justify text-xs text-amber-950 mt-2">
            {productsForcategory.description}
          </p>
        </div>

        <div className="mt-4">
          <Title title={`SABORES DE ${productsForcategory.name.toUpperCase()}`}/>

          <div className="flex flex-col gap-3 my-5">
            {
              productsForcategory.productions.map((product)=>(
                <CardProduct product={product} key={product.id}/>
              ))
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryProducts;
