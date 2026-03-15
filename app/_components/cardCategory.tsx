
import { Category } from '@/generated/prisma/client'
import { Card, CardContent, CardDescription } from './ui/card'
import Image from 'next/image'
import { Button } from './ui/button'
import Link from 'next/link'

interface CategoryProps {
    category: Category
}

const CardCategory = ({category}:CategoryProps) => {


  return (
    <Card className='min-w-42 h-50  p-0'>
        <CardContent className='p-2 flex flex-col items-center'>
            <div className='relative h-27 w-full'>
                <Image alt={category.name} src={category.imageUrl} fill className='object-cover rounded-[10px]'/>
            </div>
            <CardDescription className='mt-1 font-normal'>{category.name}</CardDescription>
            <Button className='mt-3 w-full bg-yellow-800' asChild><Link href={`/category/${category.id}`}>Ver mais</Link></Button>
        </CardContent>
    </Card>
  )
}

export default CardCategory