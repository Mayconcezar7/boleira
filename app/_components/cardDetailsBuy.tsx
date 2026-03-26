import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Card, CardContent } from "./ui/card";
import { formatPrice } from "../_lib/format-price";

interface DetailsBuyProps{
    cartTotal: number;

    selectedDay: Date | undefined;

    selectedTime: string | undefined;

}

const CardDetailsBuy = ({ selectedDay, selectedTime, cartTotal}:DetailsBuyProps) => {
    if (!selectedDay || !selectedTime) {
        return null
    }
  return (
    <Card className="min-w-[90%] bg-amber-800">
        <CardContent className="space-y-1">
            <h2 className="uppercase text-center text-base mb-4 text-white font-medium">Detalhes da encomenda</h2>
            <div className="flex items-center justify-between w-full">
                <p className="text-white text-xs">Data da Entrega</p>
                <p className="text-white font-bold text-xs">{format(selectedDay, "d 'de' MMMM", { locale: ptBR})}</p>
            </div>

            <div className="flex items-center justify-between w-full">
                <p className="text-white text-xs">Horário</p>
                <p className="text-white font-bold text-xs">{selectedTime}</p>
            </div>

            <div className="flex items-center justify-between w-full">
                <p className="text-white text-xs">Preço Total:</p>
                <p className="text-white font-bold text-xs">{formatPrice(cartTotal)}</p>
            </div>
        </CardContent>
    </Card>
  )
}

export default CardDetailsBuy