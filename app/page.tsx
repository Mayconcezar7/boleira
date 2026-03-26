import Image from "next/image";
import { getCategories } from "./_actions/get-categories";
import Header from "./_components/header";
import PanelWelcomeUser from "./_components/panelWelcomeUser";
import Search from "./_components/search";
import Banner from "@/public/banner.jpg";
import Title from "./_components/title";
import CardCategory from "./_components/cardCategory";
import CardOrder from "./_components/cardOrder";
import { auth } from "./_lib/auth";
import { headers } from "next/headers";
import { getOrdersConfirmed } from "./_actions/get-orders";

export default async function Home() {
  const categories = await getCategories();

  const session = await auth.api.getSession({
    headers: Object.fromEntries((await headers()).entries()),
  });

 
  
  let confirmed:any[] = []

  if (session?.user.id) {
    confirmed = await getOrdersConfirmed({id: session?.user.id})
  }

  
  return (
    <>
      <Header />

      <div className="w-full p-6">
        <div>
          <PanelWelcomeUser />
        </div>

        <div className="mt-4">
          <Search />
        </div>

        <div className="relative mt-4 h-34 w-full">
          <Image
            alt="banner"
            src={Banner}
            fill
            className="rounded-2xl object-cover"
          />
        </div>

        {session && (
          <div className="mt-3 w-full">
            <Title title="ENCOMENDAS" />
            <div className="mt-1 flex w-full gap-4 overflow-x-scroll [&::-webkit-scrolbar]:hidden">
             {
              confirmed.map((order)=>(
                <CardOrder order={order} key={order.id}/>
              ))
             }
            </div>
          </div>
        )}

        <div className="mt-5">
          <Title title="CATEGORIAS" />

          <div className="mt-1 flex w-full gap-4 overflow-x-scroll [&::-webkit-scrolbar]:hidden">
            {categories.map((category) => (
              <CardCategory category={category} key={category.id} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
