
import { formatPrice } from '../_lib/format-price';
import { Card, CardContent } from './ui/card';
import Image from 'next/image';

interface ProductProps{
    product:{
    name: string;
    id: string;
    orderId: string;
    productionId: string;
    imageUrl: string;
    quantity: number;
    price: number;
    }
}

const CardProductOrder = ({product}:ProductProps) => {
  return (
     <Card className="p-1 min-w-full min-h-22">
      <CardContent className="flex p-0 h-20">
        <div className="relative min-h-20 min-w-20">
          <Image
            alt={product.name}
            src={product.imageUrl}
            fill
            className="rounded-bl-xl rounded-tl-xl  object-cover"
          />
        </div>

        <div className="flex flex-col justify-between p-1">
          <h2 className="text-sm font-medium text-amber-900">{product.name}</h2>
          
          <div className="flex flex-col justify-between ">
            <p className='text-sm text-amber-950 font-medium'>Qtd: {product.quantity}</p>
            <p className="text-sm text-amber-950 font-bold">
              {formatPrice(Number(product.price))}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default CardProductOrder