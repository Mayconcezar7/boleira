import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";

const CardOrder = () => {
  return (
    <Card className="p-0 min-w-[90%]">
      <CardContent className="flex justify-between p-0">
        <div className="p-3 flex flex-col justify-center gap-2.5">
          <Badge className="bg-yellow-600 p-2.5">Encomendado</Badge>
          <h2 className="text-xl font-medium text-amber-950">Bolo de Morango</h2>
        </div>

        <div className="border-l border-solid  p-3 flex flex-col items-center justify-center bg-amber-950">
            <p className="text-white font-normal">Março</p>
            <p className="text-white font-normal text-xl">10</p>
            <p className="text-white font-normal">20:00</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardOrder;
