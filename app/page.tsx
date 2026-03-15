
import Image from "next/image";
import { getCategories } from "./_actions/get-categories";
import Header from "./_components/header";
import PanelWelcomeUser from "./_components/panelWelcomeUser";
import Search from "./_components/search";
import Banner from "@/public/banner.jpg"
import Title from "./_components/title";
import CardCategory from "./_components/cardCategory";
import CardOrder from "./_components/cardOrder";



export default async function Home() {
  const categories = await getCategories()

  return (
    <>
    <Header/>

    <div className="p-6 w-full">
      <div className="mt-6">
          <PanelWelcomeUser />
      </div>

      <div className="mt-4 ">
        <Search/>
      </div>

      <div className="relative h-34 w-full mt-4">
        <Image alt="banner" src={Banner} fill className="object-cover rounded-2xl"/>
      </div>

      <div className="mt-3 w-full flex gap-4 overflow-x-scroll [&::-webkit-scrolbar]:hidden">
        <CardOrder/>
        <CardOrder/>
        <CardOrder/>
        <CardOrder/>
      </div>

      <div className="mt-5">
          <Title title="CATEGORIAS"/>

          <div className="w-full mt-1 flex gap-4 overflow-x-scroll [&::-webkit-scrolbar]:hidden ">
           {
            categories.map((category)=> (
              <CardCategory category={category} key={category.id}/>
            ))
           }
          </div>
      </div>

    </div>
    </>
  );
}
