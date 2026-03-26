import { redirect } from "next/navigation";
import { auth } from "../_lib/auth";
import { headers } from "next/headers";
import Header from "../_components/header";
import CardOrder from "../_components/cardOrder";
import {
  getOrdersConcluited,
  getOrdersConfirmed,
} from "../_actions/get-orders";
import Title from "../_components/title";

const Orders = async () => {
  const session = await auth.api.getSession({
    headers: Object.fromEntries((await headers()).entries()),
  });

  if (!session) {
    return redirect("/");
  }

  const concluited = await getOrdersConcluited({ id: session.user.id });
  const confirmed = await getOrdersConfirmed({ id: session.user.id });

  return (
    <>
      <Header />

      <div className="mt-10 flex flex-col gap-5 px-4">
        {confirmed.length > 0 && (
          <div className="flex flex-col gap-2">
            <Title title="CONFIRMADO" />
            {confirmed.map((order) => (
              <CardOrder key={order.id} order={order} />
            ))}
          </div>
        )}

        {concluited.length > 0 && (
          <div className="flex flex-col gap-2">
            <Title title="CONCLUÍDO" />
            {concluited.map((order) => (
              <CardOrder key={order.id} order={order} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Orders;
