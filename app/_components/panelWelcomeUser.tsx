"use client"

import { format } from "date-fns"
import { authClient } from "../_lib/auth-client"
import { ptBR } from "date-fns/locale"

const PanelWelcomeUser = () => {
  const {data: session} = authClient.useSession()

  return (
    <div className='bg-amber-900 p-4 rounded-[12px]'>
      {
        session? <h2 className='font-normal text-2xl text-amber-50'>Ola , <span className="font-bold">{session.user.name}</span></h2> : <h2 className='font-normal text-2xl text-amber-50'>Olá, Seja bem-vindo(a)</h2>
      }
        
        <p  className='text-amber-50 font-normal capitalize'>{format(new Date(), "eeee, d 'de' MMMM",{locale:ptBR})}</p>
    </div>
  )
}

export default PanelWelcomeUser